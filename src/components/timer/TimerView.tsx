import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import Button from '../Button';
import { playNotificationSound } from '../../utils/audio';

const TimerView: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playNotificationSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (seconds === 0) {
      setSeconds(inputSeconds);
    }
    setIsRunning(true);
    setIsFinished(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 pb-24">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Minuteur de Repos</h2>
        
        {/* Timer Display */}
        <div className={`text-6xl font-mono font-bold text-center mb-8 transition-all duration-300 ${
          isFinished ? 'text-green-400 animate-bounce' : 'text-white'
        }`}>
          {formatTime(seconds)}
        </div>

        {/* Time Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Temps de repos (secondes)
          </label>
          <input
            type="number"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value) || 0)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRunning || seconds > 0}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <Button
              variant="success"
              size="lg"
              icon={Play}
              onClick={handleStart}
              className="w-32"
            >
              Démarrer
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              icon={Pause}
              onClick={handlePause}
              className="w-32"
            >
              Pause
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="lg"
            icon={RotateCcw}
            onClick={handleReset}
            className="w-32"
          >
            Reset
          </Button>
        </div>

        {isFinished && (
          <div className="mt-6 text-center">
            <p className="text-green-400 font-bold text-lg animate-pulse">
              Temps de repos terminé ! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerView;