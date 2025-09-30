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
  id: number;
  title: string;
  description: string;
  location: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  required_power: number;
  duration: string;
  gold_reward: number;
  ton_reward: number;
  reputation_reward: number;
  experience_reward: number;
  injury_risk: number;
  death_risk: number;
  is_active: boolean;
}

export type GameScreen = 'menu' | 'recruitment' | 'warband' | 'raids' | 'combat' | 'development';
