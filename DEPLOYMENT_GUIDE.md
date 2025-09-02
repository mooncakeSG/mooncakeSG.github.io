# 🚀 Portfolio Chatbot Deployment Guide for Render

## Overview
This guide will help you deploy your Portfolio Chatbot to Render, a cloud platform that offers free hosting for web services.

## 📋 Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **Groq API Key** - Get your API key from [console.groq.com](https://console.groq.com)

## 🔧 Pre-Deployment Setup

### 1. Update Your Repository
Make sure all the new files are committed to your GitHub repository:
```bash
git add .
git commit -m "Add production deployment files for Render"
git push origin main
```

### 2. Verify File Structure
Your backend directory should contain:
```
backend/
├── main_prod.py          # Production main file
├── gunicorn.conf.py      # Gunicorn configuration
├── build.sh              # Build script
├── requirements.txt      # Production dependencies
├── config.json          # Chatbot configuration
└── .env                 # Environment variables (local only)
```

## 🌐 Deploy to Render

### Step 1: Connect GitHub Repository
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository: `mooncakeSG/mooncakeSG.github.io`

### Step 2: Configure the Service
Use these settings:

**Basic Settings:**
- **Name**: `portfolio-chatbot`
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`

**Build & Deploy:**
- **Build Command**: `chmod +x build.sh && ./build.sh`
- **Start Command**: `gunicorn main_prod:app -c gunicorn.conf.py`

### Step 3: Set Environment Variables
Click "Environment" tab and add:

| Key | Value | Description |
|-----|-------|-------------|
| `GROQ_API_KEY` | `gsk_...` | Your Groq API key |
| `PYTHON_VERSION` | `3.11.0` | Python version |

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your service
3. Wait for the build to complete (usually 5-10 minutes)

## 🔍 Post-Deployment

### 1. Test Your Service
Once deployed, test these endpoints:
- **Health Check**: `https://your-service.onrender.com/health`
- **API Info**: `https://your-service.onrender.com/`
- **Chat**: `https://your-service.onrender.com/chat`

### 2. Update Frontend URL
Update your `portfolio.html` with the correct production URL:
```javascript
const apiUrl = window.location.hostname === 'localhost' 
    ? "http://localhost:8000/chat" 
    : "https://YOUR_SERVICE_NAME.onrender.com/chat";
```

### 3. Test the Chatbot
1. Open your portfolio website
2. Try the chatbot
3. Verify it connects to the Render service

## 📊 Monitoring & Maintenance

### Health Checks
- Render automatically monitors `/health` endpoint
- Service restarts if health checks fail

### Logs
- View logs in Render dashboard
- Monitor for errors and performance issues

### Updates
- Push changes to GitHub
- Render automatically redeploys
- Monitor deployment status

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
- Check `requirements.txt` for missing dependencies
- Verify Python version compatibility
- Check build script permissions

**Runtime Errors:**
- Verify `GROQ_API_KEY` is set correctly
- Check logs for specific error messages
- Ensure `config.json` is accessible

**CORS Issues:**
- Verify CORS origins in `main_prod.py`
- Check if your domain is in allowed origins

**API Connection:**
- Test API endpoints directly
- Verify service is running
- Check network connectivity

### Debug Commands
```bash
# Test local build
cd backend
chmod +x build.sh
./build.sh

# Test production app locally
python main_prod.py

# Check environment variables
echo $GROQ_API_KEY
```

## 🔒 Security Considerations

1. **API Key Protection**: Never commit `.env` files to Git
2. **CORS Configuration**: Only allow necessary origins
3. **Rate Limiting**: Consider implementing rate limits
4. **Input Validation**: Validate all user inputs
5. **Error Handling**: Don't expose sensitive information in errors

## 📈 Scaling (Future)

When you're ready to scale:
1. **Upgrade Plan**: Move from free to paid plan
2. **Custom Domain**: Add your own domain
3. **SSL Certificate**: Enable HTTPS
4. **Load Balancing**: Add multiple instances
5. **Database**: Add persistent storage if needed

## 🎉 Success!

Once deployed, your Portfolio Chatbot will be:
- ✅ **Publicly accessible** 24/7
- ✅ **Automatically updated** when you push to GitHub
- ✅ **Monitored** for health and performance
- ✅ **Scalable** for future growth

Your chatbot is now production-ready and can serve visitors to your portfolio website from anywhere in the world!
