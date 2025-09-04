#!/usr/bin/env bash
# Build script for Render deployment

echo "Building Portfolio Chatbot for Render..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Verify uvicorn installation
echo "Verifying uvicorn installation..."
python -c "import uvicorn; print('SUCCESS: uvicorn is available')" || {
    echo "ERROR: uvicorn not available"
    exit 1
}

# Verify configuration
echo "Verifying configuration..."
if [ ! -f "config.json" ]; then
    echo "WARNING: config.json not found, using fallback configuration"
fi

# Check environment variables
echo "Checking environment variables..."
if [ -z "$GROQ_API_KEY" ]; then
    echo "ERROR: GROQ_API_KEY is not set"
    exit 1
else
    echo "SUCCESS: GROQ_API_KEY is configured"
fi

# Create production config if needed
echo "Setting up production configuration..."

# Test the application
echo "Testing application startup..."
python -c "
import os
import sys

# Try to import dotenv, handle missing dependency gracefully
try:
    from dotenv import load_dotenv
    load_dotenv()
    print('SUCCESS: python-dotenv loaded successfully')
except ImportError:
    print('WARNING: python-dotenv not installed; environment variables must be provided by the environment')
    print('   Continuing without .env file support...')

if not os.getenv('GROQ_API_KEY'):
    print('ERROR: GROQ_API_KEY not found')
    sys.exit(1)

try:
    from main_prod import app
    print('SUCCESS: Application imports successfully')
except Exception as e:
    print(f'ERROR: Application import failed: {e}')
    sys.exit(1)

# Test uvicorn can start the app
print('Testing uvicorn startup...')
try:
    import uvicorn
    print('SUCCESS: uvicorn can be imported')
except Exception as e:
    print(f'WARNING: uvicorn import test failed: {e}')
"

if [ $? -eq 0 ]; then
    echo "SUCCESS: Build completed successfully!"
    echo "Ready for deployment on Render"
else
    echo "ERROR: Build failed"
    exit 1
fi
