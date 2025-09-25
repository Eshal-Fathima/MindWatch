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
    { value: 'excited', label: 'Excited', emoji: '😊' },
    { value: 'happy', label: 'Happy', emoji: '😄' },
    { value: 'content', label: 'Content', emoji: '😌' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'angry', label: 'Angry', emoji: '😠' },
    { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😵' }
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg heading mb-4">New Journal Entry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-sage-600 mb-2">
            How are you feeling today?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setMood(option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  mood === option.value
                    ? 'border-sage-500 bg-sage-50'
                    : 'border-sage-200 hover:border-sage-300'
                }`}
              >
                <div className="text-2xl mb-1">{option.emoji}</div>
                <div className="text-xs subtle">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Journal Entry */}
        <div>
          <label className="block text-sm font-medium text-sage-600 mb-2">
            What's on your mind?
          </label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write about your day, thoughts, feelings, or anything you'd like to remember..."
            className="w-full h-32 px-3 py-2 border border-sage-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent resize-none bg-white/80"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-sage-600 mb-2">
            Tags (optional)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="work, family, exercise, etc. (comma separated)"
            className="w-full px-3 py-2 border border-sage-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white/80"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!entry || !mood}
          className="w-full btn-primary disabled:bg-sage-300"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default JournalForm;
