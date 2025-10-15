import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  // Dashboard now focuses on explanation + quick links

  const [userName, setUserName] = useState('');
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mw:name');
      if (stored) setUserName(stored);
    } catch {}
  }, []);

  const prompts = [
    { text: "Journal your day", color: "bg-blue-600/20 border-blue-500/30" },
    { text: "What made you happy?", color: "bg-green-600/20 border-green-500/30" },
    { text: "What stressed you?", color: "bg-orange-600/20 border-orange-500/30" },
    { text: "Small win today?", color: "bg-purple-600/20 border-purple-500/30" },
    { text: "What did you learn?", color: "bg-emerald-600/20 border-emerald-500/30" },
    { text: "Who made you smile?", color: "bg-pink-600/20 border-pink-500/30" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-black mb-2">
          {userName ? `Welcome back, ${userName}` : 'Welcome back'}
        </h1>
        <p className="text-black text-lg">
          How are you feeling today? Let's check in with your mental health.
        </p>
      </div>

      {/* Hero Explanation */}
      <section className="card p-8 mb-8 text-center">
        <h2 className="text-2xl font-semibold text-high-contrast mb-4">What is MindWatch?</h2>
        <p className="text-medium-contrast max-w-3xl mx-auto">
          MindWatch helps you understand your mental well‑being with simple journaling and focused routines.
          Track feelings, reduce distractions, and build healthy habits with a calm, minimal interface.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
          <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/40">
            <h3 className="text-high-contrast font-medium mb-2">Why check in?</h3>
            <p className="text-medium-contrast text-sm">Regular check‑ins make patterns visible, so small steps can create real change.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/40">
            <h3 className="text-high-contrast font-medium mb-2">Cut distractions</h3>
            <p className="text-medium-contrast text-sm">Reducing noise protects your attention—helping you feel calmer and get more done.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/40">
            <h3 className="text-high-contrast font-medium mb-2">Small, steady steps</h3>
            <p className="text-medium-contrast text-sm">Gentle routines like journaling and Pomodoro build momentum without pressure.</p>
          </div>
        </div>
        <div className="mt-8 text-label text-sm">Your mind matters. A little care goes a long way.</div>
      </section>

      {/* Centered CTAs */}
      <div className="p-6 flex items-center justify-center">
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/journal" className="btn-primary">Open Journal</a>
          <a href="/productivity" className="btn-quiet">Productivity</a>
          <a href="/settings" className="btn-quiet">Settings</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

