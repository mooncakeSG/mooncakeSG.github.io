#!/usr/bin/env bash
# Build script for Render deployment

echo "Building Portfolio Chatbot for Render..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Verify gunicorn installation
echo "Verifying gunicorn installation..."
if ! command -v gunicorn &> /dev/null; then
    echo "ERROR: gunicorn not found in PATH"
    echo "Installing gunicorn directly..."
    pip install gunicorn==21.2.0
    if ! command -v gunicorn &> /dev/null; then
        echo "ERROR: Failed to install gunicorn"
        exit 1
    fi
else
    echo "SUCCESS: gunicorn is available"
fi

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

# Test gunicorn can start the app
print('Testing gunicorn startup...')
try:
    import subprocess
    import sys
    result = subprocess.run([sys.executable, '-c', 'import gunicorn; print("gunicorn import successful")'], 
                          capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        print('SUCCESS: gunicorn can be imported')
    else:
        print(f'WARNING: gunicorn import test failed: {result.stderr}')
except Exception as e:
    print(f'WARNING: gunicorn test failed: {e}')
"

if [ $? -eq 0 ]; then
    echo "SUCCESS: Build completed successfully!"
    echo "Ready for deployment on Render"
else
    echo "ERROR: Build failed"
    exit 1
fi
