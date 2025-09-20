// Navigation functionality
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');

// Handle scroll effect on navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        menuIcon.className = 'fas fa-times';
    } else {
        menuIcon.className = 'fas fa-bars';
    }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        mobileNav.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    }
}

// Add click event listeners to all navigation links
document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            scrollToSection(href.substring(1));
        }
    });
});

// Animate skill progress bars when they come into view
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Reset all skill bars to 0 width initially
    skillCards.forEach(card => {
        const skillBar = card.querySelector('.skill-progress');
        const percentageSpan = card.querySelector('.skill-percentage');
        skillBar.style.width = '0%';
        percentageSpan.textContent = '0%';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCard = entry.target;
                const skillBar = skillCard.querySelector('.skill-progress');
                const percentageSpan = skillCard.querySelector('.skill-percentage');
                const targetWidth = skillBar.getAttribute('data-width');
                
                // Add a slight delay for staggered animation
                const skillCards = Array.from(document.querySelectorAll('.skill-card'));
                const delay = skillCards.indexOf(skillCard) * 200;
                
                setTimeout(() => {
                    // Animate the skill bar
                    skillBar.style.width = targetWidth + '%';
                    
                    // Animate the percentage counter
                    animateCounter(percentageSpan, 0, parseInt(targetWidth), 1000);
                }, delay);
                
                // Remove observer after animation to prevent re-triggering
                observer.unobserve(skillCard);
            }
        });
    }, { threshold: 0.3 });
    
    skillCards.forEach(card => observer.observe(card));
}

// Animate percentage counter
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + '%';
        }
    }
    
    requestAnimationFrame(update);
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// WhatsApp contact function
function openWhatsApp(number) {
    const message = encodeURIComponent("Hi Abdullah! I'm interested in your web development services. Can we discuss my project?");
    const whatsappUrl = `https://wa.me/92${number.substring(1)}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Email contact function
function openEmail(email) {
    const subject = encodeURIComponent("Web Development Inquiry");
    const body = encodeURIComponent("Hi Abdullah,\n\nI'm interested in your web development services. Please let me know your availability for a consultation.\n\nBest regards");
    const emailUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(emailUrl, '_blank');
}

// Staggered animation delays for timeline items
function setAnimationDelays() {
    // Skills animation delays
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Timeline animation delays
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Projects animation delays
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Contact cards animation delays
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Parallax effect for floating icons
function parallaxEffect() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingIcons.forEach(icon => {
            icon.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Active navigation link highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add typing effect to hero title
function typingEffect() {
    const heroName = document.querySelector('.hero-name');
    const text = 'Abdullah Awais';
    let index = 0;
    
    // Clear existing text
    heroName.textContent = '';
    
    function typeWriter() {
        if (index < text.length) {
            heroName.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateOnScroll();
    setAnimationDelays();
    parallaxEffect();
    highlightActiveSection();
    // typingEffect(); // Uncomment if you want the typing effect
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth >= 768) {
        mobileNav.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    }
});

// Add smooth scroll behavior for browsers that don't support it natively
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animation and section animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    animateSectionsOnLoad();
});

// Animate all sections on page load with staggered effect
function animateSectionsOnLoad() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Add initial animation class
        section.classList.add('page-load-animation');
        
        // Trigger animation with staggered delay
        setTimeout(() => {
            section.classList.add('loaded');
        }, index * 200);
    });
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Scroll-dependent functions here
}, 10);