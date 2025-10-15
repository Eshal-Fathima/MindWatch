import React, { useState } from 'react';

const JournalForm = ({ onSubmit }) => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement journal entry submission
    const journalData = {
      entry,
      mood,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      timestamp: new Date().toISOString()
    };
    
    if (onSubmit) {
      onSubmit(journalData);
    }
    
    // Reset form
    setEntry('');
    setMood('');
    setTags('');
  };

  const moodOptions = [
    { value: 'excited', label: 'Excited' },
    { value: 'happy', label: 'Happy' },
    { value: 'content', label: 'Content' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'sad', label: 'Sad' },
    { value: 'anxious', label: 'Anxious' },
    { value: 'angry', label: 'Angry' },
    { value: 'overwhelmed', label: 'Overwhelmed' }
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-high-contrast mb-4">New Journal Entry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-label mb-2">
            How are you feeling today?
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-3 py-2 border border-slate-600 bg-slate-100 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>Select a mood</option>
            {moodOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-black">{option.label}</option>
            ))}
          </select>
        </div>

        {/* Journal Entry */}
        <div>
          <label className="block text-sm font-medium text-label mb-2">
            What's on your mind?
          </label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write about your day, thoughts, feelings, or anything you'd like to remember..."
            className="w-full h-32 px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-label mb-2">
            Tags (optional)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="work, family, exercise, etc. (comma separated)"
            className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!entry || !mood}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default JournalForm;

