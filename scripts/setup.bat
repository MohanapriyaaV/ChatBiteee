@echo off
echo 🔧 Whatsapp based food ordering system (Backend + Frontend)...

:: Backend Setup
echo 📦 Installing Python dependencies...
cd ..\backend
python -m venv venv
call venv\Scripts\activate.bat
echo Virtual Environment Activated...
pip install -r ..\requirements.txt

:: Database Initialization
echo 🗃️ Initializing database...
alembic upgrade head || echo ⚠️ Alembic migration skipped (if not configured)

:: Frontend Setup
cd ..\frontend
echo 🌐 Installing frontend dependencies...
npm install

echo ✅ Setup completed. Use run.bat to start the system.
pause

