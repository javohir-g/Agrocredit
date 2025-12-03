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
   Add the following environment variables in Render dashboard:
   ```
   GOOGLE_API_KEY=your_gemini_api_key_here
   ALLOWED_ORIGINS=https://your-demo-url.onrender.com,http://localhost:3000
   ```
   
   **Note:** Replace `your-demo-url.onrender.com` with the actual URL where your demo page will be hosted.

3. **Build & Start Commands**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python app.py`

4. **Runtime**
   - Python 3.11 or higher

### Demo Integration

After deploying the server, you need to configure the demo page to use your server URL:

1. **Update demo/index.html**
   - Open `demo/index.html`
   - Find the line: `const PRODUCTION_API_URL = 'https://your-server-name.onrender.com';`
   - Replace with your actual Render.com server URL
   - Example: `const PRODUCTION_API_URL = 'https://agrocredit-api.onrender.com';`

2. **Deploy Demo Page**
   - You can deploy the demo folder as a static site on Render.com or any static hosting service
   - The chatbot will automatically detect the environment and use the correct API URL

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
- Google Generative AI (Gemini 1.5 Flash)
- Flask-CORS
- Python-dotenv

### Environment Variables

- `GOOGLE_API_KEY` - Your Google Gemini API key (required)
- `PORT` - Server port (default: 3000)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins (default: localhost)
