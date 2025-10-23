const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindwatch';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.log('MongoDB connection error:', err);
  console.log('Continuing without MongoDB - using in-memory storage');
});

// Journal Entry Schema
const journalEntrySchema = new mongoose.Schema({
  title: String,
  entry: String,
  mood: String,
  tags: [String],
  date: String,
  timestamp: Date,
  userId: String,
  predictedEmotion: String
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// In-memory storage fallback
let inMemoryJournalEntries = [];
let inMemoryUsers = [];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MindWatch API is running' });
});

// Journal entries endpoints
app.post('/api/journal', async (req, res) => {
  try {
    const { title, entry, mood, tags, date, timestamp, userId } = req.body;
    
    // Call ML service for emotion prediction
    let predictedEmotion = mood; // fallback to selected mood
    try {
      const mlResponse = await axios.post('http://localhost:5000/predict', {
        text: entry
      });
      predictedEmotion = mlResponse.data.prediction;
    } catch (mlError) {
      console.log('ML service unavailable, using selected mood:', mlError.message);
    }

    const journalEntry = {
      id: Date.now(),
      title,
      entry,
      mood,
      tags,
      date,
      timestamp: new Date(timestamp),
      userId: userId || 'anonymous',
      predictedEmotion
    };

    // Try to save to MongoDB, fallback to in-memory
    try {
      const savedEntry = new JournalEntry(journalEntry);
      await savedEntry.save();
      res.json({ success: true, entry: savedEntry, predictedEmotion });
    } catch (dbError) {
      console.log('MongoDB unavailable, using in-memory storage:', dbError.message);
      inMemoryJournalEntries.push(journalEntry);
      res.json({ success: true, entry: journalEntry, predictedEmotion });
    }
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ error: 'Failed to save journal entry' });
  }
});

app.get('/api/journal/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const entries = await JournalEntry.find({ userId }).sort({ timestamp: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

// User authentication endpoints
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    
    res.json({ success: true, token, user: { id: user._id, username, email } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    
    res.json({ success: true, token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
