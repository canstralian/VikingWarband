import React from 'react';
import { useVikingGame } from '../lib/stores/useVikingGame';
import { useTON } from '../lib/stores/useTON';

const MainMenu: React.FC = () => {
  const { setGameScreen, playerGold, playerReputation } = useVikingGame();
  const { isConnected } = useTON();

  return (
    <div className="main-menu">
      <div className="menu-header">
        <h1 className="game-title">⚔️ VIKING MERCENARIES ⚔️</h1>
        <div className="subtitle">Forge your legend in blood and gold</div>
      </div>

      <div className="player-stats">
        <div className="stat-item">
          <span className="stat-label">Gold:</span>
          <span className="stat-value">{playerGold} 🪙</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Reputation:</span>
          <span className="stat-value">{playerReputation} ⭐</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">TON Wallet:</span>
          <span className={`stat-value ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Connected ✓' : 'Disconnected ✗'}
          </span>
        </div>
      </div>

      <div className="menu-buttons">
        <button 
          className="menu-button primary"
          onClick={() => setGameScreen('warband')}
        >
          <span className="button-icon">🛡️</span>
          <span>Manage Warband</span>
        </button>

        <button 
          className="menu-button secondary"
          onClick={() => setGameScreen('recruitment')}
        >
          <span className="button-icon">⚔️</span>
          <span>Recruit Warriors</span>
        </button>

        <button 
          className="menu-button secondary"
          onClick={() => setGameScreen('raids')}
        >
          <span className="button-icon">🏴‍☠️</span>
          <span>Raid Contracts</span>
        </button>
      </div>

      <div className="menu-footer">
        <div className="rune-decoration">ᚱᚢᚾᛖᛋ</div>
      </div>
    </div>
  );
};

export default MainMenu;
