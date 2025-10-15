import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MoodChart = ({ data = null }) => {
  // Dummy data for demonstration
  const dummyData = [
    { date: '2024-01-01', mood: 7, energy: 6, stress: 3 },
    { date: '2024-01-02', mood: 6, energy: 5, stress: 4 },
    { date: '2024-01-03', mood: 8, energy: 7, stress: 2 },
    { date: '2024-01-04', mood: 5, energy: 4, stress: 6 },
    { date: '2024-01-05', mood: 7, energy: 6, stress: 3 },
    { date: '2024-01-06', mood: 9, energy: 8, stress: 1 },
    { date: '2024-01-07', mood: 6, energy: 5, stress: 4 },
  ];

  const chartData = data || dummyData;

  const moodData = [
    { name: 'Happy', value: 45, color: '#4ade80' },
    { name: 'Content', value: 30, color: '#84cc16' },
    { name: 'Neutral', value: 15, color: '#eab308' },
    { name: 'Sad', value: 7, color: '#f97316' },
    { name: 'Anxious', value: 3, color: '#ef4444' },
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg heading mb-4">Mood Trends</h3>
      
      <div className="space-y-6">
        {/* Line Chart */}
        <div>
          <h4 className="text-sm font-medium text-sage-600 mb-3">Weekly Mood Overview</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#4a6b4a" 
                strokeWidth={2}
                dot={{ fill: '#4a6b4a', strokeWidth: 2, r: 4 }}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#84cc16" 
                strokeWidth={2}
                dot={{ fill: '#84cc16', strokeWidth: 2, r: 4 }}
                name="Energy"
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                name="Stress"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Distribution */}
        <div>
          <h4 className="text-sm font-medium text-sage-600 mb-3">Mood Distribution (Last 30 Days)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Occurrence']}
              />
              <Bar dataKey="value" fill="#4a6b4a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-sage-50 rounded-lg">
            <div className="text-2xl font-bold text-sage-600">7.2</div>
            <div className="text-xs text-sage-500">Avg Mood</div>
          </div>
          <div className="text-center p-3 bg-sage-50 rounded-lg">
            <div className="text-2xl font-bold text-sage-600">23</div>
            <div className="text-xs text-sage-500">Entries</div>
          </div>
          <div className="text-center p-3 bg-sage-50 rounded-lg">
            <div className="text-2xl font-bold text-sage-600">85%</div>
            <div className="text-xs text-sage-500">Positive</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodChart;





