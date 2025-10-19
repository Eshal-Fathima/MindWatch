import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const MoodTracker = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('mood');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for demonstration - will be replaced with Google Looker Studio integration
  const moodData = [
    { date: '2024-01-01', mood: 7, energy: 6, stress: 3, sleep: 8, exercise: 1 },
    { date: '2024-01-02', mood: 6, energy: 5, stress: 4, sleep: 7, exercise: 0 },
    { date: '2024-01-03', mood: 8, energy: 7, stress: 2, sleep: 8, exercise: 1 },
    { date: '2024-01-04', mood: 5, energy: 4, stress: 6, sleep: 6, exercise: 0 },
    { date: '2024-01-05', mood: 7, energy: 6, stress: 3, sleep: 7, exercise: 1 },
    { date: '2024-01-06', mood: 9, energy: 8, stress: 1, sleep: 9, exercise: 1 },
    { date: '2024-01-07', mood: 6, energy: 5, stress: 4, sleep: 7, exercise: 0 },
  ];

  const moodDistribution = [
    { name: 'Happy', value: 35, color: '#4ade80' },
    { name: 'Content', value: 25, color: '#84cc16' },
    { name: 'Neutral', value: 20, color: '#eab308' },
    { name: 'Sad', value: 12, color: '#f97316' },
    { name: 'Anxious', value: 8, color: '#ef4444' },
  ];

  const weeklyStats = [
    { label: 'Average Mood', value: '7.2', trend: '+0.3', color: 'text-green-400' },
    { label: 'Energy Level', value: '6.0', trend: '+0.1', color: 'text-blue-400' },
    { label: 'Stress Level', value: '3.3', trend: '-0.2', color: 'text-orange-400' },
    { label: 'Sleep Quality', value: '7.4', trend: '+0.5', color: 'text-purple-400' },
  ];

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  const getMetricColor = (metric) => {
    const colors = {
      mood: '#4ade80',
      energy: '#3b82f6',
      stress: '#f97316',
      sleep: '#8b5cf6',
      exercise: '#06b6d4'
    };
    return colors[metric] || '#6b7280';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Animation */}
      <div className="mb-12 text-center fade-in">
        <h1 className="text-5xl font-bold text-black mb-4 floating">
          Mood Tracker 📊
        </h1>
        <p className="text-black text-xl max-w-3xl mx-auto leading-relaxed">
          Comprehensive analytics and insights into your mental health journey.
        </p>
      </div>

      {/* Controls with Animation */}
      <div className="card-hover card p-8 mb-12 scale-in">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <span className="text-label text-sm font-semibold">Time Range:</span>
            <div className="flex gap-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    timeRange === range
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:shadow-md'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <span className="text-label text-sm font-semibold">Metric:</span>
            <div className="flex gap-2 flex-wrap">
              {['mood', 'energy', 'stress', 'sleep', 'exercise'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => handleMetricChange(metric)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 capitalize ${
                    selectedMetric === metric
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:shadow-md'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview with Staggered Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {weeklyStats.map((stat, index) => (
          <div key={index} className="stagger-item card-hover card p-8 text-center group">
            <div className="text-3xl font-bold text-high-contrast mb-2 group-hover:scale-110 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="text-sm text-label mb-3 font-medium">{stat.label}</div>
            <div className={`text-xs font-semibold ${stat.color} flex items-center justify-center space-x-1`}>
              <span>{stat.trend.includes('+') ? '↗️' : '↘️'}</span>
              <span>{stat.trend} from last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Main Chart */}
        <div className="card-hover card p-8 slide-in-left">
          <h3 className="text-xl font-semibold text-high-contrast mb-6 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              📈
            </span>
            {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trends
          </h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: '#f9fafb',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke={getMetricColor(selectedMetric)}
                  strokeWidth={4}
                  dot={{ fill: getMetricColor(selectedMetric), strokeWidth: 2, r: 6 }}
                  name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Mood Distribution */}
        <div className="card-hover card p-8 slide-in-right">
          <h3 className="text-xl font-semibold text-high-contrast mb-6 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
              🥧
            </span>
            Mood Distribution
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={moodDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {moodDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#f9fafb',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Correlation Analysis */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-high-contrast mb-4">
            Correlation Analysis
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg">
              <span className="text-medium-contrast">Sleep → Mood</span>
              <span className="text-green-400 font-semibold">+0.78</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg">
              <span className="text-medium-contrast">Exercise → Energy</span>
              <span className="text-blue-400 font-semibold">+0.65</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg">
              <span className="text-medium-contrast">Stress → Sleep</span>
              <span className="text-red-400 font-semibold">-0.72</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg">
              <span className="text-medium-contrast">Mood → Productivity</span>
              <span className="text-green-400 font-semibold">+0.58</span>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-high-contrast mb-4">
            AI Insights & Recommendations
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <span className="text-green-400 text-lg">💡</span>
                <div>
                  <h4 className="text-green-400 font-medium mb-1">Positive Trend</h4>
                  <p className="text-medium-contrast text-sm">
                    Your mood has improved by 15% this week. Keep up the great work!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <span className="text-blue-400 text-lg">🎯</span>
                <div>
                  <h4 className="text-blue-400 font-medium mb-1">Recommendation</h4>
                  <p className="text-medium-contrast text-sm">
                    Try to maintain 8+ hours of sleep - it strongly correlates with better mood.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <span className="text-orange-400 text-lg">⚠️</span>
                <div>
                  <h4 className="text-orange-400 font-medium mb-1">Watch Out</h4>
                  <p className="text-medium-contrast text-sm">
                    Stress levels tend to spike on Mondays. Consider planning relaxing activities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Looker Studio Integration Placeholder */}
      <div className="card p-8 text-center">
        <h3 className="text-xl font-semibold text-high-contrast mb-4">
          Advanced Analytics Dashboard
        </h3>
        <p className="text-medium-contrast mb-6">
          Connect to Google Looker Studio for deeper insights and custom visualizations.
        </p>
        <div className="bg-slate-700/40 border-2 border-dashed border-slate-600 rounded-lg p-8">
          <div className="text-4xl mb-4">📈</div>
          <h4 className="text-lg font-medium text-high-contrast mb-2">
            Google Looker Studio Integration
          </h4>
          <p className="text-medium-contrast text-sm mb-4">
            Advanced analytics, custom reports, and data visualization will be available here.
          </p>
          <button className="btn-primary">
            Connect to Looker Studio
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
