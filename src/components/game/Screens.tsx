"use client";

import React, { useState } from 'react';
import { Play, RotateCcw, Award, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameStatus } from './ChromaTap';
import { generateGameIcon } from '@/ai/flows/generate-icon-flow';
import { TranslationStrings } from '@/lib/translations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ScreensProps {
  status: GameStatus;
  onStart: () => void;
  score: number;
  highScore: number;
  t: TranslationStrings;
}

const Screens = ({ status, onStart, score, highScore, t }: ScreensProps) => {
  const [generating, setGenerating] = useState(false);
  const [generatedIcon, setGeneratedIcon] = useState<string | null>(null);

  const handleGenerateIcon = async () => {
    setGenerating(true);
    try {
      const result = await generateGameIcon();
      setGeneratedIcon(result.imageUrl);
    } catch (error) {
      console.error("Failed to generate icon:", error);
    } finally {
      setGenerating(false);
    }
  };

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

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full rounded-xl opacity-70 hover:opacity-100">
                    <ImageIcon className="mr-2 h-4 w-4" /> {t.generateIcon}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t.aiTitle}</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center space-y-4 p-4">
                    {generatedIcon ? (
                      <div className="relative aspect-square w-64 overflow-hidden rounded-3xl shadow-2xl border-4 border-primary/20">
                        <img src={generatedIcon} alt="Generated Icon" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-square w-64 bg-muted rounded-3xl flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                        {generating ? <Loader2 className="h-10 w-10 animate-spin text-primary" /> : <ImageIcon className="h-10 w-10 text-muted-foreground/50" />}
                      </div>
                    )}
                    <Button 
                      onClick={handleGenerateIcon} 
                      disabled={generating}
                      className="w-full"
                    >
                      {generating ? t.generating : (generatedIcon ? t.generateAnother : t.generateBtn)}
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center">
                      {t.aiHint}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
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
