# AgroCredit Chat Server

Flask-based chat server with Google Gemini AI integration for the AgroCredit project.

## Deployment on Render.com

### Prerequisites
- Render.com account
- Google Gemini API key

### Setup Instructions

1. **Create a new Web Service on Render.com**
   - Connect your GitHub repository
   - Select this directory as the root

2. **Configure Environment Variables**
   Add the following environment variable in Render dashboard:
   ```
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

3. **Build & Start Commands**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python app.py`

4. **Runtime**
   - Python 3.11 or higher

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variable
# Windows:
set GOOGLE_API_KEY=your_key_here

# Linux/Mac:
export GOOGLE_API_KEY=your_key_here

# Run server
python app.py
```

Server will run on `http://localhost:3000`

### API Endpoint

**POST** `/chat`

Request:
```json
{
  "message": "Что такое AgroCredit?"
}
```

Response:
```json
{
  "reply": "AgroScore.AI — это AI-аналитика для агросектора..."
}
```

### Tech Stack
- Flask 3.0.0
- Google Generative AI (Gemini)
- Flask-CORS
- Python-dotenv
