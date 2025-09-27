import React, { useState, useEffect } from 'react';
import { useVikingGame } from '../lib/stores/useVikingGame';
import { useAudio } from '../lib/stores/useAudio';

const Combat: React.FC = () => {
  const { 
    currentRaid, 
    selectedMercenaries,
    endCombat,
    setGameScreen 
  } = useVikingGame();
  
  const { playHit, playSuccess } = useAudio();
  
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [combatOver, setCombatOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  useEffect(() => {
    if (currentRaid) {
      setCombatLog([`⚔️ Raid begins: ${currentRaid.title}!`]);
      setPlayerHealth(100);
      setEnemyHealth(100);
      setCombatOver(false);
      setVictory(false);
      setCurrentTurn(0);
    }
  }, [currentRaid]);

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev, message]);
  };

  const performAction = (action: string) => {
    if (combatOver) return;

    setSelectedAction(action);
    
    let damage = 0;
    let logMessage = '';

    switch (action) {
      case 'attack':
        damage = Math.floor(Math.random() * 25) + 15;
        logMessage = `🗡️ Your warriors attack for ${damage} damage!`;
        playHit();
        break;
      case 'defend':
        damage = Math.floor(Math.random() * 10) + 5;
        logMessage = `🛡️ Your warriors defend, dealing ${damage} counter damage!`;
        break;
      case 'special':
        damage = Math.floor(Math.random() * 35) + 20;
        logMessage = `⚡ Your warriors unleash a special attack for ${damage} damage!`;
        playHit();
        break;
    }

    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    setEnemyHealth(newEnemyHealth);
    addToCombatLog(logMessage);

    // Check if enemy is defeated
    if (newEnemyHealth <= 0) {
      addToCombatLog('🎉 Victory! The enemies are defeated!');
      setCombatOver(true);
      setVictory(true);
      playSuccess();
      return;
    }

    // Enemy turn
    setTimeout(() => {
      const enemyDamage = Math.floor(Math.random() * 20) + 10;
      const newPlayerHealth = Math.max(0, playerHealth - enemyDamage);
      setPlayerHealth(newPlayerHealth);
      addToCombatLog(`💀 Enemies strike back for ${enemyDamage} damage!`);

      if (newPlayerHealth <= 0) {
        addToCombatLog('💀 Defeat! Your warriors have fallen...');
        setCombatOver(true);
        setVictory(false);
      }

      setCurrentTurn(prev => prev + 1);
      setSelectedAction(null);
    }, 1500);
  };

  const finishCombat = () => {
    if (currentRaid) {
      endCombat(victory);
    }
    setGameScreen('menu');
  };

  if (!currentRaid) {
    return (
      <div className="combat-screen">
        <div className="error-message">
          <h2>No active raid</h2>
          <button onClick={() => setGameScreen('raids')}>Return to Contracts</button>
        </div>
      </div>
    );
  }

  return (
    <div className="combat-screen">
      <div className="combat-header">
        <h2 className="combat-title">⚔️ {currentRaid.title}</h2>
        <div className="combat-turn">Turn: {currentTurn + 1}</div>
      </div>

      <div className="combat-arena">
        <div className="combat-side player-side">
          <div className="combatant-info">
            <h3>🛡️ Your Warband</h3>
            <div className="health-bar">
              <div className="health-label">Health: {playerHealth}/100</div>
              <div className="health-bar-container">
                <div 
                  className="health-bar-fill player"
                  style={{ width: `${playerHealth}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="warriors-display">
            {selectedMercenaries.slice(0, 3).map((merc, index) => (
              <div key={index} className="warrior-icon">
                {merc.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="combat-center">
          <div className="vs-indicator">⚔️ VS ⚔️</div>
          <div className="combat-effects">
            {selectedAction && (
              <div className={`action-effect ${selectedAction}`}>
                {selectedAction === 'attack' && '💥'}
                {selectedAction === 'defend' && '🛡️'}
                {selectedAction === 'special' && '⚡'}
              </div>
            )}
          </div>
        </div>

        <div className="combat-side enemy-side">
          <div className="combatant-info">
            <h3>💀 Enemies</h3>
            <div className="health-bar">
              <div className="health-label">Health: {enemyHealth}/100</div>
              <div className="health-bar-container">
                <div 
                  className="health-bar-fill enemy"
                  style={{ width: `${enemyHealth}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="enemies-display">
            <div className="enemy-icon">👹</div>
            <div className="enemy-icon">⚔️</div>
            <div className="enemy-icon">🏹</div>
          </div>
        </div>
      </div>

      {!combatOver ? (
        <div className="combat-actions">
          <h3>Choose your action:</h3>
          <div className="action-buttons">
            <button 
              className="action-button attack"
              onClick={() => performAction('attack')}
              disabled={selectedAction !== null}
            >
              🗡️ Attack
            </button>
            <button 
              className="action-button defend"
              onClick={() => performAction('defend')}
              disabled={selectedAction !== null}
            >
              🛡️ Defend
            </button>
            <button 
              className="action-button special"
              onClick={() => performAction('special')}
              disabled={selectedAction !== null}
            >
              ⚡ Special
            </button>
          </div>
        </div>
      ) : (
        <div className="combat-results">
          <div className={`result-message ${victory ? 'victory' : 'defeat'}`}>
            {victory ? (
              <>
                <h2>🎉 VICTORY! 🎉</h2>
                <p>Your warriors have triumphed!</p>
                <div className="rewards-earned">
                  <div>Gold earned: +{currentRaid.rewards.gold} 🪙</div>
                  {currentRaid.rewards.ton > 0 && (
                    <div>TON earned: +{currentRaid.rewards.ton} 💎</div>
                  )}
                  <div>Reputation: +{currentRaid.rewards.reputation} ⭐</div>
                  <div>Experience: +{currentRaid.rewards.experience} XP</div>
                </div>
              </>
            ) : (
              <>
                <h2>💀 DEFEAT 💀</h2>
                <p>Your warriors have fallen in battle...</p>
                <p>No rewards earned this time.</p>
              </>
            )}
          </div>
          <button 
            className="finish-combat-button"
            onClick={finishCombat}
          >
            Return to Hall
          </button>
        </div>
      )}

      <div className="combat-log">
        <h4>Combat Log:</h4>
        <div className="log-entries">
          {combatLog.map((entry, index) => (
            <div key={index} className="log-entry">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Combat;
