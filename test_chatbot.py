#!/usr/bin/env python3
"""
Test script for the Portfolio Chatbot backend
Run this to verify the chatbot is working correctly
"""

import requests
import json
import sys

def test_chatbot():
    """Test the chatbot endpoint"""
    
    # Test configuration
    base_url = "http://localhost:8000"
    test_message = "Tell me about your portfolio projects"
    
    print("🧪 Testing Portfolio Chatbot Backend")
    print("=" * 50)
    
    # Test 1: Check if server is running
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        if response.status_code == 200:
            print("✅ Server is running")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Server returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure the backend is running:")
        print("   cd backend && python main.py")
        return False
    except Exception as e:
        print(f"❌ Error connecting to server: {e}")
        return False
    
    # Test 2: Check configuration
    try:
        response = requests.get(f"{base_url}/config", timeout=5)
        if response.status_code == 200:
            config = response.json()
            print("✅ Configuration loaded successfully")
            print(f"   Agent: {config['agent']['name']}")
            print(f"   Model: {config['agent']['model']}")
        else:
            print(f"❌ Failed to load configuration: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error loading configuration: {e}")
        return False
    
    # Test 3: Test chat endpoint
    try:
        print(f"\n📤 Sending test message: '{test_message}'")
        
        response = requests.post(
            f"{base_url}/chat",
            json={"message": test_message},
            headers={"Content-Type": "application/json"},
            timeout=30,
            stream=True
        )
        
        if response.status_code == 200:
            print("✅ Chat endpoint working")
            print("📥 Receiving streaming response...")
            
            # Process streaming response
            content = ""
            for line in response.iter_lines():
                if line:
                    line_str = line.decode('utf-8')
                    if line_str.startswith('data: '):
                        try:
                            data = json.loads(line_str[6:])
                            if data.get('content') == '[DONE]':
                                break
                            elif data.get('content'):
                                content += data['content']
                                print(f"   {data['content']}", end='', flush=True)
                        except json.JSONDecodeError:
                            continue
            
            print(f"\n\n✅ Complete response received ({len(content)} characters)")
            
        else:
            print(f"❌ Chat endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing chat endpoint: {e}")
        return False
    
    print("\n🎉 All tests passed! The chatbot is working correctly.")
    print("\nTo use the chatbot:")
    print("1. Open portfolio.html in your browser")
    print("2. Click the floating 'Chat' button or 'Try Chatbot' button")
    print("3. Start chatting with the AI!")
    
    return True

if __name__ == "__main__":
    success = test_chatbot()
    sys.exit(0 if success else 1)
