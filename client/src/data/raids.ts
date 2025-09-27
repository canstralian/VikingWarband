import { RaidContract } from '../types/game';

export const RAID_CONTRACTS: RaidContract[] = [
  {
    id: 'merchant_caravan',
    title: 'Merchant Caravan Raid',
    description: 'A wealthy merchant caravan travels the trade routes. Easy pickings for seasoned warriors.',
    location: 'Trade Route near Hedeby',
    difficulty: 'Easy',
    requiredPower: 150,
    duration: '2 hours',
    rewards: {
      gold: 200,
      ton: 0,
      reputation: 10,
      experience: 50
    },
    injuryRisk: 15,
    deathRisk: 2
  },
  {
    id: 'saxon_village',
    title: 'Saxon Village Raid',
    description: 'A prosperous Saxon village ripe for plunder. Expect moderate resistance from local militia.',
    location: 'Wessex Borderlands',
    difficulty: 'Medium',
    requiredPower: 250,
    duration: '4 hours',
    rewards: {
      gold: 400,
      ton: 0.05,
      reputation: 25,
      experience: 100
    },
    injuryRisk: 30,
    deathRisk: 8
  },
  {
    id: 'monastery_assault',
    title: 'Monastery Assault',
    description: 'A wealthy monastery holds great treasures. Heavily defended by warrior monks.',
    location: 'Lindisfarne Abbey',
    difficulty: 'Hard',
    requiredPower: 400,
    duration: '6 hours',
    rewards: {
      gold: 800,
      ton: 0.1,
      reputation: 50,
      experience: 200
    },
    injuryRisk: 45,
    deathRisk: 15
  },
  {
    id: 'rival_warband',
    title: 'Rival Warband Battle',
    description: 'Challenge a rival Viking warband for territory and honor. Only the strongest will survive.',
    location: 'Disputed Territory',
    difficulty: 'Hard',
    requiredPower: 350,
    duration: '3 hours',
    rewards: {
      gold: 600,
      ton: 0.08,
      reputation: 75,
      experience: 250
    },
    injuryRisk: 50,
    deathRisk: 20
  },
  {
    id: 'frankish_fortress',
    title: 'Frankish Fortress Siege',
    description: 'Lay siege to a heavily fortified Frankish stronghold. Fame and fortune await the victorious.',
    location: 'Northern Francia',
    difficulty: 'Legendary',
    requiredPower: 600,
    duration: '12 hours',
    rewards: {
      gold: 1500,
      ton: 0.3,
      reputation: 100,
      experience: 400
    },
    injuryRisk: 60,
    deathRisk: 25
  },
  {
    id: 'dragon_hunt',
    title: 'Dragon\'s Hoard Expedition',
    description: 'Legends speak of a dragon\'s treasure hoard hidden in the northern mountains. Only the bravest dare attempt this quest.',
    location: 'Frozen Northern Peaks',
    difficulty: 'Legendary',
    requiredPower: 800,
    duration: '24 hours',
    rewards: {
      gold: 2000,
      ton: 0.5,
      reputation: 150,
      experience: 500
    },
    injuryRisk: 70,
    deathRisk: 35
  }
];
