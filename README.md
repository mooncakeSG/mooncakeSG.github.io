# Professional Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer. Built with HTML5, CSS3, and JavaScript.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Built-in dark mode support with smooth transitions
- **Interactive UI**: Smooth animations and transitions for better user experience
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Performance Optimized**: Lazy loading for images and optimized assets
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Contact Form**: Integrated contact form with validation
- **Project Showcase**: Dynamic project filtering and case studies
- **Blog Section**: Latest blog posts with categories
- **Skills Timeline**: Interactive timeline showing education and experience
- **Resume Download**: Easy access to downloadable resume

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts
- Intersection Observer API
- Formspree for contact form

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mooncakeSG/mooncakeSG.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd mooncakeSG.github.io
   ```

3. Open `index.html` in your browser or use a local server.

## 📁 Project Structure

```
mooncakeSG.github.io/
├── assets/
│   ├── images/
│   │   ├── projects/
│   │   └── profile.jpg
│   └── resume.pdf
├── index.html
├── styles.css
├── script.js
└── README.md
```

## 🔧 Configuration

### Contact Form
To enable the contact form functionality:
1. Sign up for a Formspree account
2. Replace `your-formspree-id` in `script.js` with your actual Formspree form ID

### reCAPTCHA
To enable reCAPTCHA:
1. Sign up for Google reCAPTCHA
2. Replace `your-recaptcha-site-key` in `index.html` with your actual reCAPTCHA site key

## 🎨 Customization

### Colors
The website uses CSS variables for colors. You can modify them in the `:root` section of `styles.css`:

```css
:root {
    --primary: #3b82f6;
    --secondary: #64748b;
    --text-color: #1e293b;
    --bg-color: #ffffff;
    /* ... other variables ... */
}
```

### Projects
Add or modify projects in the `projects` array in `script.js`:

```javascript
this.projects = [
    {
        id: 'project-id',
        title: 'Project Title',
        category: 'web',
        // ... other project properties ...
    }
];
```

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔍 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta tags for SEO
- Open Graph tags for social sharing
- Twitter Card support
- Proper heading hierarchy
- Alt text for images

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Keawin Koesnel
- GitHub: [@mooncakeSG](https://github.com/mooncakeSG)
- LinkedIn: [Keawin Koesnel](https://linkedin.com/in/mooncakeSG)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Formspree for contact form functionality
- All contributors and supporters

---

Made with ❤️ by Keawin Koesnel
