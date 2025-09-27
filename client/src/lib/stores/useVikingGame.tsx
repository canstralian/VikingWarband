import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Mercenary, MercenaryType, RaidContract, GameScreen } from '../../types/game';
import { MERCENARY_TYPES } from '../../data/mercenaries';

interface VikingGameState {
  // Game state
  gameScreen: GameScreen;
  playerGold: number;
  playerReputation: number;
  warband: Mercenary[];
  
  // Combat state
  currentRaid: RaidContract | null;
  selectedMercenaries: Mercenary[];
  
  // Actions
  setGameScreen: (screen: GameScreen) => void;
  initializeGame: () => void;
  
  // Mercenary management
  recruitMercenary: (mercType: MercenaryType) => void;
  canAffordMercenary: (mercType: MercenaryType) => boolean;
  healMercenary: (mercenaryId: string) => void;
  restMercenary: (mercenaryId: string) => void;
  
  // Raid management
  startRaid: (contract: RaidContract) => void;
  endCombat: (victory: boolean) => void;
  calculateWarbandPower: () => number;
}

export const useVikingGame = create<VikingGameState>()(
  subscribeWithSelector((set, get) => ({
    gameScreen: 'menu',
    playerGold: 1000,
    playerReputation: 0,
    warband: [],
    currentRaid: null,
    selectedMercenaries: [],

    setGameScreen: (screen) => set({ gameScreen: screen }),

    initializeGame: () => {
      // Load saved game state if available
      const savedState = localStorage.getItem('vikingGameState');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          set({
            playerGold: parsed.playerGold || 1000,
            playerReputation: parsed.playerReputation || 0,
            warband: parsed.warband || []
          });
        } catch (error) {
          console.error('Failed to load saved game state:', error);
        }
      }
    },

    recruitMercenary: (mercType) => {
      const state = get();
      if (!state.canAffordMercenary(mercType)) return;

      const newMercenary: Mercenary = {
        id: `merc_${Date.now()}`,
        name: `${mercType.name} ${Math.floor(Math.random() * 1000)}`,
        type: mercType.name,
        icon: mercType.icon,
        stats: { ...mercType.baseStats },
        currentHealth: mercType.baseStats.health,
        morale: 100,
        experience: 0,
        weapon: null,
        armor: null
      };

      set({
        warband: [...state.warband, newMercenary],
        playerGold: state.playerGold - mercType.goldCost
      });

      // Save to localStorage
      setTimeout(() => {
        const currentState = get();
        localStorage.setItem('vikingGameState', JSON.stringify({
          playerGold: currentState.playerGold,
          playerReputation: currentState.playerReputation,
          warband: currentState.warband
        }));
      }, 100);
    },

    canAffordMercenary: (mercType) => {
      const { playerGold } = get();
      return playerGold >= mercType.goldCost;
    },

    healMercenary: (mercenaryId) => {
      const state = get();
      if (state.playerGold < 20) return;

      set({
        playerGold: state.playerGold - 20,
        warband: state.warband.map(merc => 
          merc.id === mercenaryId 
            ? { ...merc, currentHealth: Math.min(merc.stats.health, merc.currentHealth + 30) }
            : merc
        )
      });
    },

    restMercenary: (mercenaryId) => {
      const state = get();
      if (state.playerGold < 10) return;

      set({
        playerGold: state.playerGold - 10,
        warband: state.warband.map(merc => 
          merc.id === mercenaryId 
            ? { ...merc, morale: Math.min(100, merc.morale + 25) }
            : merc
        )
      });
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

    endCombat: (victory) => {
      const state = get();
      if (!state.currentRaid) return;

      if (victory) {
        // Apply rewards
        const rewards = state.currentRaid.rewards;
        
        set({
          playerGold: state.playerGold + rewards.gold,
          playerReputation: state.playerReputation + rewards.reputation,
          warband: state.warband.map(merc => ({
            ...merc,
            experience: merc.experience + rewards.experience
          })),
          currentRaid: null,
          selectedMercenaries: []
        });
      } else {
        // Apply penalties for defeat
        set({
          warband: state.warband.map(merc => ({
            ...merc,
            currentHealth: Math.max(1, merc.currentHealth - 20),
            morale: Math.max(0, merc.morale - 30)
          })),
          currentRaid: null,
          selectedMercenaries: []
        });
      }

      // Save game state
      setTimeout(() => {
        const currentState = get();
        localStorage.setItem('vikingGameState', JSON.stringify({
          playerGold: currentState.playerGold,
          playerReputation: currentState.playerReputation,
          warband: currentState.warband
        }));
      }, 100);
    }
  }))
);
