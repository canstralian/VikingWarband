export interface MercenaryStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface MercenaryType {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseStats: MercenaryStats;
  abilities: string[];
  goldCost: number;
  tonCost: number;
}

export interface Mercenary {
  id: string;
  name: string;
  type: string;
  icon: string;
  stats: MercenaryStats;
  currentHealth: number;
  morale: number;
  experience: number;
  weapon: string | null;
  armor: string | null;
}

export interface RaidRewards {
  gold: number;
  ton: number;
  reputation: number;
  experience: number;
}

export interface RaidContract {
  id: string;
  title: string;
  description: string;
  location: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  requiredPower: number;
  duration: string;
  rewards: RaidRewards;
  injuryRisk: number;
  deathRisk: number;
}

export type GameScreen = 'menu' | 'recruitment' | 'warband' | 'raids' | 'combat';
