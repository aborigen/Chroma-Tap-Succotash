"use client";

import React from 'react';
import { Play, RotateCcw, Award, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameStatus } from './ChromaTap';
import { TranslationStrings } from '@/lib/translations';

interface ScreensProps {
  status: GameStatus;
  onStart: () => void;
  score: number;
  highScore: number;
  t: TranslationStrings;
  onToggleLanguage: () => void;
}

const Screens = ({ status, onStart, score, highScore, t, onToggleLanguage }: ScreensProps) => {
  if (status === 'playing') return null;

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-20 flex items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-8 w-full">
        {status === 'idle' ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter text-foreground italic">
                {t.title} <span className="text-primary underline">{t.subtitle}</span>
              </h1>
              <p className="text-muted-foreground text-sm font-medium">{t.description}</p>
            </div>
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full h-16 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
                onClick={onStart}
              >
                <Play className="mr-2 fill-current" /> {t.playNow}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-4 text-xs font-bold opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLanguage();
                }}
              >
                <Languages className="mr-2 w-4 h-4" /> {t.switchLanguage}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2">
               <h2 className="text-4xl font-black text-destructive tracking-tight">{t.gameOver}</h2>
               <div className="flex justify-center gap-8 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground uppercase">{t.score}</span>
                    <span className="text-3xl font-black">{score}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1 justify-center">
                      <Award size={14} className="text-primary" /> {t.best}
                    </span>
                    <span className="text-3xl font-black text-primary">{highScore}</span>
                  </div>
               </div>
            </div>
            <Button 
              size="lg" 
              variant="default"
              className="w-full h-16 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
              onClick={onStart}
            >
              <RotateCcw className="mr-2" /> {t.tryAgain}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screens;
