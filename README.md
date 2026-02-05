# Numerology Web App

A comprehensive full-stack application for numerology calculations and analysis. This project combines a robust Python backend with a modern Next.js frontend to provide accurate insights including Mulank, Bhagyank, Kua numbers, and Lo Shu Grids.

## Features

- **Core Calculations**:
  - **Mulank (Psychic Number)**: Derived from the birth date.
  - **Bhagyank (Destiny Number)**: Derived from the full date of birth.
  - **Kua Number**: Calculated based on birth year and gender.
  - **Name Number**: Numerological value of a name.
- **Tools**:
  - **Lo Shu Grid**: A 3x3 grid representation of the birth chart.
  - **Personal Periods**: Calculation of personal year, month, and day cycles.
- **API**: RESTful API endpoints for all numerological calculations.

## Tech Stack

- **Frontend**: 
  - [Next.js](https://nextjs.org/) (React Framework)
  - [Tailwind CSS](https://tailwindcss.com/) (Styling)
  - [Lucide React](https://lucide.dev/) (Icons)
- **Backend**:
  - [FastAPI](https://fastapi.tiangolo.com/) (Python Web Framework)
  - [Uvicorn](https://www.uvicorn.org/) (ASGI Server)
  - [Pydantic](https://docs.pydantic.dev/) (Data Validation)

## File Structure

```
Numerology/
├── backend/                # Python FastAPI Backend
│   ├── main.py             # API Entry point and routes
│   ├── numerology.py       # Core numerology calculation logic
│   ├── verify_numerology.py # Verification scripts
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # Reusable UI components
│   │   └── services/       # API integration services
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── README.md               # Project Documentation
```

## Prerequisites

Before running the project, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)

## Installation

### 1. Backend Setup

Navigate to the backend directory and create a virtual environment:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

- **Mac/Linux**:
  ```bash
  source venv/bin/activate
  ```
- **Windows**:
  ```bash
  venv\Scripts\activate
  ```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## Usage

### Running the Backend

Start the FastAPI server (runs on port 8000):

```bash
# In the backend directory with venv activated
uvicorn main:app --reload
```

### Running the Frontend

Start the Next.js development server (runs on port 3000):

```bash
# In the frontend directory
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
