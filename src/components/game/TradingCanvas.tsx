import React, { useRef, useEffect } from 'react';
import { useGame, PricePoint } from './GameContext';

export function TradingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { priceHistory, assetPrice, noiseLevel } = useGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (priceHistory.length < 2) return;

      const minPrice = Math.min(...priceHistory.map(p => p.low)) * 0.9;
      const maxPrice = Math.max(...priceHistory.map(p => p.high)) * 1.1;
      const range = maxPrice - minPrice || 1;

      const points = priceHistory.map((p, i) => {
        const x = (i / (priceHistory.length - 1)) * width;
        const y = height - ((p.close - minPrice) / range) * height;
        const yOpen = height - ((p.open - minPrice) / range) * height;
        const yHigh = height - ((p.high - minPrice) / range) * height;
        const yLow = height - ((p.low - minPrice) / range) * height;
        return { x, y, yOpen, yHigh, yLow, isGreen: p.close >= p.open };
      });

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i=0; i<5; i++) {
        ctx.moveTo(0, (height/5)*i);
        ctx.lineTo(width, (height/5)*i);
      }
      ctx.stroke();

      // Draw candles
      const candleWidth = Math.max((width / points.length) * 0.8, 1);
      
      points.forEach(pt => {
        ctx.fillStyle = pt.isGreen ? '#00FF41' : '#FF3131';
        ctx.strokeStyle = pt.isGreen ? '#00FF41' : '#FF3131';

        // wick
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.yHigh);
        ctx.lineTo(pt.x, pt.yLow);
        ctx.stroke();

        // body
        const bodyY = Math.min(pt.yOpen, pt.y);
        const bodyHeight = Math.max(Math.abs(pt.yOpen - pt.y), 1);
        ctx.fillRect(pt.x - candleWidth/2, bodyY, candleWidth, bodyHeight);
      });

      // Current Price Line
      const lastPt = points[points.length - 1];
      ctx.beginPath();
      ctx.strokeStyle = lastPt.isGreen ? '#00FF41' : '#FF3131';
      ctx.setLineDash([5, 5]);
      ctx.moveTo(lastPt.x, lastPt.y);
      ctx.lineTo(0, lastPt.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Glow effect based on noise level
      if (noiseLevel > 0.6) {
        ctx.fillStyle = `rgba(${lastPt.isGreen ? '0,255,65' : '255,49,49'}, ${noiseLevel * 0.2})`;
        ctx.fillRect(0, 0, width, height);
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(rafId);
  }, [priceHistory, assetPrice, noiseLevel]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
      style={{ touchAction: 'none' }}
    />
  );
}
