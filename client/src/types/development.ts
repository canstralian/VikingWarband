export type DevelopmentPhase = 'greenfield' | 'creative_exploration' | 'brownfield';

export interface DevelopmentPhaseConfig {
  id: DevelopmentPhase;
  name: string;
  description: string;
  icon: string;
  keyActivities: string[];
  active: boolean;
}

export interface TechnologyStack {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'blockchain' | 'tooling';
  description: string;
  active: boolean;
}

export interface ExperimentalGoal {
  id: string;
  name: string;
  description: string;
  category: 'technology_independence' | 'enterprise_constraints' | 'user_centric' | 'creative_iterative';
  progress: number; // 0-100
  milestones: string[];
  completedMilestones: string[];
}

export interface DevelopmentSettings {
  currentPhase: DevelopmentPhase;
  enabledStacks: string[];
  experimentalGoals: ExperimentalGoal[];
  userPreferences: {
    developmentStyle: 'vibe_coding' | 'ai_native' | 'spec_driven' | 'test_driven';
    complexityPreference: 'simple' | 'moderate' | 'advanced';
    innovationLevel: 'conservative' | 'balanced' | 'cutting_edge';
  };
  enterpriseConstraints: {
    cloudProvider: 'aws' | 'azure' | 'gcp' | 'hybrid' | 'on_premise';
    complianceRequirements: string[];
    designSystemRequired: boolean;
  };
}

export interface ProjectImplementation {
  id: string;
  name: string;
  description: string;
  phase: DevelopmentPhase;
  techStack: string[];
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}