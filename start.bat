@echo off
echo Starting MindWatch services...

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python first.
    pause
    exit /b 1
)

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Install ML service dependencies
echo Installing ML service dependencies...
cd mlservice
pip install -r requirements.txt
cd ..

REM Install server dependencies
echo Installing server dependencies...
cd server
npm install
cd ..

REM Install client dependencies
echo Installing client dependencies...
cd client
npm install
cd ..

echo All dependencies installed!
echo.
echo To start the services, run these commands in separate terminals:
echo.
echo 1. Start ML service:
echo    cd mlservice ^&^& python app.py
echo.
echo 2. Start backend server:
echo    cd server ^&^& npm start
echo.
echo 3. Start frontend:
echo    cd client ^&^& npm start
echo.
echo Services will be available at:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:3001
echo - ML Service: http://localhost:5000
echo.
pause
