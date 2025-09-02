from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from groq import Groq
import os
import json
import asyncio

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(
    title="Portfolio Chatbot API",
    description="AI-powered chatbot for Keawin Koesnel's portfolio",
    version="1.0.0"
)

# CORS configuration for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mooncakeSG.github.io",
        "https://mooncakesg.github.io",
        "http://localhost:3000",
        "http://localhost:8000"
    ],
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True
)

# Validate GROQ_API_KEY before instantiating client
groq_api_key = os.environ.get("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable is required but not set. Please set it before running the application.")

try:
    client = Groq(api_key=groq_api_key)
except Exception as e:
    raise RuntimeError(f"Failed to initialize Groq client: {e}. Please check your GROQ_API_KEY configuration.")

# Load configuration
def load_config():
    try:
        with open("config.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        # Fallback configuration if config.json is not found
        return {
            "agent": {
                "name": "Portfolio Chatbot",
                "description": "AI chatbot for Keawin's portfolio",
                "model": "openai/gpt-oss-20b",
                "temperature": 0.7,
                "max_completion_tokens": 8192,
                "top_p": 1,
                "stream": True
            },
            "prompt": [
                {
                    "role": "system",
                    "content": "You are Keawin Koesnel's Portfolio AI Assistant. Answer questions about his portfolio, projects, skills, and experience professionally and accurately."
                }
            ]
        }

config = load_config()

@app.post("/chat")
async def chat(request: Request):
    """Chat endpoint for portfolio questions"""
    try:
        data = await request.json()
        user_message = data.get("message", "")
        
        if not user_message.strip():
            return StreamingResponse(
                iter([f"data: {json.dumps({'error': 'Message cannot be empty'})}\n\n"]),
                media_type="text/event-stream"
            )
        
        # Prepare messages with system prompt
        messages = [
            {"role": "system", "content": config["prompt"][0]["content"]},
            {"role": "user", "content": user_message}
        ]
        
        # Get agent configuration
        agent_config = config["agent"]
        
        def generate_response():
            try:
                completion = client.chat.completions.create(
                    model=agent_config["model"],
                    messages=messages,
                    temperature=agent_config["temperature"],
                    max_tokens=agent_config["max_completion_tokens"],
                    top_p=agent_config["top_p"],
                    stream=agent_config["stream"]
                )
                
                for chunk in completion:
                    # Defensive checks to avoid IndexError/AttributeError
                    if (isinstance(chunk.choices, list) and 
                        len(chunk.choices) > 0 and 
                        hasattr(chunk.choices[0], 'delta') and 
                        hasattr(chunk.choices[0].delta, 'content') and 
                        chunk.choices[0].delta.content):
                        yield f"data: {json.dumps({'content': chunk.choices[0].delta.content})}\n\n"
                
                # Send end signal
                yield f"data: {json.dumps({'content': '[DONE]'})}\n\n"
                
            except Exception as e:
                yield f"data: {json.dumps({'error': f'AI service error: {str(e)}'})}\n\n"
        
        return StreamingResponse(
            generate_response(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Content-Type": "text/event-stream"
            }
        )
        
    except Exception as e:
        return StreamingResponse(
            iter([f"data: {json.dumps({'error': f'Server error: {str(e)}'})}\n\n"]),
            media_type="text/event-stream"
        )

@app.get("/")
async def root():
    """Health check and API information"""
    return {
        "message": "Portfolio Chatbot API",
        "agent": config["agent"]["name"],
        "status": "healthy",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for Render"""
    return {"status": "healthy", "timestamp": asyncio.get_event_loop().time()}

@app.get("/config")
async def get_config():
    """Get current chatbot configuration"""
    return {
        "agent_name": config["agent"]["name"],
        "model": config["agent"]["model"],
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
