#!/bin/bash

# MindWatch Startup Script
echo "Starting MindWatch services..."

# Check if Python is available
if ! command -v python &> /dev/null; then
    echo "Python is not installed. Please install Python first."
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install ML service dependencies
echo "Installing ML service dependencies..."
cd mlservice
pip install -r requirements.txt
cd ..

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install
cd ..

echo "All dependencies installed!"
echo ""
echo "To start the services, run these commands in separate terminals:"
echo ""
echo "1. Start ML service:"
echo "   cd mlservice && python app.py"
echo ""
echo "2. Start backend server:"
echo "   cd server && npm start"
echo ""
echo "3. Start frontend:"
echo "   cd client && npm start"
echo ""
echo "Services will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001"
echo "- ML Service: http://localhost:5000"
