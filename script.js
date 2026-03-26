// AnimeFandomHub - Complete JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample Data
    const articles = [
        {
            id: 1,
            title: "The Philosophy Behind Neon Genesis Evangelion",
            excerpt: "Exploring the existential themes and psychological depth of one of anime's most complex series.",
            rating: 4.8,
            emoji: "🤖",
            category: "Analysis",
            date: "Dec 15, 2024",
            comments: 245
        },
        {
            id: 2,
            title: "Jujutsu Kaisen: Sukuna's True Power Revealed?",
            excerpt: "Breaking down the latest manga chapters and fan theories about the King of Curses.",
            rating: 4.9,
            emoji: "👹",
            category: "Theory",
            date: "Dec 14, 2024",
            comments: 389
        },
        {
            id: 3,
            title: "Top 10 Isekai Worlds Ranked",
            excerpt: "From Re:Zero to Overlord, which fantasy world would you want to get transported to?",
            rating: 4.7,
            emoji: "⚔️",
            category: "Ranking",
            date: "Dec 13, 2024",
            comments: 156
        },
        {
            id: 4,
            title: "One Piece: The Final Saga Predictions",
            excerpt: "What lies ahead for Luffy and the Straw Hats as they approach the series finale?",
            rating: 4.9,
            emoji: "🏴‍☠️",
            category: "Prediction",
            date: "Dec 12, 2024",
            comments: 512
        },
        {
            id: 5,
            title: "Studio Ghibli's Hidden Environmental Messages",
            excerpt: "How Miyazaki's masterpieces teach us about nature and humanity.",
            rating: 4.6,
            emoji: "🌿",
            category: "Culture",
            date: "Dec 11, 2024",
            comments: 98
        }
    ];

    const comments = [
        { author: "OtakuKing", text: "This analysis blew my mind! 🔥", time: "2h ago" },
        { author: "AnimeFanatic", text: "Great points about the symbolism!", time: "4h ago" },
        { author: "WeebMaster", text: "Finally someone gets it! 🙌", time: "6h ago" }
    ];

    // DOM Elements
    const featuredContainer = document.getElementById('featuredArticles');
    const latestContainer = document.getElementById('latestArticles');
    const recentCommentsContainer = document.getElementById('recentComments');
    const articleModal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalArticleContent');
    const themeToggle = document.getElementById('themeToggle');
    const searchInput = document.getElementById('searchInput');
    const newsletterForm = document.getElementById('newsletterForm');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const closeModal = document.querySelector('.close');

    // Initialize
    renderFeaturedArticles();
    renderLatestArticles();
    renderRecentComments();
    animateStats();
    initSmoothScroll();

    // Theme Toggle
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', function() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // Render Featured Articles
    function renderFeaturedArticles() {
        featuredContainer.innerHTML = articles.slice(0, 3).map(article => createArticleCard(article, 'large')).join('');
    }

    // Render Latest Articles (Carousel)
    function renderLatestArticles() {
        latestContainer.innerHTML = articles.map(article => createArticleCard(article, 'small')).join('');
    }

    // Create Article Card
    function createArticleCard(article, size = 'large') {
        const stars = '⭐'.repeat(Math.floor(article.rating));
        return `
            <div class="article-card ${size === 'small' ? 'article-card-small' : ''}" data-article-id="${article.id}">
                <div class="article-image">${article.emoji}</div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span class="rating">
                            <span class="stars">${stars}</span>
                            <span>(${article.rating})</span>
                        </span>
                        <span>${article.comments} comments</span>
                    </div>
                    ${size === 'large' ? `<p class="article-excerpt">${article.excerpt}</p>` : ''}
                    ${size === 'large' ? '<div class="read-more">Read Full Article →</div>' : ''}
                </div>
            </div>
        `;
    }

    // Render Recent Comments
    function renderRecentComments() {
        recentCommentsContainer.innerHTML = comments.map(comment => `
            <div class="recent-comment">
                <div class="comment-author">${comment.author}</div>
                <p>${comment.text}</p>
                <small>${comment.time}</small>
            </div>
        `).join('');
    }

    // Article Modal
    featuredContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.article-card');
        if (card) {
            const articleId = parseInt(card.dataset.articleId);
            const article = articles.find(a => a.id === articleId);
            showArticleModal(article);
        }
    });

    latestContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.article-card');
        if (card) {
            const articleId = parseInt(card.dataset.articleId);
            const article = articles.find(a => a.id === articleId);
            showArticleModal(article);
        }
    });

    function showArticleModal(article) {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${article.emoji} ${article.title}</h2>
                <div class="article-meta">
                    <span>⭐ ${article.rating} (${article.comments} comments)</span>
                    <span>${article.category} • ${article.date}</span>
                </div>
            </div>
            <div class="modal-body">
                <p>${article.excerpt}</p>
                <p><strong>Full analysis coming soon...</strong></p>
                <div class="modal-actions">
                    <button class="btn-primary">👍 Like (124)</button>
                    <button class="btn-secondary">💬 Comment</button>
                    <button class="btn-login">⭐ Rate Article</button>
                </div>
            </div>
        `;
        articleModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close Modal
    closeModal.addEventListener('click', closeModalHandler);
    articleModal.addEventListener('click', function(e) {
        if (e.target === articleModal) closeModalHandler();
    });

    function closeModalHandler() {
        articleModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Search Functionality
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase();
            filterArticles(query);
        }, 300);
    });

    function filterArticles(query) {
        const cards = document.querySelectorAll('.article-card');
        cards.forEach(card => {
            const title = card.querySelector('.article-title').textContent.toLowerCase();
            card.style.display = title.includes(query) ? 'block' : 'none';
        });
    }

    // Newsletter Form
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}! 🎉\n(Newsletter feature coming soon)`);
        this.reset();
    });

    // Animate Stats
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
    }

    // Smooth Scroll Navigation
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active nav
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function() {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('mobile-open');
    });

    // Poll Animation
    function animatePoll() {
        const pollBars = document.querySelectorAll('.poll-bar');
        pollBars.forEach(bar => {
            const percent = bar.dataset.percent;
            setTimeout(() => {
                bar.style.width = percent + '%';
            }, 500);
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('.featured, .latest, .community').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Auto-animate poll on load
    setTimeout(animatePoll, 1000);

    // Window scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.scrollY;

        // Header shrink on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Parallax effect for hero
        const hero = document.querySelector('.hero');
        const scrolled = scrollTop * 0.5;
        hero.style.transform = `translateY(${scrolled}px)`;

        lastScroll = scrollTop;
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModalHandler();
        if (e.key === '/') searchInput.focus();
    });

    console.log('🎌 AnimeFandomHub loaded successfully! 🚀');
});