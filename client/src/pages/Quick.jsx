import React, { useState, useEffect } from 'react';

const CalmMusic = () => {
  const handlePlaceholder = () => {
    // Placeholder: integrate Gemini-backed music when API is available
    alert('Calm music will be available after Gemini integration.');
  };

  return (
    <div className="card p-8 flex flex-col justify-between min-h-[340px]">
      <div>
        <div className="text-center mb-6">
          <div className="text-label uppercase tracking-widest text-xs mb-1">Calm Music</div>
          <div className="text-high-contrast text-2xl font-extrabold">Relaxing Sounds</div>
        </div>

        <div className="text-center">
          <div className="text-medium-contrast text-base mb-6">
            Curated peaceful music to help you relax and focus
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button onClick={handlePlaceholder} className="btn-primary text-xl px-10 py-4 w-full sm:w-auto">
          Play Calm Music
        </button>
      </div>
    </div>
  );
};

const Meditation = () => {
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('ready'); // ready, inhale, exhale, hold
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycle, setCycle] = useState(0);

  const phases = {
    ready: { text: 'Ready to begin', duration: 0, instruction: 'Get comfortable and prepare to breathe' },
    inhale: { text: 'Breathe In', duration: 10, instruction: 'Slowly inhale through your nose' },
    hold: { text: 'Hold', duration: 5, instruction: 'Hold your breath gently' },
    exhale: { text: 'Breathe Out', duration: 10, instruction: 'Slowly exhale through your mouth' },
    pause: { text: 'Pause', duration: 3, instruction: 'Rest before the next breath' }
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Move to next phase
          const phaseOrder = ['ready', 'inhale', 'hold', 'exhale', 'pause'];
          const currentIndex = phaseOrder.indexOf(breathPhase);
          const nextIndex = (currentIndex + 1) % phaseOrder.length;
          const nextPhase = phaseOrder[nextIndex];
          
          setBreathPhase(nextPhase);
          setTimeLeft(phases[nextPhase].duration);
          
          if (nextPhase === 'inhale') {
            setCycle(prev => prev + 1);
          }
          
          return phases[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, breathPhase]);

  const startMeditation = () => {
    setIsActive(true);
    setBreathPhase('inhale');
    setTimeLeft(10);
    setCycle(0);
  };

  const stopMeditation = () => {
    setIsActive(false);
    setBreathPhase('ready');
    setTimeLeft(0);
    setCycle(0);
  };

  return (
    <div className="card p-8 flex flex-col justify-between min-h-[340px]">
      <div>
        <div className="text-center mb-6">
          <div className="text-label uppercase tracking-widest text-xs mb-1">Meditation</div>
          <div className="text-high-contrast text-2xl font-extrabold">Breathing Exercise</div>
        </div>

        <div className="text-center mb-6">
          {!isActive ? (
            <div className="space-y-6">
              <div className="text-medium-contrast text-base">
                Guided breathing to help you relax and center yourself
              </div>
              <button onClick={startMeditation} className="btn-primary text-xl px-10 py-4 w-full sm:w-auto">
                Start Meditation
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-high-contrast text-5xl font-extrabold">
                {phases[breathPhase].text}
              </div>
              
              <div className="text-medium-contrast text-lg">
                {phases[breathPhase].instruction}
              </div>
              
              {timeLeft > 0 && (
                <div className="text-high-contrast text-7xl font-extrabold tabular-nums">
                  {timeLeft}
                </div>
              )}
              
              <div className="text-label text-sm">
                Cycle {cycle} • {breathPhase.charAt(0).toUpperCase() + breathPhase.slice(1)}
              </div>
              
              <button onClick={stopMeditation} className="btn-quiet text-xl px-10 py-4 w-full sm:w-auto">
                Stop Meditation
              </button>
            </div>
          )}
        </div>
      </div>

      {!isActive && (
        <div className="mt-6 p-4 rounded-lg border border-slate-600/60 bg-slate-700/40">
          <div className="text-center">
            <div className="text-medium-contrast text-sm mb-2">Breathing Pattern:</div>
            <ul className="text-label text-sm space-y-1">
              <li>• 10 seconds: Breathe in slowly</li>
              <li>• 5 seconds: Hold your breath</li>
              <li>• 10 seconds: Breathe out slowly</li>
              <li>• 3 seconds: Rest before next cycle</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Quick = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-high-contrast mb-2">Quick Tabs</h1>
        <p className="text-medium-contrast text-lg">Calm music and meditation for relaxation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalmMusic />
        <Meditation />
      </div>
    </div>
  );
};

export default Quick;

