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
// MOBILE MENU FUNCTIONALITY
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('mobile-active');
                    mobileMenu.classList.remove('active');
                }
            });
        });

        // Sulje menu kun klikataan muualle
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                    navLinks.classList.remove('mobile-active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    }
});

// ================================
// HERO IMAGE ANIMATION
// ================================
function animateHeroImage() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('animate-in');
        }, 500);
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
    animateHeroImage();
    
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 100);
        }
    }, 800);
});

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        const currentLang = localStorage.getItem('selectedLanguage') || 'fi';
        if (currentLang === 'en') {
            footer.innerHTML = `&copy; ${currentYear} Kari Markus. All rights reserved.`;
        } else {
            footer.innerHTML = `&copy; ${currentYear} Kari Markus. Kaikki oikeudet pidätetään.`;
        }
    }
});

// ================================
// LANGUAGE SWITCHER
// ================================
let currentLang = 'fi';
const originalTexts = new Map();

function saveOriginalTexts() {
    document.querySelectorAll('[data-en]').forEach(element => {
        originalTexts.set(element, element.textContent);
    });
}

function switchLanguage(lang) {
    if (lang === 'en') {
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = element.getAttribute('data-en');
        });
        document.querySelectorAll('.lang-fi').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
    } else {
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = originalTexts.get(element);
        });
        document.querySelectorAll('.lang-fi').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
    }
    
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    // Update footer
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        if (lang === 'en') {
            footer.innerHTML = `&copy; ${currentYear} Kari Markus. All rights reserved.`;
        } else {
            footer.innerHTML = `&copy; ${currentYear} Kari Markus. Kaikki oikeudet pidätetään.`;
        }
    }
    
    // Ilmoita React-komponentille kielenvaihto
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
}

document.addEventListener('DOMContentLoaded', function() {
    saveOriginalTexts();
    
    const savedLang = localStorage.getItem('selectedLanguage') || 'fi';
    if (savedLang === 'en') {
        switchLanguage('en');
    }
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});

// ================================
// CONSOLE MESSAGE FOR DEVELOPERS
// ================================
console.log(`
🚀 Portfolio by Kari Markus
📧 Contact: s4maka07@students.osao.fi
💼 Open for opportunities!

Built with: HTML5, CSS3, JavaScript & React
`);

// ================================
// PERFORMANCE MONITORING
// ================================
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});