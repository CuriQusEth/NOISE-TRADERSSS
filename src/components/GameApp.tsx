import React from 'react';
import { GameProvider, useGame } from './game/GameContext';
import { TitleScreen } from './game/TitleScreen';
import { TradingScreen } from './game/TradingScreen';
import { RektScreen } from './game/RektScreen';
import { MoonedScreen } from './game/MoonedScreen';

function ScreenManager() {
  const { screen } = useGame();

  return (
    <div className="w-full h-[100dvh] bg-[#050505] text-[#e0e0e0] font-mono overflow-hidden relative border-4 border-[#1a1a1a] shadow-[inset_0_0_100px_rgba(188,19,254,0.1)]">
      {screen === 'TITLE' && <TitleScreen />}
      {screen === 'TRADING' && <TradingScreen />}
      {screen === 'REKT' && <RektScreen />}
      {screen === 'MOONED' && <MoonedScreen />}
      {/* LEADERBOARD could be a modal over Title or dedicated screen */}
    </div>
  )
}

export default function GameApp() {
  return (
    <GameProvider>
      <ScreenManager />
    </GameProvider>
  );
}
