@echo off
echo 🚀 Whatsapp based food ordering system...

:: Start Backend
cd backend
call venv\Scripts\activate.bat
echo 🖥️ Running FastAPI backend at http://localhost:8000
start cmd /k "uvicorn main:app --reload"

:: Start Frontend
cd ..\frontend
echo 🌍 Running React Car Rental App at http://localhost:3000
start cmd /k "npm start"

:: Done
echo All services started. Press any key to exit this window...
pause
