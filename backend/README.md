# Portfolio Chatbot Backend

A FastAPI-based backend for the portfolio chatbot that uses Groq's LLM API to provide intelligent responses about portfolio content.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **Groq Integration**: Uses Groq's LLM API for intelligent responses
- **Streaming Responses**: Real-time streaming of chatbot responses
- **Configurable**: Easy to modify chatbot behavior via `config.json`
- **CORS Enabled**: Configured for GitHub Pages frontend

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Environment Variables**:
   ```bash
   export GROQ_API_KEY="your_groq_api_key_here"
   ```

3. **Run the Server**:
   ```bash
   python run.py
   ```
   
   Or directly with uvicorn:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Endpoints

- `GET /`: Get basic API information
- `GET /config`: Get current chatbot configuration
- `POST /chat`: Send a message to the chatbot

## Configuration

The chatbot behavior is controlled by `config.json`:

- **Model**: LLM model to use (default: `openai/gpt-oss-20b`)
- **Temperature**: Response creativity (0-1)
- **Max Tokens**: Maximum response length
- **System Prompt**: Instructions for the chatbot behavior

## Usage Example

```javascript
// Frontend JavaScript
const response = await fetch('/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        message: "Tell me about your projects"
    })
});

// Handle streaming response
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');
    
    for (const line of lines) {
        if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.content === '[DONE]') {
                // Response complete
                break;
            }
            // Handle content chunk
            console.log(data.content);
        }
    }
}
```

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key (required)
- `PORT`: Server port (default: 8000)

## Development

The backend automatically reloads when you make changes to the code. The configuration file is loaded at startup, so you'll need to restart the server to see configuration changes.
