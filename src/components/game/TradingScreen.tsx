import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGame } from './GameContext';
import { TradingCanvas } from './TradingCanvas';

export function TradingScreen() {
  const { balance, position, assetPrice, buy, sell, noiseLevel } = useGame();
  const controls = useAnimation();

  // Simple vibration and flash wrapper
  const handleBuy = () => {
    buy();
    controls.start({ backgroundColor: ['rgba(0,255,65,0.2)', 'rgba(0,0,0,0)'], transition: { duration: 0.3 } });
  }

  const handleSell = () => {
    sell();
    controls.start({ backgroundColor: ['rgba(255,49,49,0.2)', 'rgba(0,0,0,0)'], transition: { duration: 0.3 } });
  }

  const totalValue = balance + (position * assetPrice);

  return (
    <motion.div animate={controls} className="flex flex-col w-full h-full relative font-mono select-none">
      
      {/* Top HUD */}
      <header className="flex justify-between items-center border-b border-[#2a2a2a] p-3 z-10 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <div className="bg-[#BC13FE] text-black px-2 py-0.5 font-black text-sm italic skew-x-[-12deg]">NOISE</div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Status</span>
            <span className="text-[#00FF41] text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse"></span> VOLATILE
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-[#151515] border border-[#2a2a2a] px-3 py-1 flex flex-col items-end">
            <span className="text-[8px] text-gray-500">PORTFOLIO</span>
            <span className="text-[#e0e0e0] font-bold text-sm">${totalValue.toFixed(2)}</span>
          </div>
          <div className="bg-[#151515] border border-[#2a2a2a] px-3 py-1 flex flex-col items-end">
            <span className="text-[8px] text-gray-500">BALANCE</span>
            <span className="text-[#BC13FE] font-bold text-sm">${balance.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Noise Indicator Left Sidebar style */}
      <div className="absolute left-4 top-24 z-10 bg-[#0a0a0a] border border-[#2a2a2a] p-2 flex flex-col items-center">
        <div className="text-[8px] text-gray-500 uppercase font-black mb-2">Noise</div>
        <div className="w-2 h-24 bg-[#151515] relative overflow-hidden flex flex-col justify-end border border-[#2a2a2a]">
          <motion.div 
            className="w-full bg-[#FF3131]"
            animate={{ height: `${noiseLevel * 100}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </div>
        <span className="text-[10px] text-[#FF3131] mt-1 font-bold">{Math.round(noiseLevel * 100)}%</span>
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative bg-[#0a0a0a]">
        <div className="absolute top-4 right-4 z-20 text-right pointer-events-none">
          <h2 className="text-xl font-black text-white italic tracking-tighter">$MEME / BASE</h2>
          <p className="text-[#00FF41] text-md font-bold">${assetPrice.toFixed(0)}</p>
        </div>
        <TradingCanvas />
        {/* Current Price overlay center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
           <motion.div 
             className="text-6xl md:text-8xl font-black opacity-5 text-[#BC13FE]"
             animate={{ scale: 1 + noiseLevel * 0.5 }}
           >
             ${assetPrice.toFixed(0)}
           </motion.div>
        </div>
      </div>

      {/* Controls HUD */}
      <div className="bg-gradient-to-t from-black to-transparent flex items-center justify-center gap-4 px-4 pb-4 pt-12 z-10">
        <button 
          onClick={handleBuy}
          disabled={balance < assetPrice}
          className="flex-1 bg-[#00FF41] text-black font-black py-4 rounded-sm shadow-[0_0_15px_rgba(0,255,65,0.4)] text-xl active:scale-95 disabled:opacity-20 disabled:shadow-none flex flex-col items-center leading-none"
        >
          <span>APE IN</span>
          <span className="text-[10px] font-bold opacity-70 mt-1 uppercase">Buy/Long</span>
        </button>
        <button 
          onClick={handleSell}
          disabled={position <= 0}
          className="flex-1 bg-[#FF3131] text-white font-black py-4 rounded-sm shadow-[0_0_15px_rgba(255,49,49,0.4)] text-xl active:scale-95 disabled:opacity-20 disabled:shadow-none flex flex-col items-center leading-none"
        >
          <span>REKT IT</span>
          <span className="text-[10px] font-bold opacity-70 mt-1 uppercase">Sell/Short</span>
        </button>
      </div>

      {/* Bottom Console */}
      <footer className="mt-auto h-12 bg-[#0a0a0a] border-t border-[#2a2a2a] flex items-center px-4 justify-between shrink-0">
        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
          Network: <span className="text-[#e0e0e0]">Base</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#00FF41] border border-[#050505] shadow-[0_0_5px_#00FF41]"></div>
      </footer>
      
    </motion.div>
  );
}
