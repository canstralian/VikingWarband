import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { DevelopmentSettings, DevelopmentPhase, ProjectImplementation, TechnologyStack } from '../../types/development';
import { DEVELOPMENT_PHASES, TECHNOLOGY_STACKS, EXPERIMENTAL_GOALS } from '../../data/development';

interface DevelopmentState extends DevelopmentSettings {
  // Additional state
  implementations: ProjectImplementation[];
  isInitialized: boolean;
  
  // Actions
  initialize: () => void;
  setPhase: (phase: DevelopmentPhase) => void;
  toggleTechnologyStack: (stackId: string) => void;
  updateExperimentalGoalProgress: (goalId: string, progress: number) => void;
  completeGoalMilestone: (goalId: string, milestone: string) => void;
  updateUserPreferences: (preferences: Partial<DevelopmentSettings['userPreferences']>) => void;
  updateEnterpriseConstraints: (constraints: Partial<DevelopmentSettings['enterpriseConstraints']>) => void;
  createImplementation: (implementation: Omit<ProjectImplementation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateImplementation: (id: string, updates: Partial<ProjectImplementation>) => void;
  deleteImplementation: (id: string) => void;
  
  // Computed values
  getActiveStacks: () => TechnologyStack[];
  getPhaseConfig: (phase?: DevelopmentPhase) => any;
  getGoalsByCategory: (category: string) => any[];
}

export const useDevelopment = create<DevelopmentState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    currentPhase: 'greenfield',
    enabledStacks: ['react', 'node_express', 'postgresql', 'ton'],
    experimentalGoals: EXPERIMENTAL_GOALS,
    userPreferences: {
      developmentStyle: 'ai_native',
      complexityPreference: 'moderate',
      innovationLevel: 'balanced'
    },
    enterpriseConstraints: {
      cloudProvider: 'hybrid',
      complianceRequirements: ['GDPR', 'SOC2'],
      designSystemRequired: true
    },
    implementations: [],
    isInitialized: false,

    // Actions
    initialize: () => {
      if (!get().isInitialized) {
        // Initialize with default implementation
        const defaultImplementation: ProjectImplementation = {
          id: 'viking-warband-main',
          name: 'Viking Warband - Main Implementation',
          description: 'Primary Viking mercenary management game implementation',
          phase: 'greenfield',
          techStack: ['react', 'node_express', 'postgresql', 'ton'],
          status: 'in_progress',
          progress: 75,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set({
          implementations: [defaultImplementation],
          isInitialized: true
        });
      }
    },

    setPhase: (phase) => {
      set({ currentPhase: phase });
      
      // Update development phase configurations
      const updatedPhases = DEVELOPMENT_PHASES.map(p => ({
        ...p,
        active: p.id === phase
      }));
      
      console.log(`Development phase changed to: ${phase}`);
    },

    toggleTechnologyStack: (stackId) => {
      const { enabledStacks } = get();
      const isEnabled = enabledStacks.includes(stackId);
      
      set({
        enabledStacks: isEnabled 
          ? enabledStacks.filter(id => id !== stackId)
          : [...enabledStacks, stackId]
      });
    },

    updateExperimentalGoalProgress: (goalId, progress) => {
      set({
        experimentalGoals: get().experimentalGoals.map(goal =>
          goal.id === goalId ? { ...goal, progress: Math.max(0, Math.min(100, progress)) } : goal
        )
      });
    },

    completeGoalMilestone: (goalId, milestone) => {
      set({
        experimentalGoals: get().experimentalGoals.map(goal =>
          goal.id === goalId && !goal.completedMilestones.includes(milestone)
            ? { 
                ...goal, 
                completedMilestones: [...goal.completedMilestones, milestone],
                progress: Math.min(100, goal.progress + (100 / goal.milestones.length))
              }
            : goal
        )
      });
    },

    updateUserPreferences: (preferences) => {
      set({
        userPreferences: { ...get().userPreferences, ...preferences }
      });
    },

    updateEnterpriseConstraints: (constraints) => {
      set({
        enterpriseConstraints: { ...get().enterpriseConstraints, ...constraints }
      });
    },

    createImplementation: (implementationData) => {
      const newImplementation: ProjectImplementation = {
        ...implementationData,
        id: `impl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      set({
        implementations: [...get().implementations, newImplementation]
      });
    },

    updateImplementation: (id, updates) => {
      set({
        implementations: get().implementations.map(impl =>
          impl.id === id 
            ? { ...impl, ...updates, updatedAt: new Date() }
            : impl
        )
      });
    },

    deleteImplementation: (id) => {
      set({
        implementations: get().implementations.filter(impl => impl.id !== id)
      });
    },

    // Computed values
    getActiveStacks: () => {
      const { enabledStacks } = get();
      return TECHNOLOGY_STACKS.filter(stack => enabledStacks.includes(stack.id));
    },

    getPhaseConfig: (phase) => {
      const targetPhase = phase || get().currentPhase;
      return DEVELOPMENT_PHASES.find(p => p.id === targetPhase);
    },

    getGoalsByCategory: (category) => {
      return get().experimentalGoals.filter(goal => goal.category === category);
    }
  }))
);