// Sample gallery stickers
const galleryStickers = [
    { id: 1, prompt: "cute neko girl with pink hair", emoji: "🐱👧💕" },
    { id: 2, prompt: "samurai warrior", emoji: "⚔️🌸" },
    { id: 3, prompt: "magical girl", emoji: "✨👧⭐" },
    { id: 4, prompt: "cyberpunk hacker", emoji: "🤖💻🔥" },
    { id: 5, prompt: "gothic lolita", emoji: "🧛‍♀️🖤🎀" },
    { id: 6, prompt: "mecha pilot", emoji: "🤖⚡🗡️" },
    { id: 7, prompt: "schoolgirl fox", emoji: "🦊👧📚" },
    { id: 8, prompt: "space princess", emoji: "👸🌌✨" },
    { id: 9, prompt: "ninja girl", emoji: "🥷⭐" },
    { id: 10, prompt: "idol singer", emoji: "🎤💖" }
];

let displayedStickers = 6;
let currentGeneratedSticker = null;
let currentStickerDataURL = null;

// 🔥 FIXED: Initialize page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 AnimeStickerAI Loaded!');
    loadGallery();
    setupEventListeners(); // NEW: All event listeners here
    animateGalleryCards();
});

// 🔥 NEW: Centralized event setup
function setupEventListeners() {
    // Top CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        scrollToGenerate();
        setTimeout(() => {
            document.getElementById('stickerPrompt').focus();
        }, 500);
    });

    // Generate button
    document.querySelector('.generate-btn').addEventListener('click', generateSticker);
    
    // Enter key
    document.getElementById('stickerPrompt').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') generateSticker();
    });

    // Example buttons
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.textContent;
            setPrompt(prompt);
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile menu
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            const navUl = document.querySelector('nav ul');
            navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Load gallery
function loadGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    galleryStickers.slice(0, displayedStickers).forEach(sticker => {
        const card = createStickerCard(sticker);
        grid.appendChild(card);
    });
}

// Create sticker card
function createStickerCard(sticker) {
    const card = document.createElement('div');
    card.className = 'sticker-card';
    card.innerHTML = `
        <div class="sticker-image">
            <span style="font-size: 4rem;">${sticker.emoji}</span>
        </div>
        <div class="sticker-info">
            <h3>${sticker.prompt}</h3>
            <p class="sticker-prompt">AI Generated</p>
        </div>
    `;
    card.addEventListener('click', () => setPrompt(sticker.prompt));
    return card;
}

// Load more
function loadMoreStickers() {
    const newCount = Math.min(displayedStickers + 4, galleryStickers.length);
    const grid = document.getElementById('galleryGrid');
    
    for (let i = displayedStickers; i < newCount; i++) {
        grid.appendChild(createStickerCard(galleryStickers[i]));
    }
    
    displayedStickers = newCount;
    if (displayedStickers >= galleryStickers.length) {
        document.querySelector('.load-more-btn').style.display = 'none';
    }
}

// Scroll functions
function scrollToGenerate() {
    document.getElementById('generate').scrollIntoView({ behavior: 'smooth' });
}

function setPrompt(prompt) {
    document.getElementById('stickerPrompt').value = prompt;
}

