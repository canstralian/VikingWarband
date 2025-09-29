import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Players table for game state
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  wallet_address: text("wallet_address").unique(),
  username: text("username").notNull(),
  gold: integer("gold").notNull().default(1000),
  reputation: integer("reputation").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Mercenaries table
export const mercenaries = pgTable("mercenaries", {
  id: serial("id").primaryKey(),
  player_id: integer("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  icon: text("icon").notNull(),
  health: integer("health").notNull(),
  current_health: integer("current_health").notNull(),
  attack: integer("attack").notNull(),
  defense: integer("defense").notNull(),
  speed: integer("speed").notNull(),
  morale: integer("morale").notNull().default(100),
  experience: integer("experience").notNull().default(0),
  weapon: text("weapon"),
  armor: text("armor"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Raid contracts table
export const raid_contracts = pgTable("raid_contracts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  difficulty: text("difficulty").notNull(),
  required_power: integer("required_power").notNull(),
  duration: text("duration").notNull(),
  gold_reward: integer("gold_reward").notNull(),
  ton_reward: real("ton_reward").notNull().default(0),
  reputation_reward: integer("reputation_reward").notNull(),
  experience_reward: integer("experience_reward").notNull(),
  injury_risk: integer("injury_risk").notNull(),
  death_risk: integer("death_risk").notNull(),
  is_active: boolean("is_active").notNull().default(true),
});

// Completed raids tracking
export const completed_raids = pgTable("completed_raids", {
  id: serial("id").primaryKey(),
  player_id: integer("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  raid_id: integer("raid_id").notNull().references(() => raid_contracts.id),
  victory: boolean("victory").notNull(),
  gold_earned: integer("gold_earned").notNull().default(0),
  ton_earned: real("ton_earned").notNull().default(0),
  reputation_earned: integer("reputation_earned").notNull().default(0),
  experience_earned: integer("experience_earned").notNull().default(0),
  mercenaries_used: jsonb("mercenaries_used").notNull(),
  completed_at: timestamp("completed_at").defaultNow().notNull(),
});

// Equipment table
export const equipment = pgTable("equipment", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'weapon' or 'armor'
  rarity: text("rarity").notNull(), // 'common', 'rare', 'epic', 'legendary'
  attack_bonus: integer("attack_bonus").notNull().default(0),
  defense_bonus: integer("defense_bonus").notNull().default(0),
  speed_bonus: integer("speed_bonus").notNull().default(0),
  health_bonus: integer("health_bonus").notNull().default(0),
  gold_cost: integer("gold_cost").notNull(),
  ton_cost: real("ton_cost").notNull().default(0),
  crafting_materials: jsonb("crafting_materials"),
  is_craftable: boolean("is_craftable").notNull().default(false),
});

// Player equipment inventory
export const player_equipment = pgTable("player_equipment", {
  id: serial("id").primaryKey(),
  player_id: integer("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  equipment_id: integer("equipment_id").notNull().references(() => equipment.id),
  quantity: integer("quantity").notNull().default(1),
  acquired_at: timestamp("acquired_at").defaultNow().notNull(),
});

// Schema exports for validation
export const insertPlayerSchema = createInsertSchema(players).pick({
  wallet_address: true,
  username: true,
});

export const insertMercenarySchema = createInsertSchema(mercenaries).pick({
  player_id: true,
  name: true,
  type: true,
  icon: true,
  health: true,
  current_health: true,
  attack: true,
  defense: true,
  speed: true,
});

export const insertCompletedRaidSchema = createInsertSchema(completed_raids).pick({
  player_id: true,
  raid_id: true,
  victory: true,
  gold_earned: true,
  ton_earned: true,
  reputation_earned: true,
  experience_earned: true,
  mercenaries_used: true,
});

// Type exports
export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Mercenary = typeof mercenaries.$inferSelect;
export type InsertMercenary = z.infer<typeof insertMercenarySchema>;
export type RaidContract = typeof raid_contracts.$inferSelect;
export type CompletedRaid = typeof completed_raids.$inferSelect;
export type InsertCompletedRaid = z.infer<typeof insertCompletedRaidSchema>;
export type Equipment = typeof equipment.$inferSelect;
export type PlayerEquipment = typeof player_equipment.$inferSelect;
