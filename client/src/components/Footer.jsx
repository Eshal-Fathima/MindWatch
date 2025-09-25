import React from 'react';

const Footer = () => {
  return (
    <footer className="glass border-t border-sage-200/60 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-sage-500 rounded-full flex items-center justify-center shadow">
              <span className="text-white font-bold text-xs">MW</span>
            </div>
            <span className="text-sage-700 font-medium">MindWatch</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-sage-600">
              © 2024 MindWatch. Your mental health companion.
            </p>
            <p className="text-xs text-sage-500 mt-1">
              Remember: You're not alone. Reach out if you need help.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
