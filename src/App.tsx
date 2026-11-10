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

function DenimNetworkBanner() {
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-[#0a0a0a]/90 backdrop-blur border border-[#0052FF]/40 px-3 py-1.5 rounded text-xs font-mono select-none shadow-[0_0_12px_rgba(0,82,255,0.2)]">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
      </span>
      <span className="text-[#0052FF] font-bold">BASE</span>
      <span className="text-gray-500">|</span>
      <span className="text-gray-200 font-semibold tracking-wide">MAINNET [DENIM]</span>
      <span className="text-[10px] text-[#00FF41] bg-[#00FF41]/15 px-1.5 py-0.5 rounded border border-[#00FF41]/30 font-bold">
        200ms
      </span>
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DenimNetworkBanner />
        <GmButton />
        <GameApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

