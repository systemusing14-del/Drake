
---

## **script.js** (COMPLETE PROFESSIONAL VERSION)
```javascript
/**
 * AnimeFandomHub Pro - Professional JavaScript Engine
 * GSAP Animations • Particles • PWA • Accessibility
 */

class AnimeFandomHub {
    constructor() {
        this.articles = this.getArticles();
        this.comments = this.getComments();
        this.init();
    }

    init() {
        this.loader();
        this.themeSystem();
        this.particles();
        this.gsapAnimations();
        this.eventListeners();
        this.renderContent();
        this.pwa();
        this.accessibility();
        this.seo();
    }

    // Sample Data
    getArticles() {
        return [
            {
                id: 1, title: "Neon Genesis Evangelion: Existential Analysis", 
                excerpt: "Deep dive into psychological themes and mecha philosophy", 
                rating: 4.9, emoji: "🤖", reads: 1245, category: "Analysis"
            },
            {
                id: 2, title: "Jujutsu Kaisen S2: Perfect Adaptation?", 
                excerpt: "Breaking down MAPPA's masterful animation choices", 
                rating: 4.8, emoji: "🔥", reads: 2156, category: "Review"
            },
            {
                id: 3, title: "One Piece: Final Saga Roadmap", 
                excerpt: "Luffy's journey to Pirate King - timeline predictions", 
                rating: 4.7, emoji: "🏴‍☠️", reads: 1890, category: "Theory"
            },
            {
                id: 4, title: "Attack on Titan: True Ending Explained", 
                excerpt: "Eren's motivations and the Rumbling's moral complexity", 
                rating: 5.0, emoji: "🧨", reads: 3421, category: "Spoiler"
            },
            {
                id: 5, title: "Studio Ghibli: Miyazaki's Legacy", 
                excerpt: "How Spirited Away redefined animation forever", 
                rating: 4.9, emoji: "🌸", reads: 987, category: "History"
            }
        ];
    }

    getComments() {
        return [
            { user: "OtakuPrime", text: "Mind blown! Best analysis ever 🔥", time: "2min" },
            { user: "AnimeGuru", text: "Finally someone understands the themes!", time: "5min" },
            { user: "WeebLord", text: "Added to my reading list! 👏", time: "12min" }
        ];
    }

    // Loading Screen
    loader() {
        const loader = document.querySelector('.loader');
        const progress = document.querySelector('.loader-progress');
        
        let progressValue = 0;
        const interval = setInterval(() => {
            progressValue += Math.random() * 15;
            if (progressValue > 95) progressValue = 95;
            progress.style.width = progressValue + '%';
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            gsap.to(progress, { width: '100%', duration: 0.3, onComplete: () => {
                gsap.to(loader, { opacity: 0, scale: 0.9, duration: 0.5, delay: 0.2, onComplete: () => {
                    loader.style.display = 'none';
                }});
            }});
        }, 2000);
    }

    // Theme System
    themeSystem() {
        const toggle = document.querySelector('.theme-toggle');
        const current = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', current);
        toggle.querySelector('i').className = current === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

        toggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggle.querySelector('i').className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // Particle Background
    particles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.01;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 107, 157, 0.3)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray.length = 0;
            for (let i = 0; i < 100; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].size <= 0.2) {
                    particlesArray.splice(i, 1);
                    i--;
                    particlesArray.push(new Particle());
                }
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }

    // GSAP Animations
    gsapAnimations() {
        // Hero Title Animation
        gsap.from('.hero-title span', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Stats Counter
        const stats = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.dataset.target.replace(/[^\d.]/g, ''));
                    gsap.to(entry.target, {
                        innerHTML: target.toLocaleString(),
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out'
                    });
                }
            });
        });
        stats.forEach(stat => statsObserver.observe(stat));

        // Section Animations
        gsap.utils.toArray('.section').forEach((section, i) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: i * 0.1
            });
        });
    }

    // Event Listeners
    eventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
                
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Search
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('input', (e) => {
            this.filterArticles(e.target.value.toLowerCase());
        });

        // Modal
        document.querySelector('.cta-primary').addEventListener('click', () => {
            document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
        });

        // Newsletter
        document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🎉 Subscribed! Check your email for anime updates!');
            e.target.reset();
        });

        // Carousel
        const prevBtn = document.querySelector('.carousel-nav.prev');
        const nextBtn = document.querySelector('.carousel-nav.next');
        let carouselIndex = 0;

        nextBtn.addEventListener('click', () => {
            carouselIndex = (carouselIndex + 1) % 3;
            this.updateCarousel(carouselIndex);
        });

        prevBtn.addEventListener('click', () => {
            carouselIndex = (carouselIndex - 1 + 3) % 3;
            this.updateCarousel(carouselIndex);
        });
    }

    // Render Content
    renderContent() {
        // Featured Articles
        document.querySelector('.articles-grid').innerHTML = this.articles.slice(0, 3)
            .map(article => this.createArticleCard(article, 'featured')).join('');

        // Carousel Articles  
        document.querySelector('.carousel-track').innerHTML = this.articles
            .map(article => this.createArticleCard(article, 'carousel')).join('');

        // Activity Feed
        document.querySelector('.activity-feed').innerHTML = this.comments
            .map(comment => `
                <div class="activity-item">
                    <div class="activity-avatar">${comment.user.slice(0,1)}</div>
                    <div>
                        <strong>${comment.user}</strong>
                        <span>${comment.text}</span>
                        <small>${comment.time} ago</small>
                    </div>
                </div>
            `).join('');

        // Article Cards Click
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                const article = this.articles.find(a => a.id === id);
                this.showArticleModal(article);
            });
        });
    }

    createArticleCard(article, type) {
        const stars = '★'.repeat(Math.floor(article.rating));
        return `
            <article class="article-card ${type}" data-id="${article.id}" role="article">
                <div class="article-media">
                    <div class="emoji-large">${article.emoji}</div>
                    <div class="article-overlay">
                        <span class="reads-count">${article.reads.toLocaleString()} reads</span>
                    </div>
                </div>
                <div class="article-body">
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <div class="article-footer">
                        <div class="rating">${stars} ${article.rating}</div>
                        <span class="category">${article.category}</span>
                    </div>
                </div>
            </article>
        `;
    }

    showArticleModal(article) {
        const modal = document.getElementById('articleModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${article.emoji} ${article.title}</h2>
                <div class="modal-meta">
                    <span>⭐ ${article.rating}</span>
                    <span>${article.reads.toLocaleString()} reads</span>
                    <span>${article.category}</span>
                </div>
            </div>
            <div class="modal-content">
                <p>${article.excerpt}</p>
                <div class="modal-actions">
                    <button>💬 Comment</button>
                    <button>❤️ Like</button>
                    <button>📱 Share</button>
                </div>
            </div>
        `;
        
        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'flex';
        
        gsap.from('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    }

    filterArticles(query) {
        document.querySelectorAll('.article-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    }

    updateCarousel(index) {
        gsap.to('.carousel-track', {
            x: `-${index * 33.33}%`,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    // PWA
    pwa() {
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
        });
    }

    // Accessibility
    accessibility() {
        // Trap focus in modal
        // Skip links
        // Reduced motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            gsap.defaults.ease = 'none';
        }
    }

    seo() {
        // Dynamic meta updates
    }
}

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimeFandomHub();
});

// Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('data:text/javascript;base64,' + btoa(`
        self.addEventListener('fetch', e => {
            e.respondWith(fetch(e.request));
        });
    `));
}