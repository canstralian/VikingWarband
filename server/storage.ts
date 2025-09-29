import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and } from "drizzle-orm";
import { 
  players, 
  mercenaries, 
  raid_contracts, 
  completed_raids,
  equipment,
  player_equipment,
  type Player, 
  type InsertPlayer,
  type Mercenary,
  type InsertMercenary,
  type RaidContract,
  type CompletedRaid,
  type InsertCompletedRaid,
  type Equipment,
  type PlayerEquipment
} from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);

export interface IGameStorage {
  // Player methods
  getPlayer(id: number): Promise<Player | undefined>;
  getPlayerByWallet(walletAddress: string): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayerGold(playerId: number, amount: number): Promise<void>;
  updatePlayerReputation(playerId: number, amount: number): Promise<void>;
  
  // Mercenary methods
  getPlayerMercenaries(playerId: number): Promise<Mercenary[]>;
  createMercenary(mercenary: InsertMercenary): Promise<Mercenary>;
  updateMercenaryHealth(mercenaryId: number, health: number): Promise<void>;
  updateMercenaryMorale(mercenaryId: number, morale: number): Promise<void>;
  updateMercenaryExperience(mercenaryId: number, experience: number): Promise<void>;
  
  // Raid methods
  getRaidContracts(): Promise<RaidContract[]>;
  createRaidContract(contract: Omit<RaidContract, 'id'>): Promise<RaidContract>;
  completeRaid(completedRaid: InsertCompletedRaid): Promise<CompletedRaid>;
  getPlayerCompletedRaids(playerId: number): Promise<CompletedRaid[]>;
  
  // Equipment methods
  getEquipment(): Promise<Equipment[]>;
  getPlayerEquipment(playerId: number): Promise<PlayerEquipment[]>;
  addPlayerEquipment(playerId: number, equipmentId: number, quantity?: number): Promise<void>;
}

export class DatabaseStorage implements IGameStorage {
  // Player methods
  async getPlayer(id: number): Promise<Player | undefined> {
    const result = await db.select().from(players).where(eq(players.id, id));
    return result[0];
  }

  async getPlayerByWallet(walletAddress: string): Promise<Player | undefined> {
    const result = await db.select().from(players).where(eq(players.wallet_address, walletAddress));
    return result[0];
  }

  async createPlayer(player: InsertPlayer): Promise<Player> {
    const result = await db.insert(players).values(player).returning();
    return result[0];
  }

  async updatePlayerGold(playerId: number, amount: number): Promise<void> {
    await db.update(players)
      .set({ gold: amount, updated_at: new Date() })
      .where(eq(players.id, playerId));
  }

  async updatePlayerReputation(playerId: number, amount: number): Promise<void> {
    await db.update(players)
      .set({ reputation: amount, updated_at: new Date() })
      .where(eq(players.id, playerId));
  }

  // Mercenary methods
  async getPlayerMercenaries(playerId: number): Promise<Mercenary[]> {
    return await db.select().from(mercenaries).where(eq(mercenaries.player_id, playerId));
  }

  async createMercenary(mercenary: InsertMercenary): Promise<Mercenary> {
    const result = await db.insert(mercenaries).values(mercenary).returning();
    return result[0];
  }

  async updateMercenaryHealth(mercenaryId: number, health: number): Promise<void> {
    await db.update(mercenaries)
      .set({ current_health: health })
      .where(eq(mercenaries.id, mercenaryId));
  }

  async updateMercenaryMorale(mercenaryId: number, morale: number): Promise<void> {
    await db.update(mercenaries)
      .set({ morale })
      .where(eq(mercenaries.id, mercenaryId));
  }

  async updateMercenaryExperience(mercenaryId: number, experience: number): Promise<void> {
    await db.update(mercenaries)
      .set({ experience })
      .where(eq(mercenaries.id, mercenaryId));
  }

  // Raid methods
  async getRaidContracts(): Promise<RaidContract[]> {
    return await db.select().from(raid_contracts).where(eq(raid_contracts.is_active, true));
  }

  async createRaidContract(contract: Omit<RaidContract, 'id'>): Promise<RaidContract> {
    const result = await db.insert(raid_contracts).values(contract).returning();
    return result[0];
  }

  async completeRaid(completedRaid: InsertCompletedRaid): Promise<CompletedRaid> {
    const result = await db.insert(completed_raids).values(completedRaid).returning();
    return result[0];
  }

  async getPlayerCompletedRaids(playerId: number): Promise<CompletedRaid[]> {
    return await db.select().from(completed_raids).where(eq(completed_raids.player_id, playerId));
  }

  // Equipment methods
  async getEquipment(): Promise<Equipment[]> {
    return await db.select().from(equipment);
  }

  async getPlayerEquipment(playerId: number): Promise<PlayerEquipment[]> {
    return await db.select().from(player_equipment).where(eq(player_equipment.player_id, playerId));
  }

  async addPlayerEquipment(playerId: number, equipmentId: number, quantity: number = 1): Promise<void> {
    await db.insert(player_equipment).values({
      player_id: playerId,
      equipment_id: equipmentId,
      quantity
    });
  }
}

export const storage = new DatabaseStorage();
