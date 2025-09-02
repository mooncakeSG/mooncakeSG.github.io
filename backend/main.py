from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from groq import Groq
import os
import json
import asyncio

# Try to load environment variables from .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # python-dotenv is optional

app = FastAPI()

# Allow your GitHub Pages frontend and local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mooncakeSG.github.io", "http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
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
    with open("config.json", "r") as f:
        return json.load(f)

config = load_config()

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    
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
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingResponse(
        generate_response(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/event-stream"
        }
    )

@app.get("/")
async def root():
    return {"message": "Portfolio Chatbot API", "agent": config["agent"]["name"]}

@app.get("/config")
async def get_config():
    return config

