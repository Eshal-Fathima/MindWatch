import React, { useState } from 'react';
import JournalForm from '../components/JournalForm';
import MoodPrompt from '../components/MoodPrompt';
import MoodChart from '../components/MoodChart';

const Dashboard = () => {
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      mood: 'happy',
      entry: 'Had a great day at work! Completed my project ahead of schedule.',
      tags: ['work', 'achievement']
    },
    {
      id: 2,
      date: '2024-01-14',
      mood: 'content',
      entry: 'Spent quality time with family. Feeling grateful for their support.',
      tags: ['family', 'gratitude']
    },
    {
      id: 3,
      date: '2024-01-13',
      mood: 'anxious',
      entry: 'Feeling overwhelmed with upcoming deadlines. Need to prioritize better.',
      tags: ['work', 'stress']
    }
  ]);

  const handleJournalSubmit = (journalData) => {
    const newEntry = {
      id: journalEntries.length + 1,
      ...journalData,
      date: new Date().toISOString().split('T')[0]
    };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const handlePromptSelect = (prompt) => {
    console.log('Selected prompt:', prompt);
    // TODO: Implement prompt selection logic
  };

  return (
    <div>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl heading mb-2">
              Welcome back! 👋
            </h1>
            <p className="subtle">
              How are you feeling today? Let's check in with your mental health.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-xl">📝</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-sage-600">Journal Entries</p>
                  <p className="text-2xl font-bold text-sage-700">{journalEntries.length}</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-sage-600">Current Streak</p>
                  <p className="text-2xl font-bold text-sage-700">7 days</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-xl">🎯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-sage-600">Avg Mood</p>
                  <p className="text-2xl font-bold text-sage-700">7.2</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-orange-600 text-xl">🔍</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-sage-600">Reddit Analysis</p>
                  <p className="text-2xl font-bold text-sage-700">85%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Journal Form */}
            <div>
              <JournalForm onSubmit={handleJournalSubmit} />
            </div>
            
            {/* AI Prompts */}
            <div>
              <MoodPrompt onPromptSelect={handlePromptSelect} />
            </div>
          </div>

          {/* Recent Entries */}
          <div className="card p-6 mb-8">
            <h3 className="text-lg heading mb-4">Recent Journal Entries</h3>
            <div className="space-y-4">
              {journalEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="border-l-4 border-sage-300 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-sage-600 capitalize">
                      {entry.mood}
                    </span>
                    <span className="text-xs text-sage-500">{entry.date}</span>
                  </div>
                  <p className="text-sage-700 text-sm mb-2">{entry.entry}</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-sage-100 text-sage-600 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sage-600 hover:text-sage-800 text-sm font-medium">
                View all entries →
              </button>
            </div>
          </div>

          {/* Mood Chart */}
          <div className="mb-8">
            <MoodChart />
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg heading mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-sage-50 hover:bg-sage-100 rounded-lg border border-sage-200 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎵</div>
                  <div className="text-sm font-medium text-sage-700">Calm Music</div>
                </div>
              </button>
              <button className="p-4 bg-sage-50 hover:bg-sage-100 rounded-lg border border-sage-200 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">🧘</div>
                  <div className="text-sm font-medium text-sage-700">Meditation</div>
                </div>
              </button>
              <button className="p-4 bg-sage-50 hover:bg-sage-100 rounded-lg border border-sage-200 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">💡</div>
                  <div className="text-sm font-medium text-sage-700">Tips</div>
                </div>
              </button>
              <button className="p-4 bg-sage-50 hover:bg-sage-100 rounded-lg border border-sage-200 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">📞</div>
                  <div className="text-sm font-medium text-sage-700">Emergency</div>
                </div>
              </button>
            </div>
          </div>
    </div>
  );
};

export default Dashboard;
