import React from 'react';
import { useVikingGame } from '../lib/stores/useVikingGame';
import MainMenu from './MainMenu';
import MercenaryRecruitment from './MercenaryRecruitment';
import WarbandManagement from './WarbandManagement';
import RaidContracts from './RaidContracts';
import Combat from './Combat';
import TONWallet from './TONWallet';

const Game: React.FC = () => {
  const { gameScreen } = useVikingGame();

  const renderScreen = () => {
    switch (gameScreen) {
      case 'menu':
        return <MainMenu />;
      case 'recruitment':
        return <MercenaryRecruitment />;
      case 'warband':
        return <WarbandManagement />;
      case 'raids':
        return <RaidContracts />;
      case 'combat':
        return <Combat />;
      default:
        return <MainMenu />;
    }
  };

  return (
    <div className="game-container">
      <TONWallet />
      {renderScreen()}
    </div>
  );
};

export default Game;
