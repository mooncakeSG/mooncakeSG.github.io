from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from groq import Groq
import os
import json
import asyncio

app = FastAPI()

# Allow your GitHub Pages frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mooncakeSG.github.io"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

client = Groq()  # Reads GROQ_API_KEY from env

# Load configuration
def load_config():
    with open("backend/config.json", "r") as f:
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
                if chunk.choices[0].delta.content:
                    yield f"data: {json.dumps({'content': chunk.choices[0].delta.content})}\n\n"
            
            # Send end signal
            yield f"data: {json.dumps({'content': '[DONE]'})}\n\n"
            
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingResponse(
        generate_response(),
        media_type="text/plain",
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

