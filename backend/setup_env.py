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
    print("1. Set environment variable for current session only")
    print("2. Create a .env file (recommended for development)")
    print("3. Exit setup")
    
    while True:
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == "1":
            api_key = input("Enter your Groq API key: ").strip()
            if api_key:
                os.environ["GROQ_API_KEY"] = api_key
                print("✅ GROQ_API_KEY set for current session only")
                print("⚠️  IMPORTANT: This only affects the current terminal process")
                print("   To make it persistent, add to your shell profile:")
                print("   - Linux/Mac: export GROQ_API_KEY='your_key_here' >> ~/.bashrc")
                print("   - Windows: setx GROQ_API_KEY 'your_key_here'")
                print("   - Or restart this script and choose option 2 to create a .env file")
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
                print("\n📝 Next steps:")
                print("1. Edit the .env file and replace 'your_groq_api_key_here' with your actual API key")
                print("2. The backend will automatically load this file using python-dotenv")
                print("3. No need to 'source .env' - just restart your backend server")
                print("\n💡 Tip: python-dotenv is already included in requirements.txt")
                print("   The backend will automatically load environment variables from .env")
                return False
            except Exception as e:
                print(f"❌ Failed to create .env file: {e}")
                print("   Make sure you have write permissions in the current directory")
        
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
        "requests",
        "python-dotenv"
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace("-", "_"))
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - not installed")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n❌ Missing packages: {', '.join(missing_packages)}")
        print("Run: pip install -r requirements.txt")
        return False
    
    print("\n✅ All dependencies are installed")
    print("   python-dotenv is available for automatic .env loading")
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
        print("   cd backend && python main_prod.py")
        print("\n💡 The backend will automatically load your .env file if it exists")
    elif deps_ok:
        print("\n⚠️  Setup partially complete. Please configure your API key and try again.")
        print("\n📝 To complete setup:")
        print("1. Edit the .env file with your actual API key")
        print("2. Run: cd backend && python main_prod.py")
    else:
        print("\n❌ Setup incomplete. Please install missing dependencies and try again.")
        print("   Run: pip install -r requirements.txt")
    
    print("\nFor more help, see CHATBOT_INTEGRATION.md")

if __name__ == "__main__":
    main()
