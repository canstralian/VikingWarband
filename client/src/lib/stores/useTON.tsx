import { create } from 'zustand';

interface TONState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connectionError: string | null;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => void;
  makePayment: (amount: number, description: string) => Promise<void>;
}

export const useTON = create<TONState>((set, get) => ({
  isConnected: false,
  address: null,
  balance: 0,
  connectionError: null,

  connect: async () => {
    try {
      set({ connectionError: null });
      
      // Simulate TON wallet connection
      // In a real implementation, you would use TON Connect SDK
      const mockAddress = "EQD...mock...address...123";
      const mockBalance = Math.random() * 10;
      
      set({
        isConnected: true,
        address: mockAddress,
        balance: parseFloat(mockBalance.toFixed(2))
      });
      
      console.log('TON Wallet connected successfully');
    } catch (error) {
      set({ 
        connectionError: 'Failed to connect to TON wallet. Please try again.',
        isConnected: false 
      });
      console.error('TON connection error:', error);
    }
  },

  disconnect: () => {
    set({
      isConnected: false,
      address: null,
      balance: 0,
      connectionError: null
    });
    console.log('TON Wallet disconnected');
  },

  makePayment: async (amount: number, description: string) => {
    const { isConnected, balance } = get();
    
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    
    if (balance < amount) {
      throw new Error('Insufficient balance');
    }
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update balance
      set({ balance: balance - amount });
      
      console.log(`Payment successful: ${amount} TON for ${description}`);
    } catch (error) {
      console.error('Payment failed:', error);
      throw new Error('Payment failed. Please try again.');
    }
  }
}));
