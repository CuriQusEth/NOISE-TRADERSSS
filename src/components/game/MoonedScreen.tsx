import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from './GameContext';
import { useAccount, useSendTransaction, useSignMessage } from 'wagmi';
import { generateAttributionPayload } from '../../lib/erc8021';

export function MoonedScreen() {
  const { resetGame, balance, position, assetPrice } = useGame();
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const { signMessageAsync } = useSignMessage();
  const [signed, setSigned] = useState(false);
  
  const totalValue = balance + (position * assetPrice);

  const handleRecord = async () => {
    try {
      if (!signed) {
        const message = `www.noisetrader.game wants you to sign in with your Ethereum account:\n${address}\n\nSign in to submit your Mooned score: $${totalValue.toFixed(2)}.\n\nURI: https://www.noisetrader.game\nVersion: 1\nChain ID: 8453\nNonce: ${Math.random().toString(36).substring(7)}`;
        await signMessageAsync({ account: address as any, message });
        setSigned(true);
      }

      const data = generateAttributionPayload('[BUILDER_CODE]', 'MOON_SCORE');
      sendTransaction({
        to: address,
        value: BigInt(0),
        data: data as `0x${string}`
      });
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#050505] text-[#e0e0e0] p-6 relative overflow-hidden shadow-[inset_0_0_150px_rgba(0,255,65,0.15)]">
      <motion.div
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-6xl md:text-8xl font-black text-center text-black bg-[#00FF41] px-6 py-2 skew-x-[-12deg] mb-8 border-4 border-[#1a1a1a] shadow-[0_0_30px_rgba(0,255,65,0.6)]"
      >
        MOONED 🚀
      </motion.div>

      <div className="text-3xl font-mono text-center mb-12 relative z-10 bg-[#0a0a0a] p-6 border border-[#2a2a2a] shadow-[0_0_20px_rgba(0,255,65,0.1)] flex flex-col items-center">
        <span className="block text-[10px] text-gray-500 mb-2 uppercase tracking-widest font-bold">Final Bag</span>
        ${totalValue.toFixed(2)}
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs z-10">
        <button 
          onClick={handleRecord}
          className="w-full py-4 bg-[#0a0a0a] border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] font-mono text-xs"
        >
          {signed ? "SUBMIT TX" : "Record This Legendary Trade on-chain"}
        </button>
        <button 
          onClick={resetGame}
          className="w-full py-4 text-gray-500 hover:text-[#e0e0e0] uppercase transition-colors text-xs font-bold tracking-widest"
        >
          TRADE MORE
        </button>
      </div>

      {/* Green Lasers */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-[#00FF41] w-full"
          style={{ top: `${Math.random() * 100}%` }}
          initial={{ left: '-100%', opacity: 0 }}
          animate={{ left: '100%', opacity: Math.random() * 0.5 + 0.1 }}
          transition={{
            duration: Math.random() * 1 + 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random()
          }}
        />
      ))}
    </div>
  )
}
