import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    reddit: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual login logic
    // Persist name for greeting
    if (formData.name) {
      try {
        localStorage.setItem('mw:name', formData.name.trim());
      } catch {}
    }
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-600/20 rounded-full blur-3xl floating"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-600/20 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-400/10 to-orange-600/10 rounded-full blur-3xl floating" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header with Updated Styling */}
        <div className="text-center fade-in">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl floating pulse-glow relative">
            {/* MW letters are now solid black */}
            <span className="text-black font-extrabold text-4xl relative z-10">MW</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 opacity-75 blur-lg"></div>
          </div>

          {/* Title is now completely black */}
          <h2 className="mt-8 text-5xl font-bold text-black scale-in">
            Welcome to MindWatch
          </h2>

          <p className="mt-6 text-xl text-black fade-in-delay-1 font-medium">
            Sign in to your <span className="font-pacifico text-black">MindWatch</span> account
          </p>
        </div>

        {/* Login Form with Enhanced Styling */}
        <div className="login-bg rounded-3xl p-10 shadow-2xl scale-in backdrop-blur-xl border border-white/10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="fade-in-delay-2">
                <label htmlFor="name" className="block text-sm font-semibold text-slate-200 mb-3">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-4 py-3 border border-slate-600/50 placeholder-slate-400 text-slate-200 bg-slate-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:z-10 sm:text-sm transition-all duration-300 hover:bg-slate-700/40"
                  placeholder="Enter your name"
                />
              </div>
              <div className="fade-in-delay-3">
                <label htmlFor="reddit" className="block text-sm font-semibold text-slate-200 mb-3">
                  Reddit username (optional)
                </label>
                <input
                  id="reddit"
                  name="reddit"
                  type="text"
                  autoComplete="off"
                  value={formData.reddit}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-4 py-3 border border-slate-600/50 placeholder-slate-400 text-slate-200 bg-slate-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:z-10 sm:text-sm transition-all duration-300 hover:bg-slate-700/40"
                  placeholder="Enter your Reddit username"
                />
              </div>
              <div className="fade-in-delay-4">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-3">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-4 py-3 border border-slate-600/50 placeholder-slate-400 text-slate-200 bg-slate-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:z-10 sm:text-sm transition-all duration-300 hover:bg-slate-700/40"
                  placeholder="Enter your email"
                />
              </div>
              <div className="fade-in-delay-4">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-3">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-4 py-3 border border-slate-600/50 placeholder-slate-400 text-slate-200 bg-slate-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:z-10 sm:text-sm transition-all duration-300 hover:bg-slate-700/40"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="fade-in-delay-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-8 border border-transparent text-xl font-bold rounded-2xl text-white bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-700 hover:via-amber-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 btn-animate shadow-2xl hover:shadow-3xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span className="flex items-center space-x-3">
                    <span>Sign in</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-slate-300">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                  Sign up here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
