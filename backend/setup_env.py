#!/usr/bin/env python3
"""
Setup script for Portfolio Chatbot Backend
This script helps configure the environment variables needed to run the chatbot
"""

import os
import sys

def setup_environment():
    """Set up environment variables for the chatbot"""
    
    print("🔧 Portfolio Chatbot Backend Setup")
    print("=" * 40)
    
    # Check if GROQ_API_KEY is already set
    if os.environ.get("GROQ_API_KEY"):
        print("✅ GROQ_API_KEY is already set")
        return True
    
    print("❌ GROQ_API_KEY environment variable is not set")
    print("\nTo set up the chatbot, you need to:")
    print("1. Get a Groq API key from https://console.groq.com/")
    print("2. Set the environment variable before running the backend")
    print("\nChoose an option:")
    print("1. Set environment variable for current session")
    print("2. Create a .env file (recommended for development)")
    print("3. Exit setup")
    
    while True:
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == "1":
            api_key = input("Enter your Groq API key: ").strip()
            if api_key:
                os.environ["GROQ_API_KEY"] = api_key
                print("✅ GROQ_API_KEY set for current session")
                print("Note: This will only work for the current terminal session")
                return True
            else:
                print("❌ API key cannot be empty")
        
        elif choice == "2":
            print("\nCreating .env file...")
            env_content = """# Groq API Key - Replace with your actual API key
GROQ_API_KEY=your_groq_api_key_here

# Backend Configuration
HOST=0.0.0.0
PORT=8000
"""
            try:
                with open(".env", "w") as f:
                    f.write(env_content)
                print("✅ .env file created successfully")
                print("Please edit the .env file and replace 'your_groq_api_key_here' with your actual API key")
                print("Then restart your terminal or run: source .env (Linux/Mac) or .env (Windows)")
                return False
            except Exception as e:
                print(f"❌ Failed to create .env file: {e}")
        
        elif choice == "3":
            print("Setup cancelled")
            return False
        
        else:
            print("Invalid choice. Please enter 1, 2, or 3")

def check_dependencies():
    """Check if all required dependencies are installed"""
    
    print("\n📦 Checking Dependencies")
    print("-" * 30)
    
    required_packages = [
        "fastapi",
        "uvicorn",
        "groq",
        "python-multipart",
        "requests"
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - not installed")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n❌ Missing packages: {', '.join(missing_packages)}")
        print("Run: pip install -r requirements.txt")
        return False
    
    print("\n✅ All dependencies are installed")
    return True

def main():
    """Main setup function"""
    
    print("Welcome to Portfolio Chatbot Backend Setup!")
    print("This script will help you configure the environment for the chatbot.\n")
    
    # Check dependencies
    deps_ok = check_dependencies()
    
    # Setup environment
    env_ok = setup_environment()
    
    if deps_ok and env_ok:
        print("\n🎉 Setup complete! You can now run the backend:")
        print("python main.py")
    elif deps_ok:
        print("\n⚠️  Setup partially complete. Please configure your API key and try again.")
    else:
        print("\n❌ Setup incomplete. Please install missing dependencies and try again.")
    
    print("\nFor more help, see CHATBOT_INTEGRATION.md")

if __name__ == "__main__":
    main()
