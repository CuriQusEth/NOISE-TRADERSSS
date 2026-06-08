/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount, useSendTransaction } from 'wagmi';
import { wagmiConfig } from './lib/wagmi';
import GameApp from './components/GameApp';
import { Sun } from 'lucide-react';
import { parseEther } from 'viem';

const queryClient = new QueryClient();

function GmButton() {
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const sendGMTransaction = () => {
    // 0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3 is the GM contract 
    sendTransaction({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
      value: BigInt(0),
      data: '0x', // Replace with actual GM function signature if needed
    });
  };

  if (!isConnected) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={sendGMTransaction}
        className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
      >
        <Sun size={16} />
        Say GM
      </button>
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GmButton />
        <GameApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

