
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import HUD from './HUD';
import Screens from './Screens';
import GameCanvas from './GameCanvas';
import { playSound } from '@/lib/audio-utils';
import { translations, Language } from '@/lib/translations';

const COLORS = [
  '#26ACD9', // Vibrant Blue
  '#17CFB5', // Aqua Green
  '#FF6B6B', // Coral Red
  '#FFD93D', // Sunset Yellow
];

const INITIAL_SPEED = 2.5;
const SPEED_INCREMENT = 0.4;
const INITIAL_TIME = 10;
const TIME_BONUS = 2;

export type GameStatus = 'idle' | 'playing' | 'gameover';

const ChromaTap = () => {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [targetColorIndex, setTargetColorIndex] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(INITIAL_SPEED);
  const [angle, setAngle] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [ysdk, setYsdk] = useState<any>(null);
  const [lang, setLang] = useState<Language>('en');

  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  // Yandex SDK Initialization
  useEffect(() => {
    const initYandexSDK = async () => {
      try {
        if (typeof window !== 'undefined' && (window as any).YaGames) {
          const sdk = await (window as any).YaGames.init();
          setYsdk(sdk);
          
          // Detect Language
          const userLang = sdk.environment.i18n.lang;
          if (userLang === 'ru') {
            setLang('ru');
          }

          sdk.getPlayer().then((player: any) => {
             console.log('Player loaded');
          }).catch(() => {
             console.log('Player not authorized');
          });
        }
      } catch (error) {
        console.error('Failed to initialize Yandex SDK:', error);
      }
    };
    initYandexSDK();
  }, []);

  const t = translations[lang];

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'en' ? 'ru' : 'en');
  }, []);

  const startGame = () => {
    playSound('start');
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setCurrentSpeed(INITIAL_SPEED);
    setAngle(Math.random() * 360);
    setTargetColorIndex(Math.floor(Math.random() * COLORS.length));
    setStatus('playing');
  };

  const gameOver = useCallback(() => {
    if (status === 'playing') {
      playSound('fail');
    }
    setStatus('gameover');
    
    // Update local high score
    if (score > highScore) {
      setHighScore(score);
    }

    // Update Yandex Leaderboard
    if (ysdk && score > 0) {
      ysdk.getLeaderboards()
        .then((lb: any) => {
          // Set score to the 'score' leaderboard
          lb.setLeaderboardScore('score', score);
          console.log('Score sent to Yandex Leaderboard:', score);
        })
        .catch((err: any) => {
          console.warn('Leaderboards not available (check if technical name "score" exists):', err);
        });
    }
  }, [score, highScore, ysdk, status]);

  // Game Loop
  const animate = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      setAngle(prev => (prev + currentSpeed) % 360);
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [currentSpeed]);

  useEffect(() => {
    if (status === 'playing') {
      requestRef.current = requestAnimationFrame(animate);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            gameOver();
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        clearInterval(timer);
      };
    }
  }, [status, animate, gameOver]);

  const handleTap = () => {
    if (status !== 'playing') return;

    const segmentSize = 360 / COLORS.length;
    const normalizedAngle = (angle % 360 + 360) % 360;
    const currentSegmentIndex = Math.floor(normalizedAngle / segmentSize);

    if (currentSegmentIndex === targetColorIndex) {
      playSound('success');
      setScore(s => s + 1);
      setCurrentSpeed(s => s + SPEED_INCREMENT);
      setTimeLeft(t => Math.min(t + TIME_BONUS, 20));
      
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * COLORS.length);
      } while (nextIndex === targetColorIndex);
      setTargetColorIndex(nextIndex);
    } else {
      gameOver();
    }
  };

  return (
    <Card 
      className="relative w-full max-w-md aspect-[3/4] overflow-hidden bg-background border-none shadow-2xl transition-all duration-500 flex flex-col items-center justify-between p-6"
      style={{
        backgroundColor: status === 'playing' ? `${COLORS[targetColorIndex]}10` : 'hsl(var(--background))'
      }}
      onClick={handleTap}
    >
      <HUD 
        score={score} 
        timeLeft={timeLeft} 
        targetColor={COLORS[targetColorIndex]}
        isInitial={status === 'idle'}
        t={t}
      />

      <div className="flex-1 flex items-center justify-center w-full">
        <GameCanvas 
          angle={angle} 
          colors={COLORS} 
          targetIndex={targetColorIndex}
          status={status}
        />
      </div>

      <Screens 
        status={status} 
        onStart={startGame} 
        score={score} 
        highScore={highScore}
        t={t}
        onToggleLanguage={toggleLanguage}
      />

      <div className="text-muted-foreground text-xs uppercase tracking-widest font-bold py-2 opacity-50">
        {t.tapHint}
      </div>
    </Card>
  );
};

export default ChromaTap;
