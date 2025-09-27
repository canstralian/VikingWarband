import { MercenaryType } from '../types/game';

export const MERCENARY_TYPES: MercenaryType[] = [
  {
    id: 'berserker',
    name: 'Berserker',
    icon: '🪓',
    description: 'Fearless warriors who enter a battle rage, dealing massive damage but vulnerable to attacks.',
    baseStats: {
      health: 80,
      attack: 90,
      defense: 40,
      speed: 70
    },
    abilities: ['Battle Rage', 'Fearless', 'Two-Handed Weapons'],
    goldCost: 150,
    tonCost: 0
  },
  {
    id: 'shieldmaiden',
    name: 'Shield-maiden',
    icon: '🛡️',
    description: 'Elite female warriors skilled in both offense and defense, masters of shield combat.',
    baseStats: {
      health: 90,
      attack: 70,
      defense: 85,
      speed: 60
    },
    abilities: ['Shield Wall', 'Defensive Stance', 'Combat Training'],
    goldCost: 180,
    tonCost: 0
  },
  {
    id: 'archer',
    name: 'Norse Archer',
    icon: '🏹',
    description: 'Expert marksmen who can strike enemies from a distance with deadly precision.',
    baseStats: {
      health: 60,
      attack: 85,
      defense: 30,
      speed: 90
    },
    abilities: ['Long Range', 'Precise Shot', 'Quick Draw'],
    goldCost: 120,
    tonCost: 0
  },
  {
    id: 'huscarl',
    name: 'Huscarl',
    icon: '⚔️',
    description: 'Elite household guards of Viking lords, heavily armored and expertly trained.',
    baseStats: {
      health: 100,
      attack: 80,
      defense: 90,
      speed: 50
    },
    abilities: ['Heavy Armor', 'Leadership', 'Weapon Master'],
    goldCost: 250,
    tonCost: 0.1
  },
  {
    id: 'skald',
    name: 'Skald',
    icon: '🎵',
    description: 'Warrior-poets who inspire allies with tales of heroism and boost morale.',
    baseStats: {
      health: 70,
      attack: 50,
      defense: 60,
      speed: 80
    },
    abilities: ['Inspire', 'Morale Boost', 'Battle Songs'],
    goldCost: 200,
    tonCost: 0
  },
  {
    id: 'jarl',
    name: 'Jarl',
    icon: '👑',
    description: 'Noble Viking leaders with exceptional combat skills and command presence.',
    baseStats: {
      health: 120,
      attack: 95,
      defense: 85,
      speed: 70
    },
    abilities: ['Command', 'Noble Blood', 'Master Warrior', 'Tactical Genius'],
    goldCost: 500,
    tonCost: 0.5
  }
];
