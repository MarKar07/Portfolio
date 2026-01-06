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
    }
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
    const currentYear = new Date().getFullYear();
    const currentLang = localStorage.getItem('selectedLanguage') || 'fi';
    if (currentLang === 'en') {
        footer.innerHTML = `&copy; ${currentYear} Kari Markus. All rights reserved.`;
    } else {
        footer.innerHTML = `&copy; ${currentYear} Kari Markus. Kaikki oikeudet pidätetään.`;
    }
});

// ================================
// ENHANCED SKILL CARD INTERACTIONS
// ================================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ================================
// SIMPLE LANGUAGE SWITCHER
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
    } else {
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = originalTexts.get(element);
        });
    }
    
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    // Update footer year text
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    if (lang === 'en') {
        footer.innerHTML = `&copy; ${currentYear} Kari Markus. All rights reserved.`;
    } else {
        footer.innerHTML = `&copy; ${currentYear} Kari Markus. Kaikki oikeudet pidätetään.`;
    }
    
    // Päivitä GitHub-tilastot uudella kielellä
    if (typeof fetchGitHubStats === 'function') {
        fetchGitHubStats();
    }
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
// PROJECT MODAL FUNCTIONALITY
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech');
    const modalLinks = document.getElementById('modal-links');
    const modalClose = document.querySelector('.modal-close');

    // Get current language
    function getLang() {
        return localStorage.getItem('selectedLanguage') || 'fi';
    }

    // Open modal
    function openModal(card) {
        const lang = getLang();
        
        // Get title
        const title = lang === 'en' ? card.dataset.titleEn : card.dataset.title;
        modalTitle.textContent = title;
        
        // Get description (convert \n\n to line breaks)
        const desc = lang === 'en' ? card.dataset.descEn : card.dataset.desc;
        modalDesc.innerHTML = desc.replace(/\n\n/g, '<br><br>');
        
        // Get technologies
        const tech = card.dataset.tech;
        const techLabel = lang === 'en' ? 'Technologies:' : 'Teknologiat:';
        modalTech.innerHTML = `<strong>${techLabel}</strong> ${tech}`;
        
        // Get links
        modalLinks.innerHTML = '';
        
        if (card.dataset.link1) {
            const link1Text = lang === 'en' ? card.dataset.link1TextEn : card.dataset.link1Text;
            const link1 = document.createElement('a');
            link1.href = card.dataset.link1;
            link1.className = 'btn';
            link1.target = '_blank';
            link1.rel = 'noopener noreferrer';
            link1.textContent = link1Text;
            modalLinks.appendChild(link1);
        }
        
        if (card.dataset.link2) {
            const link2Text = lang === 'en' ? card.dataset.link2TextEn : card.dataset.link2Text;
            const link2 = document.createElement('a');
            link2.href = card.dataset.link2;
            link2.className = 'btn btn-secondary';
            link2.target = '_blank';
            link2.rel = 'noopener noreferrer';
            link2.textContent = link2Text;
            modalLinks.appendChild(link2);
        }
        
        // Show modal with animation
        modal.style.display = 'flex';
        // Trigger reflow for animation
        modal.offsetHeight;
        modal.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
        document.body.style.overflow = '';
    }

    // Event listeners for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        // Click on card or read more button
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on external link inside card
            if (e.target.closest('a')) return;
            // Don't open modal for GitHub stats card
            if (this.classList.contains('github-stats-card')) return;
            openModal(this);
        });
    });

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// ================================
// GITHUB STATS API
// ================================
async function fetchGitHubStats() {
    const statsContainer = document.getElementById('github-stats');
    const githubCard = document.getElementById('github-stats-card');
    
    if (!statsContainer) return;
    
    const lang = localStorage.getItem('selectedLanguage') || 'fi';
    
    try {
        // Hae käyttäjätiedot
        const userResponse = await fetch('https://api.github.com/users/MarKar07');
        if (!userResponse.ok) throw new Error('API error');
        const userData = await userResponse.json();
        
        // Hae repositoriot kielitilastoja varten
        const reposResponse = await fetch('https://api.github.com/users/MarKar07/repos?per_page=100&sort=updated');
        if (!reposResponse.ok) throw new Error('API error');
        const reposData = await reposResponse.json();
        
        // Laske kielet
        const languages = {};
        reposData.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        // Järjestä kielet suosituimmuuden mukaan
        const sortedLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([lang]) => lang);
        
        // Laske viimeisin päivitys
        const lastUpdate = new Date(userData.updated_at);
        const now = new Date();
        const diffDays = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
        
        let lastUpdateText;
        if (lang === 'en') {
            if (diffDays === 0) lastUpdateText = 'Today';
            else if (diffDays === 1) lastUpdateText = 'Yesterday';
            else lastUpdateText = `${diffDays} days ago`;
        } else {
            if (diffDays === 0) lastUpdateText = 'Tänään';
            else if (diffDays === 1) lastUpdateText = 'Eilen';
            else lastUpdateText = `${diffDays} päivää sitten`;
        }
        
        // Luo HTML (horisontaalinen layout)
        const reposLabel = lang === 'en' ? 'Repos' : 'Repot';
        const followersLabel = lang === 'en' ? 'Followers' : 'Seuraajat';
        const followingLabel = lang === 'en' ? 'Following' : 'Seurataan';
        const updatedLabel = lang === 'en' ? 'Active' : 'Aktiivinen';
        const languagesLabel = lang === 'en' ? 'Languages:' : 'Kielet:';
        
        statsContainer.innerHTML = `
            <div class="github-stats-grid">
                <div class="github-stat-item">
                    <i class="fas fa-folder"></i>
                    ${reposLabel}: <span>${userData.public_repos}</span>
                </div>
                <div class="github-stat-item">
                    <i class="fas fa-users"></i>
                    ${followersLabel}: <span>${userData.followers}</span>
                </div>
                <div class="github-stat-item">
                    <i class="fas fa-user-plus"></i>
                    ${followingLabel}: <span>${userData.following}</span>
                </div>
                <div class="github-stat-item">
                    <i class="fas fa-clock"></i>
                    ${updatedLabel}: <span>${lastUpdateText}</span>
                </div>
                <div class="github-languages">
                    <span class="github-languages-title">${languagesLabel}</span>
                    <div class="github-languages-list">
                        ${sortedLanguages.map(lang => `<span class="github-lang-tag">${lang}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Poista modal-klikkaus GitHub-kortilta
        if (githubCard) {
            githubCard.style.cursor = 'default';
        }
        
    } catch (error) {
        console.error('GitHub API error:', error);
        const errorText = lang === 'en' 
            ? 'Could not load stats' 
            : 'Tilastoja ei voitu ladata';
        statsContainer.innerHTML = `<p class="github-error"><i class="fas fa-exclamation-circle"></i> ${errorText}</p>`;
    }
}

// Kutsu GitHub-funktio sivun latautuessa
document.addEventListener('DOMContentLoaded', fetchGitHubStats);

// Päivitä GitHub-tilastot kun kieli vaihtuu
const originalSwitchLanguage = typeof switchLanguage === 'function' ? switchLanguage : null;

// ================================
// CONSOLE MESSAGE FOR DEVELOPERS
// ================================
console.log(`
🚀 Portfolio by Kari Markus
📧 Contact: s4maka07@students.osao.fi
💼 Open for opportunities!

Built with: HTML5, CSS3, Vanilla JavaScript
`);

// ================================
// PERFORMANCE MONITORING
// ================================
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});