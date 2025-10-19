import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/journal', label: 'Journal' },
    { path: '/mood-tracker', label: 'Mood Tracker' },
    { path: '/productivity', label: 'Productivity' },
    { path: '/quick', label: 'Quick' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">

      {/* Header with Hamburger Menu */}
      <header className="glass-dark border-b border-slate-700/50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                <span className="text-black font-extrabold text-lg">MW</span>
              </div>
              <span className="text-xl font-pacifico text-black transition-colors">MindWatch</span>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-black hover:text-gray-800 hover:bg-slate-700/50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 glass-dark border-b border-slate-700/50 z-30">
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-black hover:text-gray-800 hover:bg-slate-700/50 transition-colors"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-black hover:text-gray-800 hover:bg-slate-700/50 transition-colors"
              >
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-dark border-t border-slate-700/50 mt-auto relative z-20">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow">
                <span className="text-black font-bold text-sm">MW</span>
              </div>
              <span className="text-black font-medium font-pacifico">MindWatch</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-slate-400">
                © 2025 MindWatch. Your mental health companion.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Remember: You're not alone. Reach out if you need help.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;