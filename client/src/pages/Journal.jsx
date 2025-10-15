import React, { useState } from 'react';
import JournalForm from '../components/JournalForm';

const Journal = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleJournalSubmit = (journalData) => {
    const newEntry = {
      id: journalEntries.length + 1,
      ...journalData,
      date: new Date().toISOString().split('T')[0]
    };
    setJournalEntries([newEntry, ...journalEntries]);
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
        <h1 className="text-4xl font-bold text-black mb-2">
          Your Journal
        </h1>
        <p className="text-black text-lg">
          Reflect on your thoughts, feelings, and experiences. Your personal space for self-discovery.
        </p>
      </div>

      {/* Journal Form */}
      <div className="mb-8">
        <JournalForm onSubmit={handleJournalSubmit} />
      </div>

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
                : 'Start your journaling journey by writing your first entry above.'
              }
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-high-contrast capitalize">{entry.mood}</h3>
                  <p className="text-sm text-label">{entry.date}</p>
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

