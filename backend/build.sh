#!/usr/bin/env bash
# Build script for Render deployment

echo "🚀 Building Portfolio Chatbot for Render..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Verify configuration
echo "🔍 Verifying configuration..."
if [ ! -f "config.json" ]; then
    echo "⚠️  config.json not found, using fallback configuration"
fi

# Check environment variables
echo "🔑 Checking environment variables..."
if [ -z "$GROQ_API_KEY" ]; then
    echo "❌ GROQ_API_KEY is not set"
    exit 1
else
    echo "✅ GROQ_API_KEY is configured"
fi

# Create production config if needed
echo "⚙️  Setting up production configuration..."

# Test the application
echo "🧪 Testing application startup..."
python -c "
import os
from dotenv import load_dotenv
load_dotenv()

if not os.getenv('GROQ_API_KEY'):
    print('❌ GROQ_API_KEY not found')
    exit(1)

try:
    from main_prod import app
    print('✅ Application imports successfully')
except Exception as e:
    print(f'❌ Application import failed: {e}')
    exit(1)
"

if [ $? -eq 0 ]; then
    echo "🎉 Build completed successfully!"
    echo "📋 Ready for deployment on Render"
else
    echo "❌ Build failed"
    exit 1
fi
