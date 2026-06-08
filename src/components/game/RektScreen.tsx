import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from './GameContext';
import { useAccount, useSendTransaction, useSignMessage } from 'wagmi';
import { generateAttributionPayload } from '../../lib/erc8021';

export function RektScreen() {
  const { resetGame } = useGame();
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const { signMessageAsync } = useSignMessage();
  const [signed, setSigned] = useState(false);

  const handleRecord = async () => {
    try {
      if (!signed) {
        // SIWE Simulation for score
        const message = `www.noisetrader.game wants you to sign in with your Ethereum account:\n${address}\n\nSign in to submit your score.\n\nURI: https://www.noisetrader.game\nVersion: 1\nChain ID: 8453\nNonce: ${Math.random().toString(36).substring(7)}`;
        await signMessageAsync({ account: address as any, message });
        setSigned(true);
      }
      
      // Generate ERC-8021 attribution payload
      const data = generateAttributionPayload('[BUILDER_CODE]', 'REKT_SCORE');
      sendTransaction({
        to: address, // sending to self for demo score recording
        value: BigInt(0),
        data: data as `0x${string}`
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#050505] text-[#e0e0e0] p-6 relative overflow-hidden shadow-[inset_0_0_150px_rgba(255,49,49,0.2)]">
      <motion.div
        initial={{ scale: 2, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.8 }}
        className="text-8xl font-black text-center text-black bg-[#FF3131] px-6 py-2 skew-x-[-12deg] mb-8 border-4 border-[#1a1a1a] shadow-[0_0_30px_rgba(255,49,49,0.8)]"
      >
        REKT
      </motion.div>

      <p className="font-mono text-center text-gray-400 mb-12 max-w-sm text-sm">
        You got liquidated, paper hands. The whales took your liquidity. 
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs z-10">
        <button 
          onClick={handleRecord}
          className="w-full py-4 bg-[#151515] border border-[#2a2a2a] text-[#e0e0e0] hover:border-[#FF3131] hover:text-[#FF3131] font-bold uppercase tracking-widest transition-colors font-mono shadow-[0_0_15px_rgba(255,49,49,0.1)] hover:shadow-[0_0_15px_rgba(255,49,49,0.3)] text-sm"
        >
          {signed ? "SUBMIT TX" : "Record This Legendary Trade on-chain"}
        </button>
        <button 
          onClick={resetGame}
          className="w-full py-4 bg-[#FF3131] text-white font-bold uppercase tracking-widest border-b-4 border-red-900 active:translate-y-1 active:border-b-0 transition-transform font-mono"
        >
          APE AGAIN
        </button>
      </div>

      {/* Raining Red Candles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-16 bg-[#FF3131] opacity-20"
          style={{ left: `${Math.random() * 100}%` }}
          initial={{ top: -100 }}
          animate={{ top: '100%' }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}
