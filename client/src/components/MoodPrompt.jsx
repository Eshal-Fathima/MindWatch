import React, { useState } from 'react';

const MoodPrompt = ({ onPromptSelect }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const prompts = [
    {
      id: 1,
      category: 'Gratitude',
      question: 'What made you happy today?',
      icon: '😊',
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    {
      id: 2,
      category: 'Reflection',
      question: 'What made you sad today?',
      icon: '😢',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: 3,
      category: 'Stress',
      question: 'What stressed you today?',
      icon: '😰',
      color: 'bg-orange-50 border-orange-200 text-orange-700'
    },
    {
      id: 4,
      category: 'Achievement',
      question: 'What was a small win today?',
      icon: '🎉',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    {
      id: 5,
      category: 'Growth',
      question: 'What did you learn today?',
      icon: '🌱',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700'
    },
    {
      id: 6,
      category: 'Connection',
      question: 'Who made you smile today?',
      icon: '💕',
      color: 'bg-pink-50 border-pink-200 text-pink-700'
    }
  ];

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    if (onPromptSelect) {
      onPromptSelect(prompt);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg heading mb-2">AI Reflection Prompts</h3>
      <p className="text-sm subtle mb-6">
        Choose a prompt to guide your journaling and self-reflection.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => handlePromptClick(prompt)}
            className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
              selectedPrompt?.id === prompt.id
                ? `${prompt.color} border-current`
                : 'border-sage-200 hover:border-sage-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{prompt.icon}</div>
              <div className="flex-1">
                <div className="text-xs font-medium text-sage-500 mb-1">
                  {prompt.category}
                </div>
                <div className="text-sm font-medium">
                  {prompt.question}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedPrompt && (
        <div className="mt-6 p-4 bg-sage-50 rounded-lg border border-sage-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{selectedPrompt.icon}</span>
            <span className="font-medium text-sage-700">{selectedPrompt.category}</span>
          </div>
          <p className="text-sage-600 mb-3">{selectedPrompt.question}</p>
          <div className="text-xs text-sage-500">
            💡 Tip: Take a moment to think deeply about this question. There are no wrong answers.
          </div>
        </div>
      )}

      {/* Additional Features */}
      <div className="mt-6 pt-6 border-t border-sage-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
            <span>🎵</span>
            <span>Play Calm Music</span>
          </button>
          <button className="flex-1 btn-quiet flex items-center justify-center space-x-2">
            <span>💡</span>
            <span>Show Tips & Tricks</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodPrompt;





