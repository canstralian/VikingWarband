import React from 'react';
import { useVikingGame } from '../lib/stores/useVikingGame';

const WarbandManagement: React.FC = () => {
  const { 
    setGameScreen, 
    warband, 
    healMercenary, 
    restMercenary,
    playerGold 
  } = useVikingGame();

  const calculateTotalPower = () => {
    return warband.reduce((total, merc) => 
      total + merc.stats.attack + merc.stats.defense + merc.stats.speed, 0
    );
  };

  const getHealthColor = (health: number, maxHealth: number) => {
    const percentage = health / maxHealth;
    if (percentage > 0.7) return '#22c55e';
    if (percentage > 0.4) return '#eab308';
    return '#ef4444';
  };

  const getMoraleColor = (morale: number) => {
    if (morale > 70) return '#22c55e';
    if (morale > 40) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="warband-screen">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={() => setGameScreen('menu')}
        >
          ← Back to Hall
        </button>
        <h2 className="screen-title">🛡️ Warband Management</h2>
        <div className="gold-display">Gold: {playerGold} 🪙</div>
      </div>

      <div className="warband-stats">
        <div className="warband-summary">
          <div className="summary-item">
            <span className="summary-label">Warriors:</span>
            <span className="summary-value">{warband.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Power:</span>
            <span className="summary-value">{calculateTotalPower()}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Upkeep Cost:</span>
            <span className="summary-value">{warband.length * 10} 🪙/day</span>
          </div>
        </div>
      </div>

      {warband.length === 0 ? (
        <div className="empty-warband">
          <div className="empty-icon">⚔️</div>
          <h3>No Warriors in Your Warband</h3>
          <p>Visit the recruitment hall to hire your first mercenary!</p>
          <button 
            className="recruit-link-button"
            onClick={() => setGameScreen('recruitment')}
          >
            Recruit Warriors
          </button>
        </div>
      ) : (
        <div className="warband-grid">
          {warband.map((mercenary) => (
            <div key={mercenary.id} className="mercenary-card">
              <div className="mercenary-header">
                <span className="mercenary-icon">{mercenary.icon}</span>
                <div className="mercenary-basic-info">
                  <h3 className="mercenary-name">{mercenary.name}</h3>
                  <p className="mercenary-type">{mercenary.type}</p>
                </div>
              </div>

              <div className="health-bar">
                <div className="bar-label">Health</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{
                      width: `${(mercenary.currentHealth / mercenary.stats.health) * 100}%`,
                      backgroundColor: getHealthColor(mercenary.currentHealth, mercenary.stats.health)
                    }}
                  />
                  <span className="bar-text">
                    {mercenary.currentHealth}/{mercenary.stats.health}
                  </span>
                </div>
              </div>

              <div className="morale-bar">
                <div className="bar-label">Morale</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{
                      width: `${mercenary.morale}%`,
                      backgroundColor: getMoraleColor(mercenary.morale)
                    }}
                  />
                  <span className="bar-text">{mercenary.morale}%</span>
                </div>
              </div>

              <div className="mercenary-stats-grid">
                <div className="stat-item">
                  <span className="stat-label">ATK</span>
                  <span className="stat-value">{mercenary.stats.attack}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">DEF</span>
                  <span className="stat-value">{mercenary.stats.defense}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">SPD</span>
                  <span className="stat-value">{mercenary.stats.speed}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">EXP</span>
                  <span className="stat-value">{mercenary.experience}</span>
                </div>
              </div>

              <div className="mercenary-actions">
                {mercenary.currentHealth < mercenary.stats.health && (
                  <button 
                    className="action-button heal"
                    onClick={() => healMercenary(mercenary.id)}
                    disabled={playerGold < 20}
                  >
                    Heal (20🪙)
                  </button>
                )}
                {mercenary.morale < 100 && (
                  <button 
                    className="action-button rest"
                    onClick={() => restMercenary(mercenary.id)}
                    disabled={playerGold < 10}
                  >
                    Rest (10🪙)
                  </button>
                )}
              </div>

              <div className="equipment-status">
                <div className="equipment-item">
                  <span>Weapon: {mercenary.weapon || 'Basic'}</span>
                </div>
                <div className="equipment-item">
                  <span>Armor: {mercenary.armor || 'Leather'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WarbandManagement;
