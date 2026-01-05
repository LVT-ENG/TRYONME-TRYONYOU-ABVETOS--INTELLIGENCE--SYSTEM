# Backend Documentation

## Setup

1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate`
4. `pip install -r requirements.txt`

## Running

`uvicorn main:app --reload`

## API

- `POST /api/scan/upload`: Upload file, returns metrics and mock product URL.
