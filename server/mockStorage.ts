// Mock storage for development/demo purposes
import { RAID_CONTRACTS } from "../client/src/data/raids";
import { MERCENARY_TYPES } from "../client/src/data/mercenaries";

let mockPlayers = new Map();
let mockMercenaries = new Map();
let mockCompletedRaids = new Map();
let nextPlayerId = 1;
let nextMercenaryId = 1;

export const mockStorage = {
  // Player methods
  async getPlayer(id: number) {
    return mockPlayers.get(id);
  },

  async getPlayerByWallet(walletAddress: string) {
    for (const player of mockPlayers.values()) {
      if (player.wallet_address === walletAddress) {
        return player;
      }
    }
    return undefined;
  },

  async createPlayer(playerData: any) {
    const player = {
      id: nextPlayerId++,
      wallet_address: playerData.wallet_address,
      username: playerData.username,
      gold: 1000,
      reputation: 0,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockPlayers.set(player.id, player);
    return player;
  },

  async updatePlayerGold(playerId: number, amount: number) {
    const player = mockPlayers.get(playerId);
    if (player) {
      player.gold = amount;
      player.updated_at = new Date();
    }
  },

  async updatePlayerReputation(playerId: number, amount: number) {
    const player = mockPlayers.get(playerId);
    if (player) {
      player.reputation = amount;
      player.updated_at = new Date();
    }
  },

  // Mercenary methods
  async getPlayerMercenaries(playerId: number) {
    const mercenaries = [];
    for (const merc of mockMercenaries.values()) {
      if (merc.player_id === playerId) {
        mercenaries.push(merc);
      }
    }
    return mercenaries;
  },

  async createMercenary(mercenaryData: any) {
    const mercType = MERCENARY_TYPES.find(t => t.id === mercenaryData.mercenaryTypeId);
    if (!mercType) throw new Error('Invalid mercenary type');

    const mercenary = {
      id: nextMercenaryId++,
      player_id: mercenaryData.player_id,
      name: mercenaryData.customName || mercType.name,
      type: mercType.id,
      icon: mercType.icon,
      health: mercType.baseStats.health,
      current_health: mercType.baseStats.health,
      attack: mercType.baseStats.attack,
      defense: mercType.baseStats.defense,
      speed: mercType.baseStats.speed,
      morale: 100,
      experience: 0,
      weapon: null,
      armor: null,
      created_at: new Date()
    };
    mockMercenaries.set(mercenary.id, mercenary);
    return mercenary;
  },

  async updateMercenaryHealth(mercenaryId: number, health: number) {
    const merc = mockMercenaries.get(mercenaryId);
    if (merc) {
      merc.current_health = health;
    }
  },

  async updateMercenaryMorale(mercenaryId: number, morale: number) {
    const merc = mockMercenaries.get(mercenaryId);
    if (merc) {
      merc.morale = morale;
    }
  },

  async updateMercenaryExperience(mercenaryId: number, experience: number) {
    const merc = mockMercenaries.get(mercenaryId);
    if (merc) {
      merc.experience = experience;
    }
  },

  // Raid methods
  async getRaidContracts() {
    return RAID_CONTRACTS;
  },

  async createRaidContract(contractData: any) {
    return { id: Date.now(), ...contractData };
  },

  async completeRaid(completedRaidData: any) {
    const raid = {
      id: Date.now(),
      ...completedRaidData,
      completed_at: new Date()
    };
    const raids = mockCompletedRaids.get(completedRaidData.player_id) || [];
    raids.push(raid);
    mockCompletedRaids.set(completedRaidData.player_id, raids);
    return raid;
  },

  async getPlayerCompletedRaids(playerId: number) {
    return mockCompletedRaids.get(playerId) || [];
  },

  // Equipment methods (minimal for now)
  async getPlayerEquipment(playerId: number) {
    return [];
  }
};