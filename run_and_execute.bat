@echo off
SETLOCAL
echo ===== Backend Setup =====
cd backend

:: Create virtual environment if not exists
IF NOT EXIST venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

:: Activate virtual environment
call venv\Scripts\activate.bat

cd ..
:: Install Python dependencies
echo Installing backend dependencies...
pip install -r requirements.txt

:: Start backend server in new terminal
start "Backend Server" cmd /k "cd backend && call venv\Scripts\activate.bat && uvicorn main:app --reload"

cd ..


echo ===== Frontend Setup =====
cd frontend

:: Install frontend dependencies
echo Installing frontend dependencies...

npm start

:: Start React app in new terminal
:: start "Frontend Dev Server" cmd /k "npm start"

echo All services started.
ENDLOCAL
