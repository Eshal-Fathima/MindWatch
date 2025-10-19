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
    <div className="max-w-7xl mx-auto">
      {/* Heading Section */}
      <div className="mb-12 text-center fade-in">
        <h1 className="text-5xl font-bold text-black mb-4">
          Track. Reflect. Improve.
        </h1>
        <p className="text-black text-xl max-w-2xl mx-auto leading-relaxed">
          Breathe — you’re here, and that’s what matters.
        </p>
      </div>

      {/* Hero Section with Modern Layout */}
      <section className="relative mb-12">
        <div className="card-hover card p-10 text-center scale-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-high-contrast mb-6">
              What is MindWatch?
            </h2>
            <p className="text-medium-contrast text-lg leading-relaxed mb-8">
              MindWatch helps you understand your mental well-being with intelligent journaling, 
              mood tracking, and focused productivity tools. Build healthy habits with our 
              calm, distraction-free interface.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards with Staggered Animation */}
      <div className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="stagger-item card-hover card p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-semibold text-high-contrast mb-4">
              Smart Insights
            </h3>
            <p className="text-medium-contrast leading-relaxed">
              AI-powered analysis of your mood patterns and personalized recommendations 
              for better mental health.
            </p>
          </div>

          <div className="stagger-item card-hover card p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-high-contrast mb-4">
              Guided Journaling
            </h3>
            <p className="text-medium-contrast leading-relaxed">
              Thoughtful prompts and reflection tools to help you process emotions 
              and track your mental wellness journey.
            </p>
          </div>

          <div className="stagger-item card-hover card p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-high-contrast mb-4">
              Focus Mode
            </h3>
            <p className="text-medium-contrast leading-relaxed">
              Distraction-free productivity tools with Pomodoro timers and 
              meditation features for deep work.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions with Modern Design */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-black text-center mb-10">
          Quick Actions
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="/journal" 
            className="group btn-animate btn-quiet px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span>📖</span>
              <span>Start Journaling</span>
            </span>
          </a>

          <a 
            href="/mood-tracker" 
            className="group btn-animate btn-quiet px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span>📊</span>
              <span>View Analytics</span>
            </span>
          </a>

          <a 
            href="/productivity" 
            className="group btn-animate btn-quiet px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span>⏰</span>
              <span>Focus Mode</span>
            </span>
          </a>
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="text-center fade-in-delay-4">
        <div className="card p-8 max-w-3xl mx-auto">
          <blockquote className="text-xl italic text-medium-contrast mb-4">
            "Your mind matters. A little care goes a long way."
          </blockquote>
          <cite className="text-label text-sm">— MindWatch Team</cite>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
