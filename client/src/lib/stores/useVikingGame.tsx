import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Mercenary, MercenaryType, RaidContract, GameScreen } from '../../types/game';
import { MERCENARY_TYPES } from '../../data/mercenaries';
import { useTON } from './useTON';

interface VikingGameState {
  // Game state
  gameScreen: GameScreen;
  playerId: number | null;
  playerGold: number;
  playerReputation: number;
  warband: Mercenary[];
  raidContracts: RaidContract[];
  
  // Combat state
  currentRaid: RaidContract | null;
  selectedMercenaries: Mercenary[];
  
  // Loading states
  isLoading: boolean;
  
  // Actions
  setGameScreen: (screen: GameScreen) => void;
  initializeGame: (walletAddress?: string) => Promise<void>;
  
  // Mercenary management
  recruitMercenary: (mercType: MercenaryType) => Promise<void>;
  canAffordMercenary: (mercType: MercenaryType) => boolean;
  healMercenary: (mercenaryId: number) => Promise<void>;
  restMercenary: (mercenaryId: number) => Promise<void>;
  
  // Raid management
  loadRaidContracts: () => Promise<void>;
  startRaid: (contract: RaidContract) => void;
  endCombat: (victory: boolean) => Promise<void>;
  calculateWarbandPower: () => number;
}

