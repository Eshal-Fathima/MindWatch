import React, { useState } from 'react';
import JournalForm from '../components/JournalForm';

const emotion_map = {
  0: "sadness",
  1: "joy",
  2: "love",
  3: "anger",
  4: "fear",
  5: "surprise"
};

// 👇 Messages for each emotion
const emotionMessages = {
  sadness: "Oh, you seem sad today. Try talking to a friend or take a walk!",
  joy: "Oh, you are joyful today! That's nice 😊",
  love: "Love is in the air! Keep spreading kindness ❤️",
  anger: "Feeling angry? Take a deep breath and relax 😌",
  fear: "Feeling scared? It's okay to take small steps 🫂",
  surprise: "Wow, something surprising happened! Exciting! 🎉",
  unknown: "Thanks for sharing your thoughts!"
};

const Journal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastEmotionMsg, setLastEmotionMsg] = useState(''); // 👈 new state

  // 🧩 ML Prediction Function
  const getEmotionPrediction = async (text) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      return emotion_map[data.prediction] || 'unknown';
    } catch (error) {
      console.error('Error getting prediction:', error);
      return 'unknown';
    }
  };

  // ✨ Modified Handle Submit with message
  // ✨ Modified Handle Submit with message
const handleJournalSubmit = async (journalData) => {
  console.log("🔥 Submit button clicked");
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Temporarily add entry
  const tempEntry = {
    id: journalEntries.length + 1,
    ...journalData,
    mood: 'Loading...',
    date: formattedDate,
    time: formattedTime,
  };
  setJournalEntries([tempEntry, ...journalEntries]);

  // Get predicted mood
  let predictedMood = 'unknown';
  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: journalData.entry }),
    });
    const data = await response.json();
    predictedMood = emotion_map[data.prediction] || 'unknown';
  } catch (error) {
    console.error('Error getting prediction:', error);
  }

  // Update entry
  setJournalEntries((prev) =>
    prev.map((entry) =>
      entry.id === tempEntry.id ? { ...entry, mood: predictedMood } : entry
    )
  );

  // 👈 Show message based on emotion
  setLastEmotionMsg(emotionMessages[predictedMood]);
};


  const filteredEntries = journalEntries.filter((entry) => {
    const matchesFilter = filter === 'all' || entry.mood === filter;
    const matchesSearch =
      entry.entry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-black mb-2">Your Journal</h1>
        <p className="text-black text-lg">
          Reflect on your thoughts, feelings, and experiences. Your personal space for self-discovery.
        </p>
      </div>

      {/* Journal Form */}
      <div className="mb-2">
        <JournalForm onSubmit={handleJournalSubmit} />
      </div>

      {/* 👈 Display emotion message */}
      {lastEmotionMsg && (
        <div className="mb-6 text-center p-4 bg-blue-100 text-blue-800 rounded-md">
          {lastEmotionMsg}
        </div>
      )}

      {/* Filters and Search */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Simple Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
              }`}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-label mb-2">No entries found</h3>
            <p className="text-medium-contrast">
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start your journaling journey by writing your first entry above.'}
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="card p-6">
              {/* Header section */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-black mb-1">{entry.title}</h2>
                  <p className="text-sm text-label">
                    {entry.date} • {entry.time}
                  </p>
                  <p className="text-sm text-slate-600 capitalize">
                    {entry.mood || 'No prediction'}
                  </p>
                </div>
              </div>

              {/* Entry text */}
              <div className="mb-4">
                <p className="text-medium-contrast leading-relaxed">{entry.entry}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-700/50 text-medium-contrast text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredEntries.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
            Load More Entries
          </button>
        </div>
      )}
    </div>
  );
};

export default Journal;
