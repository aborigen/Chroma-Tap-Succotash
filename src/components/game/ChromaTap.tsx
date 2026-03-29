"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import HUD from './HUD';
import Screens from './Screens';
import GameCanvas from './GameCanvas';

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

  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setCurrentSpeed(INITIAL_SPEED);
    setAngle(Math.random() * 360);
    setTargetColorIndex(Math.floor(Math.random() * COLORS.length));
    setStatus('playing');
  };

  const gameOver = useCallback(() => {
    setStatus('gameover');
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

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

    // Segment size is 360 / COLORS.length
    const segmentSize = 360 / COLORS.length;
    // Angle 0 is at the top? Let's assume standard math (0 is right, counter-clockwise)
    // Actually our GameCanvas will render starting from top (270 deg)
    // So 0 deg on canvas is top. 
    // Segment 0 is 0 to 90
    // Segment 1 is 90 to 180...
    const normalizedAngle = (angle % 360 + 360) % 360;
    const currentSegmentIndex = Math.floor(normalizedAngle / segmentSize);

    if (currentSegmentIndex === targetColorIndex) {
      // Hit!
      setScore(s => s + 1);
      setCurrentSpeed(s => s + SPEED_INCREMENT);
      setTimeLeft(t => Math.min(t + TIME_BONUS, 20)); // Cap time
      
      // Change target color to a DIFFERENT one
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
      />

      <div className="text-muted-foreground text-xs uppercase tracking-widest font-bold py-2 opacity-50">
        Tap when colors match
      </div>
    </Card>
  );
};

export default ChromaTap;