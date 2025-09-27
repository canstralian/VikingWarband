import React from 'react';
import { useTON } from '../lib/stores/useTON';

const TONWallet: React.FC = () => {
  const { 
    isConnected, 
    address, 
    balance, 
    connect, 
    disconnect,
    connectionError 
  } = useTON();

  return (
    <div className="ton-wallet-widget">
      <div className="wallet-header">
        <span className="wallet-icon">💎</span>
        <span className="wallet-title">TON Wallet</span>
      </div>
      
      {!isConnected ? (
        <div className="wallet-disconnected">
          <button 
            className="connect-button"
            onClick={connect}
          >
            Connect Wallet
          </button>
          {connectionError && (
            <div className="connection-error">
              {connectionError}
            </div>
          )}
        </div>
      ) : (
        <div className="wallet-connected">
          <div className="wallet-info">
            <div className="wallet-address">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Unknown'}
            </div>
            <div className="wallet-balance">
              {balance} TON
            </div>
          </div>
          <button 
            className="disconnect-button"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default TONWallet;
