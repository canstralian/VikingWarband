import React from 'react';
import { useVikingGame } from '../lib/stores/useVikingGame';
import { RAID_CONTRACTS } from '../data/raids';

const RaidContracts: React.FC = () => {
  const { 
    setGameScreen, 
    warband, 
    startRaid,
    calculateWarbandPower 
  } = useVikingGame();

  const warbandPower = calculateWarbandPower();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#eab308';
      case 'Hard': return '#f97316';
      case 'Legendary': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const canTakeRaid = (requiredPower: number) => {
    return warband.length > 0 && warbandPower >= requiredPower;
  };

  return (
    <div className="raids-screen">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={() => setGameScreen('menu')}
        >
          ← Back to Hall
        </button>
        <h2 className="screen-title">🏴‍☠️ Raid Contracts</h2>
        <div className="warband-power">
          Warband Power: {warbandPower} ⚔️
        </div>
      </div>

      {warband.length === 0 ? (
        <div className="no-warband-message">
          <div className="message-icon">⚠️</div>
          <h3>No Warriors Available</h3>
          <p>You need to recruit warriors before you can accept raid contracts.</p>
          <button 
            className="recruit-link-button"
            onClick={() => setGameScreen('recruitment')}
          >
            Recruit Warriors
          </button>
        </div>
      ) : (
        <div className="contracts-grid">
          {RAID_CONTRACTS.map((contract) => (
            <div key={contract.id} className="contract-card">
              <div className="contract-header">
                <h3 className="contract-title">{contract.title}</h3>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(contract.difficulty) }}
                >
                  {contract.difficulty}
                </span>
              </div>

              <div className="contract-description">
                <p>{contract.description}</p>
              </div>

              <div className="contract-location">
                <span className="location-icon">📍</span>
                <span>{contract.location}</span>
              </div>

              <div className="contract-requirements">
                <div className="requirement-item">
                  <span className="req-label">Required Power:</span>
                  <span className={`req-value ${warbandPower >= contract.requiredPower ? 'sufficient' : 'insufficient'}`}>
                    {contract.requiredPower} ⚔️
                  </span>
                </div>
                <div className="requirement-item">
                  <span className="req-label">Estimated Duration:</span>
                  <span className="req-value">{contract.duration}</span>
                </div>
              </div>

              <div className="contract-rewards">
                <h4>Rewards:</h4>
                <div className="rewards-list">
                  <div className="reward-item">
                    <span>Gold: {contract.rewards.gold} 🪙</span>
                  </div>
                  {contract.rewards.ton > 0 && (
                    <div className="reward-item">
                      <span>TON: {contract.rewards.ton} 💎</span>
                    </div>
                  )}
                  <div className="reward-item">
                    <span>Reputation: +{contract.rewards.reputation} ⭐</span>
                  </div>
                  <div className="reward-item">
                    <span>Experience: +{contract.rewards.experience} XP</span>
                  </div>
                </div>
              </div>

              <div className="contract-risks">
                <div className="risk-item">
                  <span className="risk-label">Injury Risk:</span>
                  <span className="risk-value">{contract.injuryRisk}%</span>
                </div>
                <div className="risk-item">
                  <span className="risk-label">Death Risk:</span>
                  <span className="risk-value">{contract.deathRisk}%</span>
                </div>
              </div>

              <button 
                className={`contract-button ${canTakeRaid(contract.requiredPower) ? 'available' : 'unavailable'}`}
                onClick={() => startRaid(contract)}
                disabled={!canTakeRaid(contract.requiredPower)}
              >
                {canTakeRaid(contract.requiredPower) ? 'Accept Contract' : 'Insufficient Power'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RaidContracts;
