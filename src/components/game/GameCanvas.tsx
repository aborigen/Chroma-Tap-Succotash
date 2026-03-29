"use client";

import React from 'react';
import { GameStatus } from './ChromaTap';

interface GameCanvasProps {
  angle: number;
  colors: string[];
  targetIndex: number;
  status: GameStatus;
}

const GameCanvas = ({ angle, colors, targetIndex, status }: GameCanvasProps) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const strokeWidth = 16;
  const segmentCount = colors.length;
  const segmentAngle = 360 / segmentCount;

  // Calculate the position of the white dot
  const dotX = center + radius * Math.cos((angle - 90) * (Math.PI / 180));
  const dotY = center + radius * Math.sin((angle - 90) * (Math.PI / 180));

  return (
    <div className="relative w-full aspect-square max-w-[300px] flex items-center justify-center">
      {/* Background decoration ring */}
      <div className="absolute inset-0 rounded-full border-4 border-muted/20 scale-[1.1] opacity-50 pointer-events-none" />
      
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Segments */}
        {colors.map((color, i) => {
          const startAngle = i * segmentAngle - 90;
          const endAngle = (i + 1) * segmentAngle - 90;
          const x1 = center + radius * Math.cos(startAngle * (Math.PI / 180));
          const y1 = center + radius * Math.sin(startAngle * (Math.PI / 180));
          const x2 = center + radius * Math.cos(endAngle * (Math.PI / 180));
          const y2 = center + radius * Math.sin(endAngle * (Math.PI / 180));

          const largeArcFlag = segmentAngle > 180 ? 1 : 0;
          const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

          const isTarget = i === targetIndex;

          return (
            <path
              key={i}
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth={isTarget && status === 'playing' ? strokeWidth + 4 : strokeWidth}
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{
                opacity: status === 'playing' ? (isTarget ? 1 : 0.6) : 0.4,
                filter: isTarget && status === 'playing' ? 'url(#glow)' : 'none'
              }}
            />
          );
        })}

        {/* Central visual aid */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius - 30} 
          fill="transparent" 
          stroke="currentColor" 
          strokeWidth="1" 
          className="text-muted/10"
        />

        {/* The Dot */}
        {status === 'playing' && (
          <g>
            {/* Trail/Glow for the dot */}
            <circle
              cx={dotX}
              cy={dotY}
              r={12}
              fill="white"
              className="animate-ping-slow opacity-20"
            />
            <circle
              cx={dotX}
              cy={dotY}
              r={8}
              fill="white"
              stroke="#fff"
              strokeWidth="2"
              className="shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }}
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default GameCanvas;