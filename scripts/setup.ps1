# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create frontend directory if it doesn't exist
if (-not (Test-Path frontend)) {
    npx create-react-app frontend
}

# Install frontend dependencies
cd frontend
npm install
cd ..

# Create backend directory if it doesn't exist
if (-not (Test-Path backend)) {
    New-Item -ItemType Directory -Path backend
}

# Copy environment file
Copy-Item backend\.env.example backend\.env

Write-Host "Setup completed successfully!"
Write-Host "Please update the .env file in the backend directory with your Twilio credentials."
Write-Host "To start the backend server, run: cd backend && uvicorn main:app --reload"
Write-Host "To start the frontend server, run: cd frontend && npm start" 