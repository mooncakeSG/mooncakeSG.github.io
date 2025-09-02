import uvicorn
import os

if __name__ == "__main__":
    # Set default port or use environment variable
    port = int(os.getenv("PORT", 8000))
    
    # Run the FastAPI server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
