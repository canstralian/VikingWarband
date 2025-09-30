import React, { useEffect } from 'react';
import { useDevelopment } from '../lib/stores/useDevelopment';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useVikingGame } from '../lib/stores/useVikingGame';
import { DevelopmentPhase } from '../types/development';
import { 
  Beaker, 
  Code, 
  Layers, 
  Settings, 
  TrendingUp, 
  Users, 
  Zap,
  CheckCircle,
  Circle,
  ArrowLeft
} from 'lucide-react';

const DevelopmentDashboard: React.FC = () => {
  const { setGameScreen } = useVikingGame();
  const {
    currentPhase,
    experimentalGoals,
    userPreferences,
    enterpriseConstraints,
    implementations,
    isInitialized,
    initialize,
    setPhase,
    getPhaseConfig,
    getGoalsByCategory,
    getActiveStacks
  } = useDevelopment();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  const phaseConfig = getPhaseConfig();
  const activeStacks = getActiveStacks();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technology_independence': return <Code className="w-5 h-5" />;
      case 'enterprise_constraints': return <Settings className="w-5 h-5" />;
      case 'user_centric': return <Users className="w-5 h-5" />;
      case 'creative_iterative': return <Beaker className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const getPhaseColor = (phase: DevelopmentPhase) => {
    switch (phase) {
      case 'greenfield': return 'bg-green-500';
      case 'creative_exploration': return 'bg-purple-500';
      case 'brownfield': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="development-dashboard">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={() => setGameScreen('menu')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hall
        </button>
        <h2 className="screen-title">🧪 Development Laboratory</h2>
        <div className="phase-indicator">
          Phase: {phaseConfig?.icon} {phaseConfig?.name}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Development Phases */}
        <Card className="phase-selector">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Development Phases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['greenfield', 'creative_exploration', 'brownfield'].map((phase) => {
                const config = getPhaseConfig(phase as DevelopmentPhase);
                const isActive = currentPhase === phase;
                
                return (
                  <div
                    key={phase}
                    className={`phase-card ${isActive ? 'active' : ''}`}
                    onClick={() => setPhase(phase as DevelopmentPhase)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`phase-icon ${getPhaseColor(phase as DevelopmentPhase)}`}>
                          {config?.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{config?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {config?.description}
                          </div>
                        </div>
                      </div>
                      {isActive && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                    {isActive && (
                      <div className="mt-3">
                        <div className="text-sm font-medium mb-2">Key Activities:</div>
                        <ul className="text-xs space-y-1">
                          {config?.keyActivities.map((activity: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-current rounded-full" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Experimental Goals */}
        <Card className="goals-overview">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Experimental Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experimentalGoals.map((goal) => (
                <div key={goal.id} className="goal-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(goal.category)}
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <Badge variant="outline">{goal.progress}%</Badge>
                  </div>
                  <Progress value={goal.progress} className="mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {goal.description}
                  </p>
                  <div className="milestones">
                    <div className="text-xs font-medium mb-1">
                      Milestones ({goal.completedMilestones.length}/{goal.milestones.length})
                    </div>
                    <div className="milestone-list">
                      {goal.milestones.map((milestone, idx) => {
                        const isCompleted = goal.completedMilestones.includes(milestone);
                        return (
                          <div key={idx} className={`milestone ${isCompleted ? 'completed' : ''}`}>
                            {isCompleted ? (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            ) : (
                              <Circle className="w-3 h-3 text-gray-400" />
                            )}
                            <span className="text-xs">{milestone}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="tech-stack">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Active Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeStacks.map((stack) => (
                <div key={stack.id} className="tech-item">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{stack.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {stack.description}
                      </div>
                    </div>
                    <Badge variant="secondary">{stack.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Implementation */}
        <Card className="current-implementation">
          <CardHeader>
            <CardTitle>Current Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            {implementations.length > 0 && (
              <div className="impl-details">
                <div className="font-medium mb-2">{implementations[0].name}</div>
                <p className="text-sm text-muted-foreground mb-3">
                  {implementations[0].description}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Progress</span>
                  <Badge variant="outline">{implementations[0].progress}%</Badge>
                </div>
                <Progress value={implementations[0].progress} className="mb-3" />
                <div className="implementation-meta">
                  <div className="text-xs text-muted-foreground">
                    Status: <Badge variant="secondary">{implementations[0].status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Phase: <Badge variant="outline">{implementations[0].phase}</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevelopmentDashboard;