import React, { useEffect, useRef, useState } from 'react';

const formatTime = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const Productivity = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [mode, setMode] = useState('work');
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === 'work' ? 'break' : 'work';
          setMode(nextMode);
          return (nextMode === 'work' ? workMinutes : breakMinutes) * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, workMinutes, breakMinutes]);

  const handleStartStop = () => setIsRunning((v) => !v);
  const handleReset = () => {
    setIsRunning(false);
    setMode('work');
    setSecondsLeft(workMinutes * 60);
  };

  const enterFullscreen = async () => {
    const el = document.documentElement;
    if (el.requestFullscreen) await el.requestFullscreen();
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
  };

  const handleEnterFocus = async () => {
    alert('You are entering Focus Mode. No distractions. Fullscreen will be turned on.');
    await enterFullscreen();
    setIsFocusMode(true);
  };

  const handleExitFocus = async () => {
    await exitFullscreen();
    setIsFocusMode(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-high-contrast mb-2">Productivity</h1>
        <p className="text-medium-contrast text-lg">Pomodoro timer and Focus Mode for deep work.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pomodoro Timer */}
        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="text-label uppercase tracking-widest text-xs mb-1">Mode</div>
            <div className="text-high-contrast text-2xl font-semibold capitalize">{mode}</div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="text-high-contrast text-7xl font-extrabold tabular-nums">{formatTime(secondsLeft)}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-label mb-2">Work (min)</label>
              <input type="number" min={1} max={90} value={workMinutes} onChange={(e) => setWorkMinutes(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-label mb-2">Break (min)</label>
              <input type="number" min={1} max={30} value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex items-end gap-3">
              <button onClick={handleStartStop} className="btn-primary w-full text-lg px-6 py-3">{isRunning ? 'Pause' : 'Start'}</button>
              <button onClick={handleReset} className="btn-primary text-lg px-6 py-3">Reset</button>
            </div>
          </div>
        </div>

        {/* Focus Mode */}
        <div className="card p-8 flex flex-col justify-between">
          <div className="text-center mb-6">
            <div className="text-high-contrast text-2xl font-extrabold">FOCUS MODE</div>
          </div>

          <div className="text-center mb-2">
            <div className="text-medium-contrast text-base mb-6">
              When you enter focus mode, fullscreen turns on to reduce distractions.
            </div>
            {!isFocusMode ? (
              <button onClick={handleEnterFocus} className="btn-primary text-xl px-10 py-4 w-full sm:w-auto">
                Enter Focus Mode
              </button>
            ) : (
              <div className="space-y-4">
                <div className="text-high-contrast text-lg font-medium">
                  Focus Mode Active
                </div>
                <button onClick={handleExitFocus} className="btn-quiet text-xl px-10 py-4 w-full sm:w-auto">
                  Exit Focus Mode
                </button>
              </div>
            )}
          </div>

          {isFocusMode && (
            <div className="mt-6 p-6 rounded-lg border border-slate-600/60 bg-slate-700/40">
              <div className="text-center">
                <div className="text-medium-contrast text-base mb-3">Focus Mode Features:</div>
                <ul className="text-label text-sm space-y-2">
                  <li>• Fullscreen distraction-free environment</li>
                  <li>• Clean, minimal interface</li>
                  <li>• Timer integration</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productivity;



