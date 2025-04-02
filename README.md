# Personal Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and professional journey. Built with HTML5, CSS3, and JavaScript, featuring a clean design and smooth animations.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive UI**: Smooth animations and transitions
- **Project Showcase**: Detailed sections for projects, skills, and experience
- **Learning Journey**: Timeline-based display of educational and professional growth
- **Contact Integration**: Easy ways to connect through social media and email

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (ES6+)
- Bulma CSS Framework
- AOS (Animate On Scroll) Library
- Font Awesome Icons
- Google Fonts

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/mooncakeSG/mooncakeSG.github.io.git
```

2. Navigate to the project directory:
```bash
cd mooncakeSG.github.io
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

## 🚀 Deployment

This portfolio is deployed using GitHub Pages:

- **Live Demo**: [https://mooncakesg.github.io/](https://mooncakesg.github.io/)
- **Repository**: [https://github.com/mooncakeSG/mooncakeSG.github.io](https://github.com/mooncakeSG/mooncakeSG.github.io)

### Deployment Process

1. The website is automatically deployed through GitHub Pages
2. Any push to the main branch triggers a new deployment
3. GitHub Pages serves the static files from the root directory

## 📝 Project Structure

```
mooncakeSG.github.io/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── assets/            # Images and other assets
│   └── images/        # Project images
└── README.md          # Project documentation
```

## 🔧 Customization

### Theme Colors
The website uses CSS variables for easy theme customization. Edit the following in `styles.css`:

```css
:root {
    --primary: #2C3E50;    /* Deep navy for base */
    --secondary: #1ABC9C;  /* Turquoise for accents */
    --accent: #E74C3C;     /* Coral for highlights */
    /* ... other variables ... */
}
```

### Adding New Projects
To add a new project, copy the project card template in `index.html`:

```html
<div class="card project-card">
    <div class="card-image">
        <figure class="image is-4by3">
            <img src="path/to/image.jpg" alt="Project Name">
        </figure>
    </div>
    <div class="card-content">
        <h3 class="title is-4">Project Name</h3>
        <p class="subtitle is-6">Category</p>
        <div class="content">
            <p>Project description...</p>
            <div class="tags mt-3">
                <span class="tag is-info">Technology1</span>
                <span class="tag is-info">Technology2</span>
            </div>
        </div>
    </div>
</div>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

- **Keawin Koesnel**
  - LinkedIn: [Keawin Koesnel](https://www.linkedin.com/in/keawin-calvin-koesnel-612715235/)
  - GitHub: [mooncakeSG](https://github.com/mooncakeSG)
  - Email: Keawinkoesnel804@gmail.com

## 🙏 Acknowledgments

- [Bulma CSS](https://bulma.io/) for the CSS framework
- [AOS Library](https://michalsnik.github.io/aos/) for scroll animations
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
