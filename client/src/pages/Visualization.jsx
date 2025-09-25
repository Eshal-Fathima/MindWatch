import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MoodChart from '../components/MoodChart';

const Visualization = () => {
  const [activeTab, setActiveTab] = useState('mood');

  // Dummy data for different visualizations
  const moodData = [
    { date: '2024-01-01', mood: 7, energy: 6, stress: 3, sleep: 8 },
    { date: '2024-01-02', mood: 6, energy: 5, stress: 4, sleep: 7 },
    { date: '2024-01-03', mood: 8, energy: 7, stress: 2, sleep: 8 },
    { date: '2024-01-04', mood: 5, energy: 4, stress: 6, sleep: 6 },
    { date: '2024-01-05', mood: 7, energy: 6, stress: 3, sleep: 7 },
    { date: '2024-01-06', mood: 9, energy: 8, stress: 1, sleep: 9 },
    { date: '2024-01-07', mood: 6, energy: 5, stress: 4, sleep: 7 },
  ];

  const redditData = [
    { date: '2024-01-01', sentiment: 0.7, posts: 12 },
    { date: '2024-01-02', sentiment: 0.5, posts: 8 },
    { date: '2024-01-03', sentiment: 0.8, posts: 15 },
    { date: '2024-01-04', sentiment: 0.3, posts: 6 },
    { date: '2024-01-05', sentiment: 0.6, posts: 10 },
    { date: '2024-01-06', sentiment: 0.9, posts: 18 },
    { date: '2024-01-07', sentiment: 0.4, posts: 7 },
  ];

  const activityData = [
    { activity: 'Exercise', hours: 3.5, color: '#4ade80' },
    { activity: 'Work', hours: 8, color: '#3b82f6' },
    { activity: 'Social', hours: 2, color: '#f59e0b' },
    { activity: 'Hobbies', hours: 1.5, color: '#8b5cf6' },
    { activity: 'Rest', hours: 9, color: '#6b7280' },
  ];

  const tabs = [
    { id: 'mood', label: 'Mood Trends', icon: '😊' },
    { id: 'reddit', label: 'Reddit Analysis', icon: '🔍' },
    { id: 'activity', label: 'Activity Breakdown', icon: '📊' },
    { id: 'insights', label: 'AI Insights', icon: '🤖' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-sage-700 mb-2">
              Mental Health Insights 📊
            </h1>
            <p className="text-sage-600">
              Visualize your mental health journey with detailed analytics and AI-powered insights.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-sage-200 mb-8">
            <div className="border-b border-sage-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-sage-500 text-sage-600'
                        : 'border-transparent text-sage-500 hover:text-sage-700 hover:border-sage-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'mood' && (
              <div>
                <MoodChart data={moodData} />
                
                {/* Additional Mood Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                    <h3 className="text-lg font-semibold text-sage-700 mb-4">Mood Patterns</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sage-600">Best Day</span>
                        <span className="font-medium text-sage-700">Saturday (9/10)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-600">Worst Day</span>
                        <span className="font-medium text-sage-700">Thursday (5/10)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-600">Most Common</span>
                        <span className="font-medium text-sage-700">Happy (45%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                    <h3 className="text-lg font-semibold text-sage-700 mb-4">Triggers</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600">Work stress</span>
                        <div className="w-20 bg-sage-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600">Social events</span>
                        <div className="w-20 bg-sage-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600">Exercise</span>
                        <div className="w-20 bg-sage-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                    <h3 className="text-lg font-semibold text-sage-700 mb-4">Recommendations</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sage-600">More social activities</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sage-600">Regular exercise routine</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-500">⚠</span>
                        <span className="text-sage-600">Work-life balance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reddit' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                  <h3 className="text-lg font-semibold text-sage-700 mb-4">Reddit Sentiment Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sage-600 mb-3">Sentiment Trend</h4>
                      <div className="space-y-2">
                        {redditData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-sage-600">{item.date}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-sage-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    item.sentiment > 0.6 ? 'bg-green-500' : 
                                    item.sentiment > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${item.sentiment * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-sage-700">
                                {(item.sentiment * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sage-600 mb-3">Activity Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sage-600">Total Posts Analyzed</span>
                          <span className="font-medium text-sage-700">76</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-600">Average Sentiment</span>
                          <span className="font-medium text-sage-700">68%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-600">Most Active Day</span>
                          <span className="font-medium text-sage-700">Saturday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                  <h3 className="text-lg font-semibold text-sage-700 mb-4">Key Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sage-600 mb-3">Positive Topics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">📈</span>
                          <span className="text-sage-700">Career achievements</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">📈</span>
                          <span className="text-sage-700">Hobby discussions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">📈</span>
                          <span className="text-sage-700">Learning new skills</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sage-600 mb-3">Areas of Concern</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-500">📉</span>
                          <span className="text-sage-700">Work stress mentions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-500">📉</span>
                          <span className="text-sage-700">Sleep issues</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-500">📉</span>
                          <span className="text-sage-700">Social anxiety</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                  <h3 className="text-lg font-semibold text-sage-700 mb-4">Weekly Activity Breakdown</h3>
                  <div className="space-y-4">
                    {activityData.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: activity.color }}
                          ></div>
                          <span className="text-sage-700">{activity.activity}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-sage-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                backgroundColor: activity.color,
                                width: `${(activity.hours / 24) * 100}%`
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-sage-700">
                            {activity.hours}h
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                    <h3 className="text-lg font-semibold text-sage-700 mb-4">Productivity Score</h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-sage-600 mb-2">8.2</div>
                      <div className="text-sage-500">out of 10</div>
                      <div className="mt-4 text-sm text-sage-600">
                        Based on work hours, exercise, and learning activities
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                    <h3 className="text-lg font-semibold text-sage-700 mb-4">Wellness Score</h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-sage-600 mb-2">7.5</div>
                      <div className="text-sage-500">out of 10</div>
                      <div className="mt-4 text-sm text-sage-600">
                        Based on sleep, social time, and stress levels
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                  <h3 className="text-lg font-semibold text-sage-700 mb-4">AI-Generated Insights</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-sage-700 mb-2">Pattern Recognition</h4>
                      <p className="text-sage-600 text-sm">
                        Your mood tends to be highest on weekends and after social activities. 
                        Consider scheduling more social events during the week to maintain positive mood levels.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-sage-700 mb-2">Positive Trends</h4>
                      <p className="text-sage-600 text-sm">
                        Your journal entries show increasing gratitude and self-awareness over the past month. 
                        This suggests your mindfulness practices are having a positive impact.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-medium text-sage-700 mb-2">Recommendations</h4>
                      <p className="text-sage-600 text-sm">
                        Based on your Reddit activity, you might benefit from joining communities focused on 
                        stress management and work-life balance. Your current discussions show interest in these topics.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium text-sage-700 mb-2">Early Warning</h4>
                      <p className="text-sage-600 text-sm">
                        Your stress levels tend to spike mid-week. Consider implementing stress-reduction 
                        techniques like meditation or short breaks during these periods.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                  <h3 className="text-lg font-semibold text-sage-700 mb-4">Personalized Recommendations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sage-600 mb-3">Immediate Actions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sage-700 text-sm">Schedule a social activity this week</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sage-700 text-sm">Try 10-minute meditation daily</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sage-700 text-sm">Set work boundaries for Wednesday</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sage-600 mb-3">Long-term Goals</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500">🎯</span>
                          <span className="text-sage-700 text-sm">Maintain 7+ mood average</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500">🎯</span>
                          <span className="text-sage-700 text-sm">Reduce stress spikes by 20%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500">🎯</span>
                          <span className="text-sage-700 text-sm">Increase positive Reddit sentiment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Visualization;