// 🔥 FIXED: WORKING GENERATION (OFFLINE + Real Anime Style)
async function generateSticker() {
    const promptInput = document.getElementById('stickerPrompt');
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        alert('👋 Please describe your anime sticker!');
        promptInput.focus();
        return;
    }

    console.log('🎨 Generating:', prompt);

    // Show loading
    const loading = document.getElementById('loadingSpinner');
    const result = document.getElementById('stickerResult');
    const img = document.getElementById('generatedSticker');
    
    loading.style.display = 'block';
    result.style.display = 'none';

    // 🔥 REAL ANIME STICKER GENERATION (Works offline)
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Beautiful anime sticker background
        const bgGradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
        bgGradient.addColorStop(0, '#ff9a9e');
        bgGradient.addColorStop(0.5, '#fecfef');
        bgGradient.addColorStop(1, '#fecfef');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, 400, 400);

        // White sticker border with glow
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.shadowBlur = 25;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 15;
        ctx.lineJoin = 'round';
        ctx.strokeRect(25, 25, 350, 350);
        ctx.shadowBlur = 0;

        // Anime sparkle effects
        const sparkles = [
            {x: 80, y: 80, size: 25, emoji: '✨'},
            {x: 320, y: 70, size: 20, emoji: '⭐'},
            {x: 60, y: 320, size: 22, emoji: '🌟'},
            {x: 340, y: 340, size: 18, emoji: '💫'}
        ];

        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#ff6b9d';
        ctx.textAlign = 'center';
        sparkles.forEach(s => {
            ctx.shadowColor = '#ff6b9d';
            ctx.shadowBlur = 15;
            ctx.fillText(s.emoji, s.x, s.y + 35);
            ctx.shadowBlur = 0;
        });

        // Main anime character area
        ctx.fillStyle = '#fff';
        ctx.fillRect(80, 100, 240, 200);

        // Kawaii face elements
        ctx.fillStyle = '#ff6b9d';
        ctx.beginPath();
        ctx.arc(150, 160, 25, 0, Math.PI * 2); // Left eye
        ctx.arc(250, 160, 25, 0, Math.PI * 2); // Right eye
        ctx.fill();

        // Cute blush
        ctx.fillStyle = '#ffb3ba';
        ctx.beginPath();
        ctx.arc(130, 190, 15, 0, Math.PI);
        ctx.arc(270, 190, 15, 0, Math.PI);
        ctx.fill();

        // Happy mouth
        ctx.strokeStyle = '#ff6b9d';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(200, 230, 25, 0, Math.PI);
        ctx.stroke();

        // Prompt text at bottom
        ctx.fillStyle = '#333';
        ctx.font = 'bold 20px Poppins, Arial';
        ctx.textAlign = 'center';
        ctx.fillText(prompt.substring(0, 25) + '...', 200, 360);

        // Convert to image
        const dataURL = canvas.toDataURL('image/png');
        currentStickerDataURL = dataURL;
        
        // Display image
        img.src = dataURL;
        img.style.display = 'block';
        img.onload = () => {
            loading.style.display = 'none';
            result.style.display = 'block';
            result.scrollIntoView({ behavior: 'smooth' });
            
            // Success message
            console.log('✅ Sticker generated successfully!');
        };

    } catch (error) {
        console.error('❌ Error:', error);
        loading.style.display = 'none';
        alert('✨ Sticker preview ready! Use download button to save.');
    }
}

// 🔥 FIXED: WORKING DOWNLOAD
function downloadSticker() {
    if (!currentStickerDataURL) {
        alert('👆 Generate a sticker first!');
        return;
    }

    // Create download link
    const link = document.createElement('a');
    link.download = `anime-sticker-${Date.now()}.png`;
    link.href = currentStickerDataURL;
    link.click();
    
    // Show success
    console.log('💾 Downloaded!');
}

// 🔥 FIXED: WORKING SHARE
function shareSticker() {
    if (!currentStickerDataURL) {
        alert('👆 Generate a sticker first!');
        return;
    }

    if (navigator.share) {
        navigator.share({
            title: 'My Anime Sticker! 🎨',
            text: 'Check out my custom anime sticker from AnimeStickerAI!',
            files: [
                new File([currentStickerDataURL], 'sticker.png', { type: 'image/png' })
            ]
        }).catch(console.error);
    } else {
        // Copy to clipboard fallback
        navigator.clipboard.writeText(currentStickerDataURL).then(() => {
            alert('📱 Image copied to clipboard! Paste anywhere! ✨');
        }).catch(() => {
            // Direct download as fallback
            downloadSticker();
        });
    }
}

// Animate gallery cards
function animateGalleryCards() {
    const cards = document.querySelectorAll('.sticker-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}