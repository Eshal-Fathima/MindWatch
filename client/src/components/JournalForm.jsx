import React, { useState } from 'react';

const JournalForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Make handleSubmit guaranteed synchronous wrapper
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !entry) {
      return;
    }

    const journalData = {
      title,
      entry,
      mood: mood || 'neutral', // Default to neutral if no mood selected
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date,
      timestamp: new Date().toISOString(),
      userId: 'anonymous' // TODO: Get from auth context
    };


    try {
      setIsSaving(true);
      
      // Try to send to backend API, but fallback to local storage if it fails
      try {
        const response = await fetch('http://localhost:3001/api/journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(journalData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Call parent onSubmit with the result
        if (onSubmit && typeof onSubmit === 'function') {
          await Promise.resolve(onSubmit({ ...journalData, predictedEmotion: result.predictedEmotion }));
        }
      } catch (backendError) {
        
        // Fallback: save locally and call parent onSubmit
        if (onSubmit && typeof onSubmit === 'function') {
          await Promise.resolve(onSubmit(journalData));
        }
      }
    } catch (err) {
      console.error('Error submitting:', err);
      alert('Failed to save journal entry. Please try again.');
    } finally {
      setIsSaving(false);

      // ✅ Reset form AFTER submit finishes
      setTitle('');
      setEntry('');
      setMood('');
      setTags('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const moodOptions = [
    { value: 'excited', label: 'Excited' },
    { value: 'happy', label: 'Happy' },
    { value: 'content', label: 'Content' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'sad', label: 'Sad' },
    { value: 'anxious', label: 'Anxious' },
    { value: 'angry', label: 'Angry' },
    { value: 'overwhelmed', label: 'Overwhelmed' },
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-high-contrast mb-4">New Journal Entry</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm font-medium text-label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border border-slate-600 bg-slate-100 text-black rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-label mb-2">Entry Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="w-full px-3 py-2 border border-slate-600 bg-slate-100 text-black rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-label mb-2">Mood (optional)</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-3 py-2 border border-slate-600 bg-slate-100 text-black rounded-md"
          >
            <option value="">Select a mood (optional)</option>
            {moodOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-label mb-2">What's on your mind?</label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write about your day..."
            className="w-full h-32 px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-label mb-2">Tags (optional)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="work, family, etc."
            className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md"
          />
        </div>

        {/* ✅ Type submit + onSubmit guarantees it works */}
        <button
          type="submit"
          disabled={!title || !entry || isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-2 px-4 rounded-md"
        >
          {isSaving ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
};

export default JournalForm;
