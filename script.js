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
// THEME TOGGLE (dark / light)
// ================================
(function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function syncIcon() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
    syncIcon();

    btn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        syncIcon();
    });
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

// Initialize animations when page loads
window.addEventListener('load', () => {
    animateHeroImage();
});

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = `&copy; ${new Date().getFullYear()} Kari Markus`;
    }
});

// ================================
// LANGUAGE SWITCHER
// ================================
let currentLang = 'fi';
const originalTexts = new Map();

function saveOriginalTexts() {
    document.querySelectorAll('[data-en]').forEach(element => {
        if (!element.querySelector('*')) {
            originalTexts.set(element, element.textContent);
        }
    });
}

function switchLanguage(lang) {
    if (lang === 'en') {
        document.querySelectorAll('[data-en]').forEach(element => {
            // Skip elements that contain child elements (e.g. buttons with icons)
            if (!element.querySelector('*')) {
                element.textContent = element.getAttribute('data-en');
            }
        });
        document.querySelectorAll('.lang-fi').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
    } else {
        document.querySelectorAll('[data-en]').forEach(element => {
            if (!element.querySelector('*') && originalTexts.has(element)) {
                element.textContent = originalTexts.get(element);
            }
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

    // Update footer year
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = `&copy; ${new Date().getFullYear()} Kari Markus`;
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
// SCROLL SPY — nav + left lines active state
// ================================
(function () {
    const sections = ['home', 'skills', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-links a');

    function onScroll() {
        let current = 'home';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 120) current = id;
        });

        navLinks.forEach(a => {
            const href = a.getAttribute('href').replace('#', '');
            a.classList.toggle('active', href === current);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ================================
// FLIP CARDS
// ================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
});

// ================================
// PROJECT MODALS
// ================================
const projectData = {
    wordpress: {
        title: 'WordPress-harjoittelu',
        titleEn: 'WordPress Internship',
        tech: ['WordPress', 'Divi', 'Astra', 'Spectra', 'LiteSpeed Cache', 'Complianz', 'TranslatePress'],
        images: ['images/Testi.png', 'images/bee.jpg', 'images/armour.jpg'],
        desc: 'Kahden kuukauden työharjoittelu ohjelmistokehitysyrityksessä Oulussa (marraskuu\u2013joulukuu 2025). Työskentelin kuuden asiakassivuston parissa ja pääsin syventymään WordPress-kehityksen arkeen kaikessa monimuotoisuudessaan.\n\nPäivittäiseen työhöni kuului responsiivinen hienosäätö: globaalien headereiden ja footereiden yhtenäistäminen, elementtien asettelu eri näkymissä, marginaalien ja paddingien viilaus sekä mobiilinäkymien optimointi.\n\nToteutin GDPR-kokonaisuuksia alusta loppuun: tietosuojaselosteet, evästehallinta Complianz-lisäosalla ja lomakkeiden suostumuscheckboxit. Optimoin sivustojen suorituskykyä LiteSpeed Cachella: yhdellä sivustolla mobiilipisteet nousivat 75:stä 95:een.\n\nMerkittävin haaste oli neljä vuotta vanhan Divi-teeman päivitys. Siirsin sivuston staging-ympäristöön, päivitin teeman ja linkitin child-teeman uudelleen. Lopputulos: toimiva sivusto, yli 30 % parannus suorituskykyyn.',
        descEn: 'A two-month internship at a software development company in Oulu (November\u2013December 2025). I worked on six client websites and gained hands-on experience in the diverse realities of WordPress development.\n\nMy daily work included responsive fine-tuning: harmonizing global headers and footers, positioning elements across different views, and optimizing mobile layouts.\n\nI implemented complete GDPR solutions from scratch: privacy policies, cookie management with the Complianz plugin, and consent checkboxes for forms. I optimized site performance using LiteSpeed Cache: on one site, mobile scores improved from 75 to 95.\n\nThe most significant challenge was updating a four-year-old Divi theme. I moved the site to staging, updated the theme, and relinked the child theme. The result: a working website and over 30% improvement in performance.',
        linkedin: 'https://www.linkedin.com/posts/kari-markus_wordpress-webkehitys-harjoittelu-activity-7414569068185440257-R1T2'
    },
    thunderstorm: {
        title: 'Thunderstorm Rock Festival',
        titleEn: 'Thunderstorm Rock Festival',
        tech: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
        images: ['images/etusivu.png', 'images/admin.jpg', 'images/S\u00e4hk\u00f6posti.png', 'images/tietokanta.png'],
        desc: 'Kattava full-stack verkkosovellus rock-festivaalin tapahtumienhallintajärjestelmäksi.\n\nSisältää turvallisen käyttäjien autentikoinnin bcrypt-salasanasalauksella, kattavan admin-dashboardin käyttäjien ja tapahtumailmoittautumisten hallintaan, dynaamisen tapahtumailmoittautumisjärjestelmän kolmella lipputyypillä sekä palautelomakkeen admin-palautehallinnan kanssa.\n\nTietoturvaominaisuudet: CSRF-suojaus kaikissa lomakkeissa, rate limiting kirjautumiselle/rekisteröinnille/yhteydenotolle, XSS-suojaus syötteiden sanitoinnilla ja prepared statements SQL-injektioiden estoon.\n\nTietokantarakenne sisältää users-, profiles-, event_registrations- ja feedback-taulut asianmukaisin relaatioin.',
        descEn: 'Comprehensive full-stack web application for a rock festival event management system.\n\nFeatures secure user authentication with bcrypt password hashing, comprehensive admin dashboard for managing users and event registrations, dynamic event registration system with three ticket types, and a contact form with admin feedback management.\n\nSecurity features: CSRF protection on all forms, rate limiting for login/registration/contact, XSS protection with input sanitization, and prepared statements for SQL injection prevention.\n\nDatabase structure includes users, profiles, event_registrations, and feedback tables with proper relationships.',
        live: 'https://geronimo.okol.org/~markar/Tapahtumasivut/',
        github: 'https://github.com/MarKar07/Thunderstorm'
    },
    linnaseikkailu: {
        title: 'Linnaseikkailu',
        titleEn: 'Castle Adventure',
        tech: ['C#', 'Windows Forms', '.NET Framework'],
        images: ['images/textadventure.jpg', 'images/luuranko.jpg', 'images/vuo.jpg'],
        desc: 'Graafinen tekstiseikkailupeli Windows Forms -teknologialla. Pelaaja tutkii vanhaa linnaa, kerää esineitä ja kultaa, ja yrittää paeta.\n\nPelissä on tallennusjärjestelmä tiedostoon, inventaariojärjestelmä, useita huoneita kuvilla ja interaktiivinen tarinankerronta.\n\nOlio-ohjelmoinnin periaatteet: Player-, Item- ja Game-luokat. Tiedostonkäsittely StreamWriter/StreamReader-luokilla.\n\nToteutettu C#-kielellä ja .NET Framework 4.8:lla.',
        descEn: 'A graphical text adventure game built with Windows Forms technology. The player explores an old castle, collects items and gold, and tries to escape.\n\nFeatures include save/load system to file, inventory management, multiple rooms with images, and interactive storytelling.\n\nObject-oriented programming principles: Player, Item, and Game classes. File handling with StreamWriter/StreamReader classes.\n\nBuilt with C# and .NET Framework 4.8.',
        github: 'https://github.com/MarKar07/CSharpForms'
    },
    portfolio: {
        title: 'Portfolio-sivusto',
        titleEn: 'Portfolio Website',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Formspree'],
        images: ['images/N\u00e4ytt\u00f6kuva 2026-01-10 194258.jpg', 'images/taidot.jpg'],
        desc: 'Moderni ja responsiivinen henkilökohtainen portfolio-sivusto. Rakennettu HTML5:llä, CSS3:lla ja vanilla JavaScriptillä.\n\nSisältää kaksikielisen tuen (suomi/englanti), interaktiiviset flip-kortit taidoille, masonry-tyylisen projektinäkymän eri kokoisilla korteilla, kuvagallerian modaaleissa sekä live GitHub-tilastot API-integraatiolla.\n\nYhteydenottolomake Formspree-integraatiolla.',
        descEn: 'Modern and responsive personal portfolio website. Built with HTML5, CSS3, and vanilla JavaScript.\n\nFeatures bilingual support (Finnish/English), interactive flip cards for skills, a masonry-style project grid with varying card sizes, image galleries in modals, and live GitHub stats with API integration.\n\nContact form integrated with Formspree.',
        live: 'https://markar07.github.io/Portfolio/',
        github: 'https://github.com/MarKar07/Portfolio/'
    },
    maalaus: {
        title: 'Maalausyrityksen sivusto',
        titleEn: 'Painting Company Website',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap'],
        images: ['images/N\u00e4ytt\u00f6kuva 2025-06-05 173938.png', 'images/v\u00e4rit.jpg'],
        desc: 'Kattava näyttötyöprojekti maalaus- ja tapetointiyritykselle.\n\nSisältää responsiivisen navigoinnin hampurilaisvalikolla, Bootstrap-karusellikuvagallerian ja interaktiivisen väritestaustyökalun jQueryllä ja SVG-manipulaatiolla.\n\nPalvelukortit palveluiden esittelyyn, yhteydenottolomake Google Maps -integraatiolla ja mobiilioptimoitu suunnittelu.',
        descEn: 'Comprehensive website demonstration project for a painting and wallpapering company.\n\nFeatures responsive navigation with hamburger menu, Bootstrap carousel image gallery, and interactive color testing tool with jQuery and SVG manipulation.\n\nService cards showcasing offerings, contact form with Google Maps integration, and mobile-optimized design.',
        live: 'https://markar07.github.io/Nayttotyo/',
        github: 'https://github.com/MarKar07/Nayttotyo'
    }
};

let currentImages = [];
let currentImageIndex = 0;

function openModal(projectId) {
    const lang = localStorage.getItem('selectedLanguage') || 'fi';
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = lang === 'en' ? data.titleEn : data.title;
    document.getElementById('modal-desc').textContent = lang === 'en' ? data.descEn : data.desc;

    const badges = document.getElementById('modal-badges');
    badges.innerHTML = data.tech.map(t => `<span class="badge">${t}</span>`).join('');

    currentImages = data.images || [];
    currentImageIndex = 0;
    const gallery = document.getElementById('modal-gallery');
    const thumbs = document.getElementById('modal-thumbs');
    if (currentImages.length > 0) {
        gallery.style.display = 'block';
        document.getElementById('modal-main-img').src = currentImages[0];
        document.getElementById('modal-main-img').alt = data.title;
        document.getElementById('gallery-prev').style.display = currentImages.length > 1 ? 'flex' : 'none';
        document.getElementById('gallery-next').style.display = currentImages.length > 1 ? 'flex' : 'none';
        thumbs.innerHTML = currentImages.map((src, i) =>
            `<img src="${src}" alt="" class="${i === 0 ? 'active' : ''}" data-idx="${i}">`
        ).join('');
        thumbs.style.display = currentImages.length > 1 ? 'flex' : 'none';
    } else {
        gallery.style.display = 'none';
        thumbs.innerHTML = '';
    }

    const links = document.getElementById('modal-links');
    const linkDefs = [
        { key: 'live',     icon: 'fas fa-external-link-alt', label: 'Live' },
        { key: 'github',   icon: 'fab fa-github',            label: 'GitHub' },
        { key: 'linkedin', icon: 'fab fa-linkedin',          label: 'LinkedIn' }
    ];
    links.innerHTML = linkDefs
        .filter(def => data[def.key])
        .map(def => `<a href="${data[def.key]}" target="_blank" rel="noopener noreferrer" class="btn-link"><i class="${def.icon}"></i> ${def.label}</a>`)
        .join('');

    const modal = document.getElementById('project-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = '';
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + currentImages.length) % currentImages.length;
    document.getElementById('modal-main-img').src = currentImages[currentImageIndex];
    document.querySelectorAll('#modal-thumbs img').forEach((img, i) => {
        img.classList.toggle('active', i === currentImageIndex);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-project]').forEach(el => {
        el.addEventListener('click', e => {
            const id = el.dataset.project;
            if (id) openModal(id);
        });
    });

    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            openModal(btn.dataset.project);
        });
    });

    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('project-modal').addEventListener('click', e => {
        if (e.target === document.getElementById('project-modal')) closeModal();
    });
    document.getElementById('gallery-prev').addEventListener('click', () => changeImage(-1));
    document.getElementById('gallery-next').addEventListener('click', () => changeImage(1));
    document.getElementById('modal-thumbs').addEventListener('click', e => {
        const img = e.target.closest('img');
        if (img) {
            currentImageIndex = parseInt(img.dataset.idx);
            document.getElementById('modal-main-img').src = currentImages[currentImageIndex];
            document.querySelectorAll('#modal-thumbs img').forEach((t, i) => t.classList.toggle('active', i === currentImageIndex));
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
        if (document.getElementById('project-modal').style.display === 'flex') {
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
        }
    });
});

// ================================
// GITHUB STATS
// ================================
async function loadGithubStats() {
    try {
        const res = await fetch('https://api.github.com/users/MarKar07');
        if (!res.ok) return;
        const data = await res.json();
        const reposEl = document.getElementById('gh-repos');
        const starsEl = document.getElementById('gh-stars');
        const followersEl = document.getElementById('gh-followers');
        if (reposEl) reposEl.textContent = data.public_repos ?? '—';
        if (followersEl) followersEl.textContent = data.followers ?? '—';

        if (starsEl) {
            const reposRes = await fetch('https://api.github.com/users/MarKar07/repos?per_page=100');
            if (reposRes.ok) {
                const repos = await reposRes.json();
                const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
                starsEl.textContent = stars;
            }
        }
    } catch (_) {}
}

document.addEventListener('DOMContentLoaded', loadGithubStats);

// ================================
// CONSOLE MESSAGE FOR DEVELOPERS
// ================================
console.log(`
Portfolio by Kari Markus
Contact: karikmarkus@gmail.com
Built with: HTML5, CSS3, JavaScript
`);

// ================================
// PERFORMANCE MONITORING
// ================================
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('Page loaded in ' + loadTime + 'ms');
});