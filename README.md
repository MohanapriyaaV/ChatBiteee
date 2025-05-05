# WhatsApp-Based Food Ordering System

A food ordering system that allows users to browse menus, place orders, and receive updates via WhatsApp messaging.

## Features

- Menu management
- Order placement and tracking
- Real-time WhatsApp notifications
- Restaurant staff dashboard
- Python SDK for programmatic access

## Prerequisites

- Python 3.8+
- Node.js 14+
- Twilio account for WhatsApp integration
- npm or yarn

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory:
```bash
cp backend/.env.example backend/.env
```

4. Update the `.env` file with your Twilio credentials and other configuration.

5. Start the FastAPI server:
```bash
cd backend
uvicorn main:app --reload
```

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Start the React development server:
```bash
npm start
```

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- OpenAPI JSON: http://localhost:8000/openapi.json

## Testing

To run the backend tests:
```bash
cd backend
pytest
```

## Project Structure

```
.
├── backend/               # FastAPI backend
│   ├── main.py           # Main application file
│   ├── .env              # Environment variables
│   └── tests/            # Test files
├── frontend/             # React frontend
│   ├── src/             # Source files
│   └── public/          # Static files
├── sdk/                  # Generated Python SDK
├── scripts/              # Automation scripts
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 