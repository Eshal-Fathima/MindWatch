import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import MoodTracker from './pages/MoodTracker';
import Productivity from './pages/Productivity';
import Quick from './pages/Quick';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen calm-gradient">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/journal" element={<Layout><Journal /></Layout>} />
          <Route path="/mood-tracker" element={<Layout><MoodTracker /></Layout>} />
          <Route path="/productivity" element={<Layout><Productivity /></Layout>} />
          <Route path="/quick" element={<Layout><Quick /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




