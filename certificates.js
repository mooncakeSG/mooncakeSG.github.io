/*
 * CERTIFICATE TITLES CUSTOMIZATION
 * 
 * The certificate titles below are examples based on common Coursera and Microsoft Learn courses.
 * To customize them to match your actual certificates:
 * 
 * 1. Open each PDF certificate to see the actual course name
 * 2. Update the 'title' field for each certificate below
 * 3. Update the 'description' field to match the actual course content
 * 4. Save the file and refresh the certificates page
 * 
 * Example:
 * title: 'Python for Everybody Specialization' → title: 'Your Actual Course Name'
 * description: 'Complete Python programming...' → description: 'Your actual course description'
 */

// Certificate data with proper categorization and descriptions
const certificates = [
    // Microsoft Learn Certificates
    {
        id: 'microsoft-5447',
        title: 'Describe Azure compute and networking services',
        issuer: 'Microsoft Learn',
        category: 'microsoft',
        filename: 'Achievements - keawincalvinkoesnel-5447 _ Microsoft Learn.pdf',
        description: 'Comprehensive understanding of Azure compute services, virtual machines, and networking infrastructure',
        icon: 'fab fa-microsoft',
        color: '#00bcf2'
    },
    {
        id: 'microsoft-5448',
        title: 'Power Platform Fundamentals Describe the core architectural components of Azure',
        issuer: 'Microsoft Learn',
        category: 'microsoft',
        filename: 'Achievements - keawincalvinkoesnel-5448 _ Microsoft Learn.pdf',
        description: 'Core Azure architectural components, Power Platform fundamentals, and cloud infrastructure design',
        icon: 'fab fa-microsoft',
        color: '#00bcf2'
    },
    {
        id: 'microsoft-5449',
        title: 'Introduction to Zero Trust and best practice frameworks',
        issuer: 'Microsoft Learn',
        category: 'microsoft',
        filename: 'Achievements - keawincalvinkoesnel-5449 _ Microsoft Learn.pdf',
        description: 'Zero Trust security model, cybersecurity frameworks, and modern security best practices',
        icon: 'fab fa-microsoft',
        color: '#00bcf2'
    },
    
    // Coursera Certificates - Programming and Development
    {
        id: 'coursera-1H1FSYMRMTDR',
        title: 'Python for Everybody Specialization',
        issuer: 'Coursera',
        category: 'coursera',
        filename: 'Coursera 1H1FSYMRMTDR.pdf',
        description: 'Complete Python programming course covering fundamentals to advanced concepts',
        icon: 'fab fa-python',
        color: '#0056d3'
    },
    {
        id: 'coursera-1P7UVLI8HS9P',
        title: 'Preparations for Job Interviews',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera 1P7UVLI8HS9P.pdf',
        description: 'Professional interview preparation, resume building, and career development strategies',
        icon: 'fas fa-briefcase',
        color: '#0056d3'
    },
    {
        id: 'coursera-4SDKATX4L2U1',
        title: 'Technical Support Fundamentals',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'sfia-service-operations',
        filename: 'Coursera 4SDKATX4L2U1.pdf',
        description: 'IT support fundamentals, troubleshooting techniques, and customer service skills',
        icon: 'fas fa-headset',
        color: '#0056d3'
    },
    {
        id: 'coursera-59BKC6ZJ75FS',
        title: 'AI for Everyone',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera 59BKC6ZJ75FS.pdf',
        description: 'Introduction to artificial intelligence concepts and applications for non-technical professionals',
        icon: 'fas fa-robot',
        color: '#0056d3'
    },
    {
        id: 'coursera-9KVJAWOUH1PH',
        title: 'Trustworthy Generative AI',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera 9KVJAWOUH1PH.pdf',
        description: 'Ethical AI development, bias mitigation, and responsible generative AI practices',
        icon: 'fas fa-shield-alt',
        color: '#0056d3'
    },
    {
        id: 'coursera-C00REN3SIEUC',
        title: 'Introduction into Generative AI',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera C00REN3SIEUC.pdf',
        description: 'Fundamentals of generative AI, large language models, and AI-powered content creation',
        icon: 'fas fa-magic',
        color: '#0056d3'
    },
    {
        id: 'coursera-CBJDB25HKPMM',
        title: 'Active Listening: Enhancing Communication Skills',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera CBJDB25HKPMM.pdf',
        description: 'Advanced communication skills, active listening techniques, and interpersonal effectiveness',
        icon: 'fas fa-comments',
        color: '#0056d3'
    },
    {
        id: 'coursera-ERZHT637SZ65',
        title: 'Work Smarter, Not Harder: Time Management for Personal & Professional Productivity',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera ERZHT637SZ65.pdf',
        description: 'Productivity strategies, time management techniques, and work-life balance optimization',
        icon: 'fas fa-clock',
        color: '#0056d3'
    },
    {
        id: 'coursera-FS39S7AFF3NJ',
        title: 'Verbal Communications and Presentation Skills',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera FS39S7AFF3NJ.pdf',
        description: 'Public speaking, presentation design, and professional verbal communication skills',
        icon: 'fas fa-microphone',
        color: '#0056d3'
    },
    {
        id: 'coursera-IUT9RQUBDNVN',
        title: 'Psychology of the Self',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera IUT9RQUBDNVN.pdf',
        description: 'Self-awareness, personal development, and psychological insights for professional growth',
        icon: 'fas fa-brain',
        color: '#0056d3'
    },
    {
        id: 'coursera-J99NRCXTH9GT',
        title: 'Developing Interpersonal Skills',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera J99NRCXTH9GT.pdf',
        description: 'Building relationships, teamwork, and effective interpersonal communication in professional settings',
        icon: 'fas fa-users',
        color: '#0056d3'
    },
    {
        id: 'coursera-L917H0T7LYZF',
        title: 'Operating Systems and You: Becoming a Power User',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'sfia-service-operations',
        filename: 'Coursera L917H0T7LYZF.pdf',
        description: 'Advanced operating system concepts, system administration, and power user techniques',
        icon: 'fas fa-desktop',
        color: '#0056d3'
    },
    {
        id: 'coursera-ME2X4FG5GAQ1',
        title: 'Introduction to Responsible AI',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera ME2X4FG5GAQ1.pdf',
        description: 'Ethical AI principles, responsible development practices, and AI governance frameworks',
        icon: 'fas fa-balance-scale',
        color: '#0056d3'
    },
    {
        id: 'coursera-OM48HCV07UCW',
        title: 'Accelerate Your Job Search with AI',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'sfia-service-operations',
        filename: 'Coursera OM48HCV07UCW.pdf',
        description: 'AI-powered job search strategies, resume optimization, and career advancement tools',
        icon: 'fas fa-search',
        color: '#0056d3'
    },
    {
        id: 'coursera-ON9IVI1CZ105',
        title: 'AI Foundations: Prompt Engineering with ChatGPT',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera ON9IVI1CZ105.pdf',
        description: 'Advanced prompt engineering techniques, ChatGPT optimization, and AI interaction strategies',
        icon: 'fas fa-keyboard',
        color: '#0056d3'
    },
    {
        id: 'coursera-OOFAUG77P6B0',
        title: 'Managing Conflicts with Cultural and Emotional Intelligence',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera OOFAUG77P6B0.pdf',
        description: 'Conflict resolution, cultural sensitivity, and emotional intelligence in professional environments',
        icon: 'fas fa-handshake',
        color: '#0056d3'
    },
    {
        id: 'coursera-RHZZNQ9UH59G',
        title: 'Introduction to Personal Branding',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera RHZZNQ9UH59G.pdf',
        description: 'Personal brand development, professional identity, and career positioning strategies',
        icon: 'fas fa-user-tie',
        color: '#0056d3'
    },
    {
        id: 'coursera-RSF9D3CXDMQN',
        title: 'Write Professional Emails in English',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera RSF9D3CXDMQN.pdf',
        description: 'Professional email writing, business communication, and English language proficiency',
        icon: 'fas fa-envelope',
        color: '#0056d3'
    },
    {
        id: 'coursera-T5DSJJNQ33PH',
        title: 'Machine Learning Basics',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera T5DSJJNQ33PH.pdf',
        description: 'Introduction to machine learning algorithms, data analysis, and predictive modeling',
        icon: 'fas fa-chart-line',
        color: '#0056d3'
    },
    {
        id: 'coursera-TH9GJJXQ73KA',
        title: 'Introduction to Artificial Intelligence (AI)',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera TH9GJJXQ73KA.pdf',
        description: 'Comprehensive introduction to AI concepts, applications, and future implications',
        icon: 'fas fa-brain',
        color: '#0056d3'
    },
    {
        id: 'coursera-TW712EN0JV0N',
        title: 'Emotional Intelligence',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera TW712EN0JV0N.pdf',
        description: 'Emotional intelligence development, self-awareness, and relationship management skills',
        icon: 'fas fa-heart',
        color: '#0056d3'
    },
    {
        id: 'coursera-WO1NLMZ9B4PC',
        title: 'The Bits and Bytes of Computer Networking', 
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'sfia-service-operations',
        filename: 'Coursera WO1NLMZ9B4PC.pdf',
        description: 'Computer networking fundamentals, protocols, and network infrastructure understanding',
        icon: 'fas fa-network-wired',
        color: '#0056d3'
    },
    {
        id: 'coursera-WW2VM7A0KMAY',
        title: 'System Administration and IT Infrastructure Services',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'sfia-service-operations',
        filename: 'Coursera WW2VM7A0KMAY.pdf',
        description: 'IT infrastructure management, system administration, and service delivery optimization',
        icon: 'fas fa-server',
        color: '#0056d3'
    },
    {
        id: 'coursera-XL7M6XRC43DO',
        title: 'Finding Your Professional Voice: Confidence & Impact',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera XL7M6XRC43DO.pdf',
        description: 'Professional confidence building, leadership presence, and impactful communication',
        icon: 'fas fa-bullhorn',
        color: '#0056d3'
    },
    {
        id: 'coursera-XVIKGR7Q09AI',
        title: 'Financial Planning for Young Adults', 
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'professional-development',
        filename: 'Coursera XVIKGR7Q09AI.pdf',
        description: 'Personal finance management, investment basics, and financial planning strategies',
        icon: 'fas fa-piggy-bank',
        color: '#0056d3'
    },
    {
        id: 'coursera-Y6R90ZH0BL3A',
        title: 'IT Security: Defense against the digital dark arts',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'sfia-service-operations',
        filename: 'Coursera Y6R90ZH0BL3A.pdf',
        description: 'Cybersecurity fundamentals, threat protection, and information security best practices',
        icon: 'fas fa-shield-alt',
        color: '#0056d3'
    },
    {
        id: 'coursera-ZNKJFSCCIF42',
        title: 'AI Essentials',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera ZNKJFSCCIF42.pdf',
        description: 'Essential AI concepts, practical applications, and foundational artificial intelligence knowledge',
        icon: 'fas fa-cogs',
        color: '#0056d3'
    },
    {
        id: 'coursera-ZWHZX7TEC9YH',
        title: 'Generative AI with Large Language Models',
        issuer: 'Coursera',
        category: 'coursera',
        subcategory: 'ai-bootcamp',
        filename: 'Coursera ZWHZX7TEC9YH.pdf',
        description: 'Advanced generative AI, large language model development, and AI-powered content generation',
        icon: 'fas fa-rocket',
        color: '#0056d3'
    }
];

// Certificate Manager Class
class CertificateManager {
    constructor() {
        this.currentFilter = 'all';
        this.certificates = certificates;
        this.init();
    }

    init() {
        this.renderCertificates();
        this.setupEventListeners();
        this.updateStats();
        this.updateFolderCovers('all'); // Initialize folder covers
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
                this.updateFilterButtons(e.target);
                this.updateFolderCovers(e.target.dataset.filter);
            });
        });

        // Folder covers
        const folderCovers = document.querySelectorAll('.folder-cover');
        folderCovers.forEach(cover => {
            cover.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setFilter(filter);
                this.updateFilterButtons(document.querySelector(`[data-filter="${filter}"]`));
                this.updateFolderCovers(filter);
            });
        });

        // Subfolder covers
        const subfolderCovers = document.querySelectorAll('.subfolder-cover');
        subfolderCovers.forEach(cover => {
            cover.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setFilter(filter);
                this.updateFilterButtons(document.querySelector(`[data-filter="${filter}"]`));
                this.updateFolderCovers(filter);
            });
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.renderCertificates();
        this.updateSectionTitle(filter);
    }

    updateSectionTitle(filter) {
        const sectionTitle = document.getElementById('section-title');
        const sectionSubtitle = document.getElementById('section-subtitle');
        
        if (!sectionTitle || !sectionSubtitle) return;
        
        switch(filter) {
            case 'microsoft':
                sectionTitle.textContent = 'Microsoft Learn Certificates';
                sectionSubtitle.textContent = 'Microsoft cloud and productivity certifications';
                break;
            case 'coursera':
                sectionTitle.textContent = 'Coursera Certificates';
                sectionSubtitle.textContent = 'Professional development and technical skills';
                break;
            case 'professional-development':
                sectionTitle.textContent = 'Professional Development Certificates';
                sectionSubtitle.textContent = 'Communication, leadership, and career development skills';
                break;
            case 'ai-bootcamp':
                sectionTitle.textContent = 'AI Bootcamp Certificates';
                sectionSubtitle.textContent = 'Artificial intelligence, machine learning, and generative AI skills';
                break;
            case 'sfia-service-operations':
                sectionTitle.textContent = 'SFIA Service Operations Practitioner Certificates';
                sectionSubtitle.textContent = 'IT support, service operations, and technical infrastructure skills';
                break;
            default:
                sectionTitle.textContent = 'All Certificates';
                sectionSubtitle.textContent = 'Browse through your professional achievements and certifications';
        }
    }

    updateFilterButtons(activeButton) {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn === activeButton) {
                btn.classList.add('active');
            }
        });
    }

    getFilteredCertificates() {
        if (this.currentFilter === 'all') {
            return this.certificates;
        }
        if (this.currentFilter === 'professional-development') {
            return this.certificates.filter(cert => cert.subcategory === 'professional-development');
        }
        if (this.currentFilter === 'ai-bootcamp') {
            return this.certificates.filter(cert => cert.subcategory === 'ai-bootcamp');
        }
        if (this.currentFilter === 'sfia-service-operations') {
            return this.certificates.filter(cert => cert.subcategory === 'sfia-service-operations');
        }
        return this.certificates.filter(cert => cert.category === this.currentFilter);
    }

    renderCertificates() {
        const grid = document.getElementById('certificates-grid');
        const filteredCerts = this.getFilteredCertificates();
        
        grid.innerHTML = '';
        
        filteredCerts.forEach((cert, index) => {
            const card = this.createCertificateCard(cert, index);
            grid.appendChild(card);
        });
    }

    createCertificateCard(cert, index) {
        const column = document.createElement('div');
        column.className = 'column is-one-third-desktop is-half-tablet';
        column.setAttribute('data-aos', 'fade-up');
        column.setAttribute('data-aos-delay', index * 100);

        column.innerHTML = `
            <div class="certificate-card" title="File: ${cert.filename}">
                <div class="certificate-preview" style="background: linear-gradient(135deg, ${cert.color} 0%, ${this.darkenColor(cert.color, 20)} 100%);">
                    <i class="${cert.icon}"></i>
                </div>
                <div class="certificate-info">
                    <h3 class="certificate-title" title="${cert.filename}">${cert.title}</h3>
                    <p class="certificate-issuer">
                        <i class="${cert.icon}"></i> ${cert.issuer}
                    </p>
                    <p class="has-text-grey">${cert.description}</p>
                    <div class="certificate-actions">
                        <button class="btn-certificate btn-view" onclick="certificateManager.viewCertificate('${cert.id}')" title="View ${cert.filename}">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn-certificate btn-download" onclick="certificateManager.downloadCertificate('${cert.id}')" title="Download ${cert.filename}">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `;

        return column;
    }

    viewCertificate(certId) {
        const cert = this.certificates.find(c => c.id === certId);
        if (!cert) return;

        const modal = document.getElementById('pdf-modal');
        const title = document.getElementById('modal-title');
        const viewer = document.getElementById('pdf-viewer');
        const downloadLink = document.getElementById('download-link');

        title.textContent = cert.title;
        viewer.src = `Certificates/${cert.filename}`;
        downloadLink.href = `Certificates/${cert.filename}`;
        downloadLink.download = cert.filename;

        modal.classList.add('is-active');
        document.body.classList.add('is-clipped');
    }

    downloadCertificate(certId) {
        const cert = this.certificates.find(c => c.id === certId);
        if (!cert) return;

        const link = document.createElement('a');
        link.href = `Certificates/${cert.filename}`;
        link.download = cert.filename;
        link.click();
    }

    updateStats() {
        const total = this.certificates.length;
        const microsoft = this.certificates.filter(c => c.category === 'microsoft').length;
        const coursera = this.certificates.filter(c => c.category === 'coursera').length;
        const professionalDev = this.certificates.filter(c => c.subcategory === 'professional-development').length;
        const aiBootcamp = this.certificates.filter(c => c.subcategory === 'ai-bootcamp').length;
        const sfiaServiceOperations = this.certificates.filter(c => c.subcategory === 'sfia-service-operations').length;

        document.getElementById('total-certificates').textContent = total;
        document.getElementById('microsoft-certificates').textContent = microsoft;
        document.getElementById('coursera-certificates').textContent = coursera;
        
        // Update folder counts
        const microsoftCount = document.getElementById('microsoft-count');
        const courseraCount = document.getElementById('coursera-count');
        const professionalDevCount = document.getElementById('professional-dev-count');
        const aiBootcampCount = document.getElementById('ai-bootcamp-count');
        const sfiaServiceOperationsCount = document.getElementById('sfia-service-operations-count');
        
        if (microsoftCount) {
            microsoftCount.textContent = `${microsoft} Certificate${microsoft !== 1 ? 's' : ''}`;
        }
        if (courseraCount) {
            courseraCount.textContent = `${coursera} Certificate${coursera !== 1 ? 's' : ''}`;
        }
        if (professionalDevCount) {
            professionalDevCount.textContent = `${professionalDev} Certificate${professionalDev !== 1 ? 's' : ''}`;
        }
        if (aiBootcampCount) {
            aiBootcampCount.textContent = `${aiBootcamp} Certificate${aiBootcamp !== 1 ? 's' : ''}`;
        }
        if (sfiaServiceOperationsCount) {
            sfiaServiceOperationsCount.textContent = `${sfiaServiceOperations} Certificate${sfiaServiceOperations !== 1 ? 's' : ''}`;
        }
    }

    updateFolderCovers(activeFilter) {
        const folderCovers = document.querySelectorAll('.folder-cover');
        const subfolderCovers = document.querySelectorAll('.subfolder-cover');
        
        folderCovers.forEach(cover => {
            const filter = cover.dataset.filter;
            if (activeFilter === 'all' || activeFilter === filter) {
                cover.classList.add('active');
            } else {
                cover.classList.remove('active');
            }
        });
        
        subfolderCovers.forEach(cover => {
            const filter = cover.dataset.filter;
            if (activeFilter === filter) {
                cover.classList.add('active');
            } else {
                cover.classList.remove('active');
            }
        });
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}

// Modal functions
function closeModal() {
    const modal = document.getElementById('pdf-modal');
    const viewer = document.getElementById('pdf-viewer');
    
    modal.classList.remove('is-active');
    document.body.classList.remove('is-clipped');
    viewer.src = '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.certificateManager = new CertificateManager();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
