// ================================
// SMOOTH SCROLLING FOR NAVIGATION
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// SCROLL INDICATOR
// ================================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-indicator').style.width = scrolled + '%';
});

// ================================
// NAVIGATION BACKGROUND ON SCROLL
// ================================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(22, 22, 22, 0.95)';
    } else {
        nav.style.background = 'rgb(22, 22, 22)';
    }
});

// ================================
// FORM SUBMISSION - FORMSPREE HOITAA
// ================================
// Ei tarvita JavaScript-käsittelyä kun käytetään Formspreeta
// Lomake lähettää automaattisesti kun submit-nappia painetaan

// ================================
// MOBILE MENU FUNCTIONALITY
// ================================
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    // Animate hamburger menu
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            mobileMenu.classList.remove('active');
        }
    });
});

// ================================
// ANIMATE ELEMENTS ON SCROLL
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ================================
// HERO IMAGE ANIMATION
// ================================
function animateHeroImage() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        // Viive animaatiolle jotta sivu ehtii latautua
        setTimeout(() => {
            heroImage.classList.add('animate-in');
        }, 500); // 0.5 sekunnin viive
    }
}

// ================================
// TYPING EFFECT FOR HERO TITLE
// ================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Käynnistä kuvan animaatio
    animateHeroImage();
    
    // Käynnistä typewriter-efekti (hieman myöhemmin)
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 100);
        }
    }, 800); // Aloita kun kuva on jo liikkeessä
});

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `&copy; ${currentYear} Kari Markus. Kaikki oikeudet pidätetään.`;
});

// ================================
// DARK/LIGHT MODE TOGGLE (OPTIONAL)
// ================================
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('lightMode', isLightMode);
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('lightMode');
    if (savedTheme === 'true') {
        document.body.classList.add('light-mode');
    }
});

// ================================
// ENHANCED SKILL CARD INTERACTIONS
// ================================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ================================
// PROJECT CARD INTERACTIONS
// ================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// ================================
// PARALLAX EFFECT FOR HERO SECTION
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.02}px)`;
    }
});

// ================================
// SMOOTH REVEAL ANIMATIONS
// ================================
const revealElements = document.querySelectorAll('.section-title, .hero-content, .contact-info');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ================================
// CONSOLE MESSAGE FOR DEVELOPERS
// ================================
console.log(`
🚀 Portfolio by Kari Markus
📧 Contact: s4maka07@students.osao.fi
💼 Avoin mahdollisuuksille!

Built with: HTML5, CSS3, Vanilla JavaScript
`);

// ================================
// PERFORMANCE MONITORING
// ================================
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});