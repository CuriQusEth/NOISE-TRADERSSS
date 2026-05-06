import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type ScreenState = 'TITLE' | 'TRADING' | 'REKT' | 'MOONED' | 'LEADERBOARD';

export interface PricePoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface GameContextType {
  screen: ScreenState;
  setScreen: (screen: ScreenState) => void;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  assetPrice: number;
  priceHistory: PricePoint[];
  buy: () => void;
  sell: () => void;
  noiseLevel: number; // 0 to 1
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<ScreenState>('TITLE');
  const [balance, setBalance] = useState<number>(1000);
  const [position, setPosition] = useState<number>(0); // how many units owned
  const [assetPrice, setAssetPrice] = useState<number>(100);
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [noiseLevel, setNoiseLevel] = useState<number>(0.2);
  const timeRef = useRef(0);

  // Volatility Engine
  useEffect(() => {
    if (screen !== 'TRADING') return;

    let raf: number;
    let lastUpdate = performance.now();
    let currentPrice = assetPrice;
    
    // Seed history
    if (priceHistory.length === 0) {
      const history: PricePoint[] = [];
      let p = 100;
      for(let i=0; i<50; i++) {
        const volatility = 2;
        const change = (Math.random() - 0.5) * volatility;
        p += change;
        history.push({ time: i, open: p, close: p+change, high: p+Math.abs(change), low: p-Math.abs(change), volume: Math.random() * 100 });
      }
      setPriceHistory(history);
      currentPrice = p;
      setAssetPrice(p);
      timeRef.current = 50;
    }

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - lastUpdate > 100) { // update 10 times a sec
        lastUpdate = time;
        
        // chaotic walk
        let newNoise = noiseLevel + (Math.random() - 0.5) * 0.1;
        newNoise = Math.max(0.1, Math.min(newNoise, 1));
        setNoiseLevel(newNoise);

        // Whale move, pump or dump
        const isWhale = Math.random() > 0.98;
        const whaleMult = isWhale ? (Math.random() > 0.5 ? 5 : -5) : 1;

        const volatility = 5 * newNoise * whaleMult;
        const change = (Math.random() - 0.5) * volatility;
        currentPrice += change;
        if (currentPrice < 1) currentPrice = 1; // "rug" but not 0
        
        setAssetPrice(currentPrice);
        timeRef.current += 1;

        setPriceHistory(prev => {
          const newPoint = {
            time: timeRef.current,
            open: prev[prev.length-1]?.close || currentPrice,
            close: currentPrice,
            high: Math.max(prev[prev.length-1]?.close || currentPrice, currentPrice) + Math.random() * newNoise * 2,
            low: Math.min(prev[prev.length-1]?.close || currentPrice, currentPrice) - Math.random() * newNoise * 2,
            volume: Math.random() * 1000 * newNoise
          };
          // keep last 100
          return [...prev.slice(-99), newPoint];
        });

      }
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [screen]); // remove dependencies to avoid restarting loop unnecessarily unless screen changes

  // Rekt check
  useEffect(() => {
    if (screen === 'TRADING') {
      const totalValue = balance + (position * assetPrice);
      if (totalValue < 10) {
        setScreen('REKT');
      } else if (totalValue > 50000) {
        setScreen('MOONED');
      }
    }
  }, [balance, position, assetPrice, screen]);


  const buy = () => {
    if (balance > assetPrice) {
      const units = balance / assetPrice; // all in
      setPosition(prev => prev + units);
      setBalance(0);
      // Haptic feedback if available
      try { if(navigator.vibrate) navigator.vibrate(50); } catch(e){}
    }
  };

  const sell = () => {
    if (position > 0) {
      setBalance(position * assetPrice);
      setPosition(0);
      try { if(navigator.vibrate) navigator.vibrate([50, 50]); } catch(e){}
    }
  };

  const resetGame = () => {
    setBalance(1000);
    setPosition(0);
    setAssetPrice(100);
    setPriceHistory([]);
    timeRef.current = 0;
    setNoiseLevel(0.2);
    setScreen('TRADING');
  }

  return (
    <GameContext.Provider value={{
      screen, setScreen, balance, setBalance, position, setPosition, 
      assetPrice, priceHistory, buy, sell, noiseLevel, resetGame
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("Missing GameProvider");
  return ctx;
};
