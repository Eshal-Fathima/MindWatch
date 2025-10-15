import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <nav className="glass border-b border-sage-200/60 hidden">{/* Navbar hidden in new calm UI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                <span className="text-white font-bold text-sm">MW</span>
              </div>
              <span className="text-xl font-semibold text-sage-700 group-hover:text-sage-800 transition-colors">MindWatch</span>
            </Link>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="text-sage-700 hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/journal" 
                className="text-sage-700 hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Journal
              </Link>
              <Link 
                to="/productivity" 
                className="text-sage-700 hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Productivity
              </Link>
              <Link 
                to="/quick" 
                className="text-sage-700 hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Quick Tabs
              </Link>
              <Link 
                to="/settings" 
                className="text-sage-700 hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="btn-primary"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





