"use client";

import React from 'react';
import { Timer, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface HUDProps {
  score: number;
  timeLeft: number;
  targetColor: string;
  isInitial: boolean;
}

const HUD = ({ score, timeLeft, targetColor, isInitial }: HUDProps) => {
  const timePercentage = (timeLeft / 20) * 100;

  return (
    <div className="w-full flex flex-col gap-4 z-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Trophy size={14} className="text-primary" /> Score
          </span>
          <span className="text-4xl font-black text-foreground">{score}</span>
        </div>

        <div className="flex flex-col items-end">
          <div 
            className="w-8 h-8 rounded-full border-4 border-white shadow-lg transition-colors duration-500"
            style={{ backgroundColor: targetColor }}
          />
          <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Target Color</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
           <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground flex items-center gap-1">
             <Timer size={12} /> Time
           </span>
           <span className={`text-[10px] font-mono font-bold ${timeLeft < 3 ? 'text-destructive animate-pulse' : 'text-primary'}`}>
             {timeLeft.toFixed(1)}s
           </span>
        </div>
        <Progress 
          value={timePercentage} 
          className="h-1.5 bg-muted transition-all duration-300" 
        />
      </div>
    </div>
  );
};

export default HUD;