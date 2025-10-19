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
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
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
    alert('Focus Mode ON. Fullscreen activated.');
    await enterFullscreen();
    setIsFocusMode(true);
  };

  const handleExitFocus = async () => {
    await exitFullscreen();
    setIsFocusMode(false);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), done: false }]);
      setNewTask('');
    }
  };

  const toggleTaskDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-black mb-2">Productivity</h1>
        <p className="text-black text-lg">Pomodoro timer, Focus Mode, and Mini To-Do List.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pomodoro Timer */}
        <div className="card p-8 flex flex-col items-center">
          <div className="text-center mb-6">
            <div className="text-label uppercase tracking-widest text-xs mb-1">Mode</div>
            <div className="text-high-contrast text-2xl font-semibold capitalize">{mode}</div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="text-high-contrast text-7xl font-extrabold tabular-nums">{formatTime(secondsLeft)}</div>
          </div>

          {/* Work/Break Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 w-full">
            <div>
              <label className="block text-sm font-medium text-label mb-2">Work (min)</label>
              <input
                type="number"
                min={1}
                max={90}
                value={workMinutes}
                onChange={(e) => setWorkMinutes(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-label mb-2">Break (min)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Buttons inside Pomodoro card */}
          <div className="flex gap-4 w-full justify-center">
            <button onClick={handleStartStop} className="btn-primary px-6 py-3 text-lg">
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleReset} className="btn-primary px-6 py-3 text-lg">
              Reset
            </button>
          </div>
        </div>

        {/* Focus Mode */}
        <div className="card p-8 flex flex-col h-full justify-center items-center">
          <div className="w-full flex flex-col flex-1 justify-center items-center">
            <div className="text-center mb-6">
              <div className="text-high-contrast text-2xl font-extrabold">FOCUS MODE</div>
            </div>
            <div className="text-center mb-2 w-full">
              <div className="text-medium-contrast text-base mb-6">
                Fullscreen Focus Mode reduces distractions.
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
          </div>
        </div>

      {/* Mini To-Do List */}
        <div className="card p-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-high-contrast">Mini To-Do List</h2>
            <p className="text-medium-contrast text-sm">Track your tasks quickly</p>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button onClick={addTask} className="btn-primary px-4 py-2">Add</button>
          </div>
          <ul className="space-y-2">
            {tasks.length === 0 && (
              <li className="text-medium-contrast text-sm text-center">No tasks added</li>
            )}
            {tasks.map((task, i) => (
              <li key={i} className="flex items-center justify-between bg-slate-700/50 px-3 py-2 rounded-md">
                <label className="flex items-center flex-1 gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTaskDone(i)}
                    className="w-4 h-4"
                  />
                  <span className={task.done ? 'line-through text-gray-400' : 'text-medium-contrast'}>
                    {task.text}
                  </span>
                </label>
                <button onClick={() => removeTask(i)} className="text-red-400 font-bold">×</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Productivity;
