import React from 'react';
import { useVikingGame } from '../lib/stores/useVikingGame';
import { useTON } from '../lib/stores/useTON';
import { MERCENARY_TYPES } from '../data/mercenaries';
import { MercenaryType } from '../types/game';

const MercenaryRecruitment: React.FC = () => {
  const { 
    setGameScreen, 
    playerGold, 
    recruitMercenary, 
    canAffordMercenary 
  } = useVikingGame();
  const { makePayment } = useTON();

  const handleRecruit = async (mercenaryType: MercenaryType) => {
    const cost = mercenaryType.goldCost;
    const tonCost = mercenaryType.tonCost;

    if (tonCost > 0) {
      try {
        await makePayment(tonCost, `Recruit ${mercenaryType.name}`);
      } catch (error) {
        console.error('TON payment failed:', error);
        return;
      }
    }

    recruitMercenary(mercenaryType);
  };

  return (
    <div className="recruitment-screen">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={() => setGameScreen('menu')}
        >
          ← Back to Hall
        </button>
        <h2 className="screen-title">🏛️ Mercenary Recruitment</h2>
        <div className="gold-display">Gold: {playerGold} 🪙</div>
      </div>

      <div className="mercenary-grid">
        {MERCENARY_TYPES.map((mercType) => (
          <div key={mercType.id} className="mercenary-card">
            <div className="mercenary-portrait">
              <span className="mercenary-icon">{mercType.icon}</span>
            </div>
            
            <div className="mercenary-info">
              <h3 className="mercenary-name">{mercType.name}</h3>
              <p className="mercenary-description">{mercType.description}</p>
              
              <div className="mercenary-stats">
                <div className="stat">
                  <span className="stat-name">Health:</span>
                  <span className="stat-bar">
                    {'█'.repeat(Math.floor(mercType.baseStats.health / 10))}
                  </span>
                  <span className="stat-value">{mercType.baseStats.health}</span>
                </div>
                <div className="stat">
                  <span className="stat-name">Attack:</span>
                  <span className="stat-bar">
                    {'█'.repeat(Math.floor(mercType.baseStats.attack / 10))}
                  </span>
                  <span className="stat-value">{mercType.baseStats.attack}</span>
                </div>
                <div className="stat">
                  <span className="stat-name">Defense:</span>
                  <span className="stat-bar">
                    {'█'.repeat(Math.floor(mercType.baseStats.defense / 10))}
                  </span>
                  <span className="stat-value">{mercType.baseStats.defense}</span>
                </div>
                <div className="stat">
                  <span className="stat-name">Speed:</span>
                  <span className="stat-bar">
                    {'█'.repeat(Math.floor(mercType.baseStats.speed / 10))}
                  </span>
                  <span className="stat-value">{mercType.baseStats.speed}</span>
                </div>
              </div>

              <div className="mercenary-abilities">
                <strong>Abilities:</strong>
                <ul>
                  {mercType.abilities.map((ability, index) => (
                    <li key={index}>{ability}</li>
                  ))}
                </ul>
              </div>

              <div className="recruitment-cost">
                <div className="cost-item">
                  <span>Gold: {mercType.goldCost} 🪙</span>
                </div>
                {mercType.tonCost > 0 && (
                  <div className="cost-item">
                    <span>TON: {mercType.tonCost} 💎</span>
                  </div>
                )}
              </div>

              <button 
                className={`recruit-button ${canAffordMercenary(mercType) ? 'affordable' : 'expensive'}`}
                onClick={() => handleRecruit(mercType)}
                disabled={!canAffordMercenary(mercType)}
              >
                {canAffordMercenary(mercType) ? 'Recruit' : 'Cannot Afford'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MercenaryRecruitment;
