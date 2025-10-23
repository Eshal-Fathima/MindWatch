import React, { useState } from 'react';
import JournalForm from '../components/JournalForm';

const Journal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [emotionMessage, setEmotionMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Emotion-based response messages
  const emotionMessages = {
    'sadness': "Oh no, you're feeling sad! 😢 Try going for a walk, calling a friend, or doing something you enjoy. Remember, it's okay to feel this way and it will pass.",
    'joy': "That's wonderful! 😊 You're feeling joyful! Keep spreading that positive energy and enjoy this moment of happiness.",
    'love': "How beautiful! ❤️ You're feeling love! Whether it's for yourself or others, this is a precious emotion. Nurture these feelings.",
    'anger': "I can see you're feeling angry! 😠 Take some deep breaths, maybe go for a run or try some relaxation techniques. It's okay to feel angry, but let's channel it constructively.",
    'fear': "I understand you're feeling fearful. 😰 Take things one step at a time, talk to someone you trust, and remember that you're stronger than your fears.",
    'surprise': "Wow! 😲 You're feeling surprised! Whether it's a good or challenging surprise, take a moment to process and embrace the unexpected.",
    'excited': "That's fantastic! 🎉 You're feeling excited! Channel that energy into something positive and make the most of this enthusiasm!",
    'happy': "Wonderful! 😄 You're feeling happy! Keep doing what makes you feel this way and spread the joy around!",
    'content': "How peaceful! 😌 You're feeling content. This is a beautiful state of mind - enjoy this moment of satisfaction and peace.",
    'neutral': "You're feeling neutral today. 🤔 That's perfectly fine! Sometimes a calm, balanced state is exactly what we need.",
    'anxious': "I can see you're feeling anxious. 😰 Try some deep breathing, grounding techniques, or talk to someone you trust. You're not alone in this.",
    'angry': "I can see you're feeling angry! 😠 Take some deep breaths, maybe go for a run or try some relaxation techniques. It's okay to feel angry, but let's channel it constructively.",
    'overwhelmed': "I understand you're feeling overwhelmed. 😵 Take a step back, break things down into smaller tasks, and don't hesitate to ask for help. You've got this!"
  };

  const getEmotionMessage = (mood) => {
    return emotionMessages[mood] || "Thank you for sharing your feelings. Remember, it's important to acknowledge and process your emotions.";
  };

  const handleJournalSubmit = async (journalData) => {
    try {
      // Get emotion message based on predicted emotion or selected mood
      const emotionToUse = journalData.predictedEmotion || journalData.mood;
      const message = getEmotionMessage(emotionToUse);
      setEmotionMessage(message);
      setShowMessage(true);

      // Hide message after 5 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      // Add entry to the list
      const newEntry = {
        id: Date.now(), // Use timestamp for unique ID
        ...journalData,
        date: new Date().toISOString().split('T')[0]
      };
      setJournalEntries([newEntry, ...journalEntries]);
    } catch (error) {
      console.error('Error submitting journal entry:', error);
    }
  };

  const filteredEntries = journalEntries.filter(entry => {
    const matchesFilter = filter === 'all' || entry.mood === filter;
    const matchesSearch = entry.entry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const moodEmojis = {};

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-high-contrast mb-2">
          This is your Journal
        </h1>
        <p className="text-medium-contrast text-lg">
          Reflect on your thoughts, feelings, and experiences. Your personal space for self-discovery.
        </p>
      </div>

      {/* Journal Form */}
      <div className="mb-8">
        <JournalForm onSubmit={handleJournalSubmit} />
      </div>

      {/* Emotion Message Display */}
      {showMessage && (
        <div className="mb-8 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700 font-medium">
                {emotionMessage}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowMessage(false)}
                  className="inline-flex bg-blue-100 rounded-md p-1.5 text-blue-500 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-100 focus:ring-blue-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
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
          
          {/* Mood Filter Buttons */}
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
            {['happy', 'sad', 'excited', 'anxious', 'angry', 'content', 'neutral', 'overwhelmed'].map((mood) => (
              <button
                key={mood}
                onClick={() => setFilter(mood)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  filter === mood
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                }`}
              >
                {mood}
              </button>
            ))}
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
                : 'Start your journaling journey by writing your first entry above.'
              }
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-high-contrast text-lg mb-1">{entry.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium capitalize">
                      {entry.mood}
                    </span>
                    <p className="text-sm text-label">{entry.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-label hover:text-blue-400 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="text-label hover:text-red-400 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-medium-contrast leading-relaxed">{entry.entry}</p>
              </div>
              
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

