import React from 'react';
import { useDevelopment } from '../lib/stores/useDevelopment';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DevelopmentPhase } from '../types/development';
import { 
  Settings,
  User,
  Zap,
  Shield,
  ArrowLeft
} from 'lucide-react';

interface DevelopmentSettingsProps {
  onBack: () => void;
}

const DevelopmentSettings: React.FC<DevelopmentSettingsProps> = ({ onBack }) => {
  const {
    currentPhase,
    userPreferences,
    enterpriseConstraints,
    enabledStacks,
    updateUserPreferences,
    updateEnterpriseConstraints,
    toggleTechnologyStack,
    setPhase
  } = useDevelopment();

  const handlePhaseChange = (phase: DevelopmentPhase) => {
    setPhase(phase);
  };

  const handleStyleChange = (style: any) => {
    updateUserPreferences({ developmentStyle: style });
  };

  const handleComplexityChange = (complexity: any) => {
    updateUserPreferences({ complexityPreference: complexity });
  };

  const handleInnovationChange = (innovation: any) => {
    updateUserPreferences({ innovationLevel: innovation });
  };

  const handleCloudProviderChange = (provider: any) => {
    updateEnterpriseConstraints({ cloudProvider: provider });
  };

  return (
    <div className="development-settings">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        <h2 className="screen-title">⚙️ Development Settings</h2>
        <div className="settings-indicator">
          <Settings className="w-5 h-5 mr-2" />
          Configuration
        </div>
      </div>

      <div className="settings-grid">
        {/* Development Phase Selection */}
        <Card className="phase-settings">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Development Phase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="setting-description">
              Choose your current development methodology focus.
            </div>
            <div className="option-grid">
              {(['greenfield', 'creative_exploration', 'brownfield'] as DevelopmentPhase[]).map((phase) => (
                <button
                  key={phase}
                  className={`option-button ${currentPhase === phase ? 'active' : ''}`}
                  onClick={() => handlePhaseChange(phase)}
                >
                  <div className="option-icon">
                    {phase === 'greenfield' && '🌱'}
                    {phase === 'creative_exploration' && '🎨'}
                    {phase === 'brownfield' && '🔧'}
                  </div>
                  <div className="option-text">
                    {phase === 'greenfield' && '0-to-1'}
                    {phase === 'creative_exploration' && 'Creative'}
                    {phase === 'brownfield' && 'Iterative'}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Preferences */}
        <Card className="user-preferences">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Development Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="preference-section">
              <label className="preference-label">Development Approach</label>
              <div className="option-grid">
                {['vibe_coding', 'ai_native', 'spec_driven', 'test_driven'].map((style) => (
                  <button
                    key={style}
                    className={`option-button ${userPreferences.developmentStyle === style ? 'active' : ''}`}
                    onClick={() => handleStyleChange(style)}
                  >
                    <div className="option-text">
                      {style === 'vibe_coding' && 'Vibe Coding'}
                      {style === 'ai_native' && 'AI-Native'}
                      {style === 'spec_driven' && 'Spec-Driven'}
                      {style === 'test_driven' && 'Test-Driven'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-section">
              <label className="preference-label">Complexity Level</label>
              <div className="option-grid">
                {['simple', 'moderate', 'advanced'].map((complexity) => (
                  <button
                    key={complexity}
                    className={`option-button ${userPreferences.complexityPreference === complexity ? 'active' : ''}`}
                    onClick={() => handleComplexityChange(complexity)}
                  >
                    <div className="option-text">
                      {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-section">
              <label className="preference-label">Innovation Level</label>
              <div className="option-grid">
                {['conservative', 'balanced', 'cutting_edge'].map((innovation) => (
                  <button
                    key={innovation}
                    className={`option-button ${userPreferences.innovationLevel === innovation ? 'active' : ''}`}
                    onClick={() => handleInnovationChange(innovation)}
                  >
                    <div className="option-text">
                      {innovation === 'cutting_edge' ? 'Cutting Edge' : 
                       innovation.charAt(0).toUpperCase() + innovation.slice(1)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enterprise Constraints */}
        <Card className="enterprise-settings">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Enterprise Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="preference-section">
              <label className="preference-label">Cloud Provider</label>
              <div className="option-grid">
                {['aws', 'azure', 'gcp', 'hybrid', 'on_premise'].map((provider) => (
                  <button
                    key={provider}
                    className={`option-button ${enterpriseConstraints.cloudProvider === provider ? 'active' : ''}`}
                    onClick={() => handleCloudProviderChange(provider)}
                  >
                    <div className="option-text">
                      {provider === 'on_premise' ? 'On-Premise' :
                       provider === 'gcp' ? 'GCP' :
                       provider.toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-section">
              <label className="preference-label">Compliance Requirements</label>
              <div className="compliance-badges">
                {enterpriseConstraints.complianceRequirements.map((req) => (
                  <Badge key={req} variant="outline">{req}</Badge>
                ))}
              </div>
            </div>

            <div className="preference-section">
              <label className="preference-label">Design System</label>
              <div className="setting-value">
                {enterpriseConstraints.designSystemRequired ? (
                  <Badge variant="default">Required</Badge>
                ) : (
                  <Badge variant="secondary">Optional</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack Override */}
        <Card className="tech-override">
          <CardHeader>
            <CardTitle>Active Technology Stacks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="tech-list">
              <div className="tech-category">
                <div className="category-title">Frontend</div>
                <div className="tech-badges">
                  {enabledStacks.includes('react') && <Badge>React</Badge>}
                  {enabledStacks.includes('vue') && <Badge>Vue.js</Badge>}
                  {enabledStacks.includes('svelte') && <Badge>Svelte</Badge>}
                </div>
              </div>
              
              <div className="tech-category">
                <div className="category-title">Backend</div>
                <div className="tech-badges">
                  {enabledStacks.includes('node_express') && <Badge>Node.js + Express</Badge>}
                  {enabledStacks.includes('python_fastapi') && <Badge>Python + FastAPI</Badge>}
                  {enabledStacks.includes('rust_actix') && <Badge>Rust + Actix</Badge>}
                </div>
              </div>
              
              <div className="tech-category">
                <div className="category-title">Database</div>
                <div className="tech-badges">
                  {enabledStacks.includes('postgresql') && <Badge>PostgreSQL</Badge>}
                  {enabledStacks.includes('mongodb') && <Badge>MongoDB</Badge>}
                  {enabledStacks.includes('redis') && <Badge>Redis</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevelopmentSettings;