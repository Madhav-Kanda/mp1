// Portfolio Website JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initCarousel();
    initModal();
    initScrollEffects();
    initPositionIndicator();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar resizing on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Position indicator functionality
function initPositionIndicator() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 10;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Handle the case when scrolled to bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            const lastSection = sections[sections.length - 1];
            current = lastSection.getAttribute('id');
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.modal-close');
    const projectBtns = document.querySelectorAll('.btn-project');
    
    const projectData = {
        refinestat: {
            title: 'RefineStat: Efficient Exploration for Probabilistic Program Synthesis',
            description: 'Developed an innovative approach that applies validation checks at intermediate parse nodes during LLM-based code generation to ensure syntactic and semantic correctness, addressing key issues such as incorrect function parameters and version compatibility in Probabilistic Program Synthesis. Manuscript under review at ICLR\'26.',
            features: ['LLM-based Code Generation', 'Intermediate Parse Node Validation', 'Syntactic & Semantic Correctness', 'Function Parameter Validation', 'Version Compatibility', 'Probabilistic Program Synthesis'],
            technologies: ['LLM', 'Code Generation', 'Constrained Generation', 'Python', 'Program Synthesis']
        },
        dividereason: {
            title: 'Divide and Reason: Joint Image and Language Decomposition',
            description: 'Designed a multimodal, multi-agent modularized framework that enables complex visual reasoning and task-solving by leveraging specialized modality-specific agents. The system decomposes complex visual-language tasks into manageable sub-problems handled by dedicated agents.',
            features: ['Multimodal Framework', 'Multi-agent Architecture', 'Visual Reasoning', 'Task Decomposition', 'Modality-specific Agents', 'Complex Problem Solving'],
            technologies: ['VLM', 'Multi-Agent Collaboration', 'Compositional Reasoning', 'Computer Vision', 'NLP']
        },
        debugging: {
            title: 'Automatic Software Debugging using Small Language Models',
            description: 'Designed an innovative approach leveraging LLM-based function and file summarization to enhance bug localization accuracy. Currently developing a multi-patch iterative method to further optimize the program repair pipeline.',
            features: ['LLM-based Summarization', 'Bug Localization', 'Multi-patch Iteration', 'Program Repair Pipeline', 'Function Analysis', 'File-level Debugging'],
            technologies: ['LLM', 'Multi-Agent Collaboration', 'Software Engineering', 'Program Repair', 'Python']
        },
        election: {
            title: 'Real-Time Presidential Election Simulation',
            description: 'Developed a comprehensive real-time presidential election system using Kafka, Spark, and PostgreSQL. Built an interactive Streamlit app with Plotly visualizations for dynamic results. Containerized with Docker for efficient deployment.',
            features: ['Real-time Data Processing', 'Interactive Visualizations', 'Scalable Architecture', 'Container Deployment', 'Dynamic Results', 'Data Pipeline'],
            technologies: ['Kafka', 'Spark', 'PostgreSQL', 'Docker', 'Streamlit', 'Plotly']
        },
        brickkilns: {
            title: 'Scalable Identification of Brick Kilns using Satellite Imagery',
            description: 'Developed an active learning method using transfer learning to fine-tune models such as EfficientNet-B0 for brick kiln detection, reducing manual labeling to combat air pollution. Successfully identified 700+ brick kilns using this approach. Published @NeurIPS\'23 RealML.',
            features: ['Active Learning', 'Transfer Learning', 'Satellite Imagery Analysis', 'Environmental Impact', 'Automated Detection', 'Scalable Solution'],
            technologies: ['Applied ML', 'Transfer Learning', 'Computer Vision', 'EfficientNet-B0', 'Python', 'Satellite Data']
        }
    };
    
    function openModal(projectKey) {
        const project = projectData[projectKey];
        if (project) {
            modalContent.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <h4>Key Features:</h4>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <h4>Technologies Used:</h4>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            `;
            modal.classList.add('active');
        }
    }
    
    function closeModal() {
        modal.classList.remove('active');
    }
    
    // Event listeners
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
            openModal(projectKey);
        });
    });
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // Simulate form submission
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100));
    
    scrollTopBtn.addEventListener('click', scrollToTop);
});

console.log('Portfolio website loaded successfully!');