export const useVikingGame = create<VikingGameState>()(
  subscribeWithSelector((set, get) => ({
    gameScreen: 'menu',
    playerId: null,
    playerGold: 1000,
    playerReputation: 0,
    warband: [],
    raidContracts: [],
    currentRaid: null,
    selectedMercenaries: [],
    isLoading: false,

    setGameScreen: (screen) => set({ gameScreen: screen }),

    initializeGame: async (walletAddress?: string) => {
      if (!walletAddress) {
        // For now, use a default wallet for testing
        walletAddress = 'demo_wallet_123';
      }
      
      try {
        set({ isLoading: true });
        
        // Fetch or create player
        const playerResponse = await fetch(`/api/player/${walletAddress}`);
        const player = await playerResponse.json();
        
        // Load player's mercenaries
        const mercenariesResponse = await fetch(`/api/player/${player.id}/mercenaries`);
        const dbMercenaries = await mercenariesResponse.json();
        
        // Convert database mercenaries to frontend format
        const mercenaries: Mercenary[] = dbMercenaries.map((dbMerc: any) => ({
          id: dbMerc.id.toString(),
          name: dbMerc.name,
          type: dbMerc.type,
          icon: dbMerc.icon,
          stats: {
            health: dbMerc.health,
            attack: dbMerc.attack,
            defense: dbMerc.defense,
            speed: dbMerc.speed
          },
          currentHealth: dbMerc.current_health,
          morale: dbMerc.morale,
          experience: dbMerc.experience,
          weapon: dbMerc.weapon,
          armor: dbMerc.armor
        }));
        
        // Load raid contracts
        const raidsResponse = await fetch('/api/raids');
        const raids = await raidsResponse.json();
        
        set({
          playerId: player.id,
          playerGold: player.gold,
          playerReputation: player.reputation,
          warband: mercenaries,
          raidContracts: raids,
          isLoading: false
        });
      } catch (error) {
        console.error('Failed to initialize game:', error);
        set({ isLoading: false });
      }
    },

    recruitMercenary: async (mercType) => {
      const state = get();
      if (!state.canAffordMercenary(mercType) || !state.playerId) return;

      try {
        // Create mercenary via API
        const response = await fetch(`/api/player/${state.playerId}/mercenaries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mercenaryTypeId: mercType.id,
            customName: `${mercType.name} ${Math.floor(Math.random() * 1000)}`
          })
        });
        
        if (!response.ok) throw new Error('Failed to recruit mercenary');
        
        const newMercenary = await response.json();
        
        // Update player gold
        const newGold = state.playerGold - mercType.goldCost;
        await fetch(`/api/player/${state.playerId}/gold`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: newGold })
        });
        
        // Convert database mercenary to frontend format
        const frontendMercenary: Mercenary = {
          id: newMercenary.id.toString(),
          name: newMercenary.name,
          type: newMercenary.type,
          icon: newMercenary.icon,
          stats: {
            health: newMercenary.health,
            attack: newMercenary.attack,
            defense: newMercenary.defense,
            speed: newMercenary.speed
          },
          currentHealth: newMercenary.current_health,
          morale: newMercenary.morale,
          experience: newMercenary.experience,
          weapon: newMercenary.weapon,
          armor: newMercenary.armor
        };
        
        set({
          warband: [...state.warband, frontendMercenary],
          playerGold: newGold
        });
      } catch (error) {
        console.error('Failed to recruit mercenary:', error);
      }
    },

    canAffordMercenary: (mercType) => {
      const { playerGold } = get();
      return playerGold >= mercType.goldCost;
    },

    healMercenary: async (mercenaryId) => {
      const state = get();
      if (state.playerGold < 20 || !state.playerId) return;

      try {
        const mercenary = state.warband.find(m => m.id === mercenaryId.toString());
        if (!mercenary) return;
        
        const newHealth = Math.min(mercenary.stats.health, mercenary.currentHealth + 30);
        
        // Update mercenary health via API
        await fetch(`/api/mercenaries/${mercenaryId}/health`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ health: newHealth })
        });
        
        // Update player gold
        const newGold = state.playerGold - 20;
        await fetch(`/api/player/${state.playerId}/gold`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: newGold })
        });

        set({
          playerGold: newGold,
          warband: state.warband.map(merc => 
            merc.id === mercenaryId.toString()
              ? { ...merc, currentHealth: newHealth }
              : merc
          )
        });
      } catch (error) {
        console.error('Failed to heal mercenary:', error);
      }
    },

    restMercenary: async (mercenaryId) => {
      const state = get();
      if (state.playerGold < 10 || !state.playerId) return;

      try {
        const mercenary = state.warband.find(m => m.id === mercenaryId.toString());
        if (!mercenary) return;
        
        const newMorale = Math.min(100, mercenary.morale + 25);
        
        // Update mercenary morale via API
        await fetch(`/api/mercenaries/${mercenaryId}/morale`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ morale: newMorale })
        });
        
        // Update player gold
        const newGold = state.playerGold - 10;
        await fetch(`/api/player/${state.playerId}/gold`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: newGold })
        });

        set({
          playerGold: newGold,
          warband: state.warband.map(merc => 
            merc.id === mercenaryId.toString()
              ? { ...merc, morale: newMorale }
              : merc
          )
        });
      } catch (error) {
        console.error('Failed to rest mercenary:', error);
      }
    },

    calculateWarbandPower: () => {
      const { warband } = get();
      return warband.reduce((total, merc) => {
        const healthRatio = merc.currentHealth / merc.stats.health;
        const moraleRatio = merc.morale / 100;
        const basePower = merc.stats.attack + merc.stats.defense + merc.stats.speed;
        return total + (basePower * healthRatio * moraleRatio);
      }, 0);
    },

    loadRaidContracts: async () => {
      try {
        const response = await fetch('/api/raids');
        const raids = await response.json();
        set({ raidContracts: raids });
      } catch (error) {
        console.error('Failed to load raid contracts:', error);
      }
    },

    startRaid: (contract) => {
      const { warband } = get();
      
      // Select mercenaries for the raid (up to 3)
      const selectedMercs = warband
        .filter(merc => merc.currentHealth > 0 && merc.morale > 20)
        .slice(0, 3);

      set({
        currentRaid: contract,
        selectedMercenaries: selectedMercs,
        gameScreen: 'combat'
      });
    },

    endCombat: async (victory) => {
      const state = get();
      if (!state.currentRaid || !state.playerId) return;

      try {
        if (victory) {
          // Find the raid from raidContracts to get rewards
          const raidContract = state.raidContracts.find(r => r.title === state.currentRaid?.title);
          if (!raidContract) return;
          
          const goldEarned = raidContract.gold_reward;
          const tonEarned = raidContract.ton_reward;
          const reputationEarned = raidContract.reputation_reward;
          const experienceEarned = raidContract.experience_reward;
          
          // Record completed raid
          await fetch(`/api/player/${state.playerId}/raids/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              raidId: raidContract.id,
              victory: true,
              goldEarned,
              tonEarned,
              reputationEarned,
              experienceEarned,
              mercenariesUsed: state.selectedMercenaries.map(m => ({ id: m.id, name: m.name }))
            })
          });
          
          // Update player gold and reputation
          const newGold = state.playerGold + goldEarned;
          const newReputation = state.playerReputation + reputationEarned;
          
          await fetch(`/api/player/${state.playerId}/gold`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: newGold })
          });
          
          await fetch(`/api/player/${state.playerId}/reputation`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: newReputation })
          });
          
          // Update mercenary experience
          const updatedWarband = await Promise.all(state.warband.map(async (merc) => {
            const newExperience = merc.experience + experienceEarned;
            await fetch(`/api/mercenaries/${merc.id}/experience`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ experience: newExperience })
            });
            return { ...merc, experience: newExperience };
          }));
          
          set({
            playerGold: newGold,
            playerReputation: newReputation,
            warband: updatedWarband,
            currentRaid: null,
            selectedMercenaries: []
          });
        } else {
          // Record failed raid
          const raidContract = state.raidContracts.find(r => r.title === state.currentRaid?.title);
          if (raidContract) {
            await fetch(`/api/player/${state.playerId}/raids/complete`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                raidId: raidContract.id,
                victory: false,
                goldEarned: 0,
                tonEarned: 0,
                reputationEarned: 0,
                experienceEarned: 0,
                mercenariesUsed: state.selectedMercenaries.map(m => ({ id: m.id, name: m.name }))
              })
            });
          }
          
          // Apply penalties for defeat
          const updatedWarband = await Promise.all(state.warband.map(async (merc) => {
            const newHealth = Math.max(1, merc.currentHealth - 20);
            const newMorale = Math.max(0, merc.morale - 30);
            
            await fetch(`/api/mercenaries/${merc.id}/health`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ health: newHealth })
            });
            
            await fetch(`/api/mercenaries/${merc.id}/morale`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ morale: newMorale })
            });
            
            return {
              ...merc,
              currentHealth: newHealth,
              morale: newMorale
            };
          }));
          
          set({
            warband: updatedWarband,
            currentRaid: null,
            selectedMercenaries: []
          });
        }
      } catch (error) {
        console.error('Failed to end combat:', error);
        // Reset combat state even if API calls fail
        set({
          currentRaid: null,
          selectedMercenaries: []
        });
      }
    }
  }))
);
