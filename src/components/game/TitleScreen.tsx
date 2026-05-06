import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from './GameContext';
import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi';

export function TitleScreen() {
  const { setScreen } = useGame();
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction } = useSendTransaction();

  const handleGM = () => {
    // In a real app we would send an actual transaction, e.g., to a contract
    // We'll simulate by calling sendTransaction with 0 value to self
    sendTransaction({
      to: address,
      value: BigInt(0),
      data: '0x474d', // 'GM' in hex or similar payload
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden p-4">
      {/* Chaotic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              border: `2px solid ${Math.random() > 0.5 ? '#00FF41' : '#FF3131'}`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 5 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="z-10 flex flex-col items-center z-10"
      >
        <h1 className="bg-[#BC13FE] text-black px-6 py-2 font-black text-6xl md:text-8xl italic skew-x-[-12deg] tracking-tighter mb-6 text-center">
          NOISE<br/>TRADERS
        </h1>
        <p className="text-sm md:text-base text-gray-400 uppercase tracking-widest mb-12 text-center">
          Survive the Base Mainnet Chaos
        </p>

        {!isConnected ? (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="w-full py-4 border border-[#2a2a2a] bg-[#151515] text-[#00FF41] font-bold uppercase hover:bg-[#00FF41] hover:text-black transition-colors"
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-xs items-center">
            <p className="text-[10px] text-gray-500 truncate w-full text-center font-bold tracking-tighter uppercase">
              Connected: {address}
            </p>
            <button
              onClick={() => setScreen('TRADING')}
              className="w-full py-4 bg-[#00FF41] text-black font-bold uppercase border-b-4 border-green-800 active:translate-y-1 active:border-b-0 transition-all font-mono"
            >
              Enter Market
            </button>
            <button
              onClick={handleGM}
              className="w-full py-3 bg-[#151515] border border-[#2a2a2a] text-[#e0e0e0] hover:border-[#00FF41] text-sm uppercase font-mono"
            >
              Say GM (On-chain)
            </button>
            <button
              onClick={() => disconnect()}
              className="text-[10px] text-[#FF3131] mt-4 uppercase font-bold tracking-widest underline"
            >
              Disconnect
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
