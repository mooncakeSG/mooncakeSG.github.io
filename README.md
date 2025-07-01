# Keawin Koesnel - Personal Portfolio

A sleek, responsive portfolio website that showcases my projects, skills, and journey in tech. Built with HTML, CSS, and JavaScript, it combines clean design with sophisticated animations to create an engaging and professional experience.

## ✨ Recent Updates

- **Enhanced Animations** – Added AOS (Animate On Scroll) animations with varied effects including fade, zoom, flip, and slide transitions
- **Updated Content** – Refreshed "Concept Review & Application" section with modern JavaScript examples using Groq LLaMA API
- **Skills Consolidation** – Streamlined Technical Skills section with comprehensive skill categories and visual indicators
- **Interactive Elements** – Enhanced hover effects and smooth transitions throughout the portfolio
- **Certification Badges** – Integrated live Credly badges for professional certifications

## 🚀 Features

- **Fully Responsive** – Optimized for all devices with mobile-first design approach
- **Advanced Animations** – AOS library implementation with staggered delays and varied animation types
- **Project Showcase** – Comprehensive portfolio with personal, individual, and group projects
- **Interactive Timeline** – Visual learning journey with hover effects and detailed milestones
- **Technical Skills Display** – Progress bars and categorized skill sets with visual feedback
- **Certification Integration** – Live Credly badge embeds for verified credentials
- **Easy Contact** – Multiple contact methods with social media integration
- **Professional Resume** – Integrated HTML resume with modern styling
- **Service Worker** – PWA capabilities for enhanced performance

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+), Tailwind CSS
- **Animations**: AOS (Animate On Scroll) with custom keyframe animations
- **Icons & Fonts**: Font Awesome, Google Fonts (Inter, Poppins)
- **Performance**: Service Worker for caching and offline functionality
- **Integration**: Credly API for live certification badges

## 🎭 Animation Features

### AOS Animations Used:
- **Fade Effects**: `fade-down`, `fade-up`, `fade-left`, `fade-right`
- **Zoom Effects**: `zoom-in`, `zoom-in-left`, `zoom-in-right`
- **Flip Effects**: `flip-left`, `flip-right`, `flip-up`, `flip-down`
- **Slide Effects**: `slide-right`, `slide-left`, `slide-up`

### Custom CSS Animations:
- **Hover Effects**: Scale transforms, shadow enhancements, color transitions
- **Keyframe Animations**: `bounceIn`, `slideInFromLeft`, `slideInFromRight`, `pulse`, `float`
- **Interactive Elements**: Project cards, timeline items, skill progress bars


## 🌍 Live Demo

Check out my portfolio here: [Live Site](https://mooncakesg.github.io/)

### Featured Projects:
- **AI Resume Builder** – [Live Demo](https://groq-ai-resume-builder.netlify.app/)
- **IntelliAssist AI** – [Live Demo](https://intelliassist-ai-web-2025.fly.dev/)
- **EduBot** – AI-powered educational chatbot
- **Cybersecurity Projects** – Network analysis and security tools

## 🚀 Deployment

This site is auto-deployed using GitHub Pages. Any changes pushed to the main branch trigger automatic deployment with zero downtime.

## 📁 Project Structure

```
mooncakeSG.github.io/
├── index.html                    # Main portfolio page
├── resume.html                   # Professional resume
├── styles.css                    # Custom styles and animations
├── script.js                     # JavaScript functionality
├── sw.js                         # Service Worker for PWA
├── assets/                       # Media assets
│   └── images/                   # Project images and visuals
│       └── projects/             # Project screenshots
├── package.json                  # Dependencies and scripts
├── TODO.md                       # Development roadmap
└── README.md                     # This documentation
```

## 🎨 Customization

### Animation Configuration
Modify AOS settings in `script.js`:

```javascript
AOS.init({
    duration: 1000,        // Animation duration
    delay: 100,           // Delay before animation
    easing: 'ease-in-out', // Animation easing
    once: true            // Animation triggers once
});
```

### Add New Projects
Use this enhanced template in `index.html`:

```html
<div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
     data-aos="flip-left" data-aos-delay="200">
    <div class="aspect-w-16 aspect-h-9">
        <img src="path/to/image.jpg" alt="Project Name" 
             class="w-full h-48 object-cover transition duration-300 hover:scale-105">
    </div>
    <div class="p-6">
        <h3 class="text-xl font-bold mb-2">Project Name</h3>
        <p class="text-gray-600 mb-4">Project description...</p>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Tech Stack</span>
        </div>
        <a href="project-url" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            View Project
        </a>
    </div>
</div>
```

### Theme Customization
Update CSS custom properties:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
}
```

## 📊 Performance Features

- **Service Worker** – Caches assets for faster loading
- **Optimized Images** – Compressed and properly sized media files
- **Lazy Loading** – Images load as needed for better performance
- **Minified Assets** – Optimized CSS and JavaScript for production

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines:
- Follow existing code style and naming conventions
- Test animations across different screen sizes
- Ensure accessibility standards are maintained
- Optimize for performance and loading speed

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 👤 About Me

**Keawin Koesnel** - Aspiring Tech Professional & AI Enthusiast

- 🌟 **Interests**: AI/ML, Cybersecurity, Web Development, Tech Innovation
- 📧 **Contact**: [keawinkoesnel804@gmail.com](mailto:keawinkoesnel804@gmail.com)
- 💼 **LinkedIn**: [Keawin Calvin Koesnel](https://www.linkedin.com/in/keawin-calvin-koesnel-612715235/)
- 💻 **GitHub**: [mooncakeSG](https://github.com/mooncakeSG)

## 🙌 Acknowledgments

- **Tailwind CSS** – For responsive and modern styling
- **AOS Library** – For scroll-triggered animations
- **Font Awesome** – For comprehensive icon library
- **Google Fonts** – For beautiful typography (Inter, Poppins)
- **Credly** – For professional certification badge integration
- **GitHub Pages** – For reliable and free hosting

---

*Built with passion, purpose, and cutting-edge web technologies* ✨  
*Made with ❤️ by Keawin Koesnel* 
