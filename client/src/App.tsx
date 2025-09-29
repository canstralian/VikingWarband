import { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/inter";
import "./styles/viking-theme.css";
import Game from "./components/Game";
import { useVikingGame } from "./lib/stores/useVikingGame";
import { useTON } from "./lib/stores/useTON";

const queryClient = new QueryClient();

function App() {
  const { initializeGame } = useVikingGame();
  const { address, isConnected } = useTON();

  useEffect(() => {
    const walletAddress = isConnected && address ? address : 'demo_wallet_123';
    initializeGame(walletAddress);
  }, [initializeGame, address, isConnected]);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#2F1B14',
        fontFamily: 'Inter, sans-serif'
      }}>
        <Suspense fallback={
          <div className="loading-screen">
            <div className="viking-logo">⚔️ VIKING MERCENARIES ⚔️</div>
            <div className="loading-text">Loading warband...</div>
          </div>
        }>
          <Game />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default App;
