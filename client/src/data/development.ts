import { DevelopmentPhaseConfig, TechnologyStack, ExperimentalGoal } from '../types/development';

export const DEVELOPMENT_PHASES: DevelopmentPhaseConfig[] = [
  {
    id: 'greenfield',
    name: '0-to-1 Development',
    description: 'Generate applications from scratch with high-level requirements',
    icon: '🌱',
    keyActivities: [
      'Start with high-level requirements',
      'Generate specifications',
      'Plan implementation steps',
      'Build production-ready applications'
    ],
    active: true
  },
  {
    id: 'creative_exploration',
    name: 'Creative Exploration',
    description: 'Explore diverse solutions through parallel implementations',
    icon: '🎨',
    keyActivities: [
      'Explore diverse solutions',
      'Support multiple technology stacks & architectures',
      'Experiment with UX patterns',
      'Parallel implementation development'
    ],
    active: false
  },
  {
    id: 'brownfield',
    name: 'Iterative Enhancement',
    description: 'Modernize and enhance existing systems iteratively',
    icon: '🔧',
    keyActivities: [
      'Add features iteratively',
      'Modernize legacy systems',
      'Adapt processes',
      'Incremental improvements'
    ],
    active: false
  }
];

export const TECHNOLOGY_STACKS: TechnologyStack[] = [
  // Frontend
  {
    id: 'react',
    name: 'React + TypeScript',
    category: 'frontend',
    description: 'Modern React with TypeScript for type safety',
    active: true
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    description: 'Progressive framework for building user interfaces',
    active: false
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'frontend',
    description: 'Cybernetically enhanced web apps',
    active: false
  },
  
  // Backend
  {
    id: 'node_express',
    name: 'Node.js + Express',
    category: 'backend',
    description: 'Fast, unopinionated web framework for Node.js',
    active: true
  },
  {
    id: 'python_fastapi',
    name: 'Python + FastAPI',
    category: 'backend',
    description: 'Modern, fast web framework for building APIs with Python',
    active: false
  },
  {
    id: 'rust_actix',
    name: 'Rust + Actix',
    category: 'backend',
    description: 'Powerful, pragmatic, and extremely fast web framework',
    active: false
  },
  
  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    description: 'Advanced open source relational database',
    active: true
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    description: 'Document-based NoSQL database',
    active: false
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    description: 'In-memory data structure store',
    active: false
  },
  
  // Blockchain
  {
    id: 'ton',
    name: 'TON Network',
    category: 'blockchain',
    description: 'The Open Network blockchain platform',
    active: true
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    category: 'blockchain',
    description: 'Decentralized platform for smart contracts',
    active: false
  }
];

export const EXPERIMENTAL_GOALS: ExperimentalGoal[] = [
  {
    id: 'tech_independence',
    name: 'Technology Independence',
    description: 'Create applications using diverse technology stacks to validate Spec-Driven Development as technology-agnostic',
    category: 'technology_independence',
    progress: 25,
    milestones: [
      'Implement React frontend',
      'Add Vue.js alternative',
      'Create Python backend option',
      'Add Rust backend alternative',
      'Support multiple databases'
    ],
    completedMilestones: ['Implement React frontend']
  },
  {
    id: 'enterprise_constraints',
    name: 'Enterprise Constraints',
    description: 'Demonstrate mission-critical application development with organizational constraints',
    category: 'enterprise_constraints',
    progress: 40,
    milestones: [
      'Cloud provider integration',
      'Compliance framework',
      'Design system implementation',
      'Security best practices',
      'Scalability considerations'
    ],
    completedMilestones: ['Cloud provider integration', 'Design system implementation']
  },
  {
    id: 'user_centric',
    name: 'User-Centric Development',
    description: 'Build applications for different user cohorts and development preferences',
    category: 'user_centric',
    progress: 60,
    milestones: [
      'Vibe-coding support',
      'AI-native development tools',
      'Spec-driven workflows',
      'Test-driven options',
      'User preference system'
    ],
    completedMilestones: ['Vibe-coding support', 'AI-native development tools', 'User preference system']
  },
  {
    id: 'creative_iterative',
    name: 'Creative & Iterative Processes',
    description: 'Validate parallel implementation exploration and robust iterative workflows',
    category: 'creative_iterative',
    progress: 30,
    milestones: [
      'Parallel implementation framework',
      'Version comparison tools',
      'Iterative feature development',
      'Upgrade process automation',
      'Modernization workflows'
    ],
    completedMilestones: ['Iterative feature development']
  }
];