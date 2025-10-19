import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <nav className="glass border-b border-sage-200/60">
      {/* Navbar visible for font testing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                <span className="text-black font-extrabold text-lg font-pacifico">MW</span>
              </div>
              <span className="text-2xl font-pacifico text-black transition-colors">
                MindWatch
              </span>
            </Link>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-4 font-pacifico">
              {/* Mobile hamburger button for small screens */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100/30"
                aria-label="Open menu"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <Link
                to="/dashboard"
                className="!text-black font-medium hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/journal"
                className="!text-black font-medium hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Journal
              </Link>
              <Link
                to="/productivity"
                className="!text-black font-medium hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Productivity
              </Link>
              <Link
                to="/quick"
                className="!text-black font-medium hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Quick Tabs
              </Link>
              <Link
                to="/settings"
                className="!text-black font-medium hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm transition-colors"
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="text-black font-medium hover:bg-sage-100/60 active:bg-sage-100 px-3 py-2 rounded-md text-sm transition-colors"
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
