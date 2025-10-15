import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    trustedContact: {
      name: '',
      email: '',
      phone: ''
    },
    theme: 'dark',
    redditUsername: '',
    notifications: {
      dailyReminder: true,
      moodCheck: true,
      weeklyReport: false
    },
    privacy: {
      dataSharing: false,
      analytics: true
    }
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleToggleChange = (section, field) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement settings save logic
    console.log('Settings saved:', settings);
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Settings ⚙️
        </h1>
        <p className="text-slate-300 text-lg">
          Customize your MindWatch experience and manage your preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Emergency Contact */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Emergency Contact</h3>
          <p className="text-slate-400 text-sm mb-4">
            Add a contact who can be notified in case of emergency or if you need support.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                value={settings.trustedContact.name}
                onChange={(e) => handleInputChange('trustedContact', 'name', e.target.value)}
                placeholder="Enter contact name"
                className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={settings.trustedContact.email}
                onChange={(e) => handleInputChange('trustedContact', 'email', e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.trustedContact.phone}
                onChange={(e) => handleInputChange('trustedContact', 'phone', e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
          <div className="flex items-center gap-4">
            <label className="text-slate-300">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => {
                const theme = e.target.value;
                setSettings((prev) => ({ ...prev, theme }));
                applyTheme(theme);
              }}
              className="px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        {/* Reddit Integration */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Reddit Integration</h3>
          <p className="text-slate-400 text-sm mb-4">
            Connect your Reddit account for sentiment analysis and mood tracking based on your posts and comments.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Reddit Username
            </label>
            <input
              type="text"
              value={settings.redditUsername}
              onChange={(e) => setSettings(prev => ({ ...prev, redditUsername: e.target.value }))}
              placeholder="Enter your Reddit username"
              className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
          <p className="text-slate-400 text-sm mb-4">
            Choose how you'd like to be reminded about your mental health journey.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-slate-300 font-medium">Daily Journal Reminder</label>
                <p className="text-slate-400 text-sm">Get reminded to write in your journal daily</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleChange('notifications', 'dailyReminder')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.dailyReminder ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.dailyReminder ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-slate-300 font-medium">Mood Check-in</label>
                <p className="text-slate-400 text-sm">Regular mood check-in reminders</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleChange('notifications', 'moodCheck')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.moodCheck ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.moodCheck ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-slate-300 font-medium">Weekly Report</label>
                <p className="text-slate-400 text-sm">Receive weekly insights and progress reports</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleChange('notifications', 'weeklyReport')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.weeklyReport ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Privacy & Data</h3>
          <p className="text-slate-400 text-sm mb-4">
            Control how your data is used and shared.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-slate-300 font-medium">Data Sharing</label>
                <p className="text-slate-400 text-sm">Allow anonymous data sharing for research purposes</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleChange('privacy', 'dataSharing')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy.dataSharing ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.dataSharing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-slate-300 font-medium">Analytics</label>
                <p className="text-slate-400 text-sm">Help improve the app with usage analytics</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleChange('privacy', 'analytics')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy.analytics ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.analytics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;