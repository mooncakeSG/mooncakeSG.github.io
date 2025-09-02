# Portfolio Chatbot Integration

## Overview
The Portfolio Chatbot has been successfully integrated into the portfolio website with a floating chat window interface. Users can now interact with an AI-powered chatbot that answers questions about Keawin's portfolio, projects, and skills.

## Features

### 1. Portfolio Chatbot Card
- **Location**: Projects section of the portfolio
- **Image**: Portfolio chatbot icon
- **Description**: AI chatbot built with Groq OSS 20B
- **Tags**: Groq OSS, AI, Python, Web Integration
- **Buttons**: 
  - "Try Chatbot" - Opens the floating chat window
  - "Learn More" - Links to Groq's website

### 2. Floating Chat Window
- **Position**: Bottom-right corner of the page
- **Toggle**: Floating "Chat" button with robot icon
- **Window Size**: 350px width, 500px max height
- **Features**:
  - Professional header with chatbot title
  - Scrollable chat area
  - Input field with send button
  - Responsive design with smooth animations

### 3. Chat Functionality
- **Real-time Streaming**: Uses Server-Sent Events (SSE) for live responses
- **Message Styling**: User messages (blue, right-aligned) and bot messages (gray, left-aligned)
- **Welcome Message**: Friendly introduction when chat is first opened
- **Error Handling**: Graceful fallback for connection issues

## Technical Implementation

### Frontend (portfolio.html)
- **HTML**: Floating chat window with proper z-index and positioning
- **CSS**: Custom styling with hover effects, animations, and responsive design
- **JavaScript**: Complete chat functionality with SSE handling

### Backend (backend/main.py)
- **API Endpoint**: `/chat` POST endpoint for processing messages
- **Streaming**: Server-Sent Events with proper MIME type (`text/event-stream`)
- **AI Integration**: Groq OSS 20B model for intelligent responses
- **Error Handling**: Defensive checks and proper exception handling

### Configuration (backend/config.json)
- **Model**: `openai/gpt-oss-20b`
- **System Prompt**: Portfolio-focused chatbot instructions
- **Parameters**: Optimized for conversational AI responses

## Usage Instructions

### For Users
1. **Open Chat**: Click the floating "Chat" button or the "Try Chatbot" button on the Portfolio Chatbot card
2. **Type Message**: Enter your question in the input field
3. **Send**: Press Enter or click the Send button
4. **View Response**: Watch the AI generate a real-time response
5. **Close**: Click the Chat button again to hide the window

### For Developers
1. **Backend Setup**: Ensure `GROQ_API_KEY` environment variable is set
2. **Run Backend**: `cd backend && python main.py`
3. **Test Integration**: Open portfolio.html and test the chat functionality
4. **Customize**: Modify config.json for different AI behaviors

## API Endpoints

### POST /chat
- **Purpose**: Process user messages and return AI responses
- **Request Body**: `{"message": "user question"}`
- **Response**: Server-Sent Events stream with AI responses
- **Content-Type**: `text/event-stream`

### GET /
- **Purpose**: API status and agent information
- **Response**: Basic API information

### GET /config
- **Purpose**: Retrieve current chatbot configuration
- **Response**: JSON configuration object

## Security Features
- **API Key Validation**: Prevents startup without proper configuration
- **CORS Protection**: Restricted to authorized origins
- **Input Validation**: Sanitized message processing
- **Error Handling**: No sensitive information leakage

## Browser Compatibility
- **Modern Browsers**: Full support for SSE and modern JavaScript
- **Mobile**: Responsive design for mobile devices
- **Fallbacks**: Graceful degradation for older browsers

## Troubleshooting

### Common Issues
1. **Chat not opening**: Check browser console for JavaScript errors
2. **No responses**: Verify backend is running and API key is set
3. **CORS errors**: Ensure backend CORS settings include your domain
4. **Streaming issues**: Check if browser supports Server-Sent Events

### Debug Steps
1. Open browser developer tools
2. Check Console tab for error messages
3. Verify Network tab shows successful API calls
4. Test backend endpoints directly

## Future Enhancements
- **Chat History**: Persistent conversation storage
- **File Uploads**: Support for document sharing
- **Voice Input**: Speech-to-text integration
- **Multi-language**: Internationalization support
- **Analytics**: Usage tracking and insights

## Support
For technical issues or questions about the chatbot integration, refer to the backend logs and browser console for detailed error information.
