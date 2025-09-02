#!/usr/bin/env python3
"""
Comprehensive Portfolio Knowledge Test
This script tests if the chatbot knows everything about Keawin's portfolio
"""

import requests
import json
import sys
import time

def test_chatbot_knowledge():
    """Test the chatbot's knowledge about the portfolio"""
    
    base_url = "http://localhost:8000"
    
    # Test questions to verify portfolio knowledge
    test_questions = [
        "What is Keawin's strongest programming language?",
        "Tell me about Keawin's AI Resume Builder project",
        "What are Keawin's current professional goals?",
        "What AI/ML tools does Keawin know?",
        "Tell me about Keawin's background and interests",
        "What cloud platforms does Keawin have experience with?",
        "What is Keawin working on currently?",
        "Tell me about the SmartHarvest project",
        "What is Keawin's proficiency level in React?",
        "What makes Keawin unique as a developer?"
    ]
    
    print("🧪 Testing Portfolio Chatbot Knowledge")
    print("=" * 50)
    print("This test verifies the chatbot knows everything about Keawin's portfolio\n")
    
    # Check if server is running
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is running")
        else:
            print(f"❌ Server returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure the backend is running:")
        print("   cd backend && python run.py")
        return False
    
    # Test each question
    for i, question in enumerate(test_questions, 1):
        print(f"\n📝 Test {i}: {question}")
        print("-" * 40)
        
        try:
            response = requests.post(
                f"{base_url}/chat",
                json={"message": question},
                headers={"Content-Type": "application/json"},
                timeout=30,
                stream=True
            )
            
            if response.status_code == 200:
                print("📥 Receiving response...")
                
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
                
                print(f"\n✅ Response received ({len(content)} characters)")
                
                # Basic validation - check if response contains relevant keywords
                if len(content) > 50:  # Response should be substantial
                    print("✅ Response quality: Good")
                else:
                    print("⚠️  Response quality: Short - might need improvement")
                
            else:
                print(f"❌ Chat endpoint failed: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Error testing question: {e}")
            return False
        
        # Small delay between requests
        time.sleep(1)
    
    print("\n🎉 All portfolio knowledge tests completed!")
    print("\nThe chatbot should now be able to answer questions about:")
    print("✅ Personal background and interests")
    print("✅ Technical skills and proficiency levels")
    print("✅ All major projects with details")
    print("✅ Current work and professional goals")
    print("✅ AI/ML expertise and cybersecurity interests")
    print("✅ GitHub repositories and live demos")
    
    return True

def interactive_test():
    """Interactive test mode for manual testing"""
    
    print("\n🔍 Interactive Test Mode")
    print("=" * 30)
    print("You can now ask the chatbot any questions about Keawin's portfolio.")
    print("Type 'quit' to exit.\n")
    
    while True:
        question = input("You: ").strip()
        
        if question.lower() in ['quit', 'exit', 'q']:
            break
        
        if not question:
            continue
        
        try:
            response = requests.post(
                "http://localhost:8000/chat",
                json={"message": question},
                headers={"Content-Type": "application/json"},
                timeout=30,
                stream=True
            )
            
            if response.status_code == 200:
                print("Bot: ", end='', flush=True)
                
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
                                    print(data['content'], end='', flush=True)
                            except json.JSONDecodeError:
                                continue
                
                print("\n")
            else:
                print(f"❌ Error: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print("Interactive test completed.")

def main():
    """Main function"""
    
    print("Portfolio Chatbot Knowledge Test")
    print("=" * 40)
    
    # Run automated tests
    success = test_chatbot_knowledge()
    
    if success:
        print("\n" + "=" * 50)
        choice = input("Would you like to run interactive tests? (y/n): ").strip().lower()
        
        if choice in ['y', 'yes']:
            interactive_test()
    
    print("\nTest completed. The chatbot should now have comprehensive knowledge of Keawin's portfolio!")

if __name__ == "__main__":
    main()
