// DOM Elements
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const generateBtn = document.getElementById('generateBtn');
const shareBtn = document.getElementById('shareBtn');
const categorySelect = document.getElementById('categorySelect');
const quotesGenerated = document.getElementById('quotesGenerated');
const currentCategory = document.getElementById('currentCategory');
const quoteCard = document.getElementById('quoteCard');

// State
let quoteCount = 0;
let currentQuote = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    updateCategoryDisplay();
    
    // Add event listeners
    generateBtn.addEventListener('click', generateQuote);
    shareBtn.addEventListener('click', shareQuote);
    categorySelect.addEventListener('change', () => {
        updateCategoryDisplay();
        generateQuote();
    });
});

// Generate Quote Function
async function generateQuote() {
    const category = categorySelect.value;
    
    // Add loading state
    quoteCard.classList.add('loading');
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Loading...';
    
    try {
        const response = await fetch(`/api/quotes/random?category=${category}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const quote = await response.json();
        currentQuote = quote;
        
        // Animate quote change
        quoteCard.style.opacity = '0';
        quoteCard.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            quoteText.textContent = quote.text;
            quoteAuthor.textContent = `- ${quote.author}`;
            
            quoteCard.style.opacity = '1';
            quoteCard.style.transform = 'scale(1)';
            quoteCard.style.transition = 'all 0.5s ease';
            
            // Update stats
            quoteCount++;
            quotesGenerated.textContent = quoteCount;
            
            // Add celebration effect
            if (quoteCount % 5 === 0) {
                celebrateQuote();
            }
        }, 300);
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteText.textContent = 'Oops! Failed to load quote. Please try again.';
        quoteAuthor.textContent = '- Error';
    } finally {
        // Remove loading state
        quoteCard.classList.remove('loading');
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span class="btn-icon">🎲</span> Generate Quote';
    }
}

// Share Quote Function
function shareQuote() {
    if (!currentQuote) {
        alert('Generate a quote first!');
        return;
    }
    
    const shareText = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    // Try native share API first (mobile)
    if (navigator.share) {
        navigator.share({
            title: 'Motivational Quote',
            text: shareText,
            url: window.location.href
        })
        .then(() => {
            showNotification('Quote shared successfully! 🎉');
        })
        .catch((error) => {
            if (error.name !== 'AbortError') {
                copyToClipboard(shareText);
            }
        });
    } else {
        // Fallback to clipboard
        copyToClipboard(shareText);
    }
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showNotification('Quote copied to clipboard! 📋');
        })
        .catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showNotification('Quote copied to clipboard! 📋');
            } catch (err) {
                showNotification('Failed to copy quote');
            }
            
            document.body.removeChild(textArea);
        });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update Category Display
function updateCategoryDisplay() {
    const category = categorySelect.value;
    const categoryText = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
    currentCategory.textContent = categoryText;
}

// Celebration Effect
function celebrateQuote() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 50);
    }
}

// Create Confetti
function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        top: 50%;
        left: 50%;
        opacity: 1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
    `;
    
    document.body.appendChild(confetti);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let x = 0;
    let y = 0;
    let opacity = 1;
    
    const animate = () => {
        x += vx;
        y += vy + 2;
        opacity -= 0.02;
        
        confetti.style.transform = `translate(${x}px, ${y}px)`;
        confetti.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    };
    
    animate();
}

// Create Particles Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${duration}s ${delay}s infinite ease-in-out;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-40px) translateX(-10px);
                opacity: 0.8;
            }
            75% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'G' or Space to generate quote
    if (e.key === 'g' || e.key === 'G' || e.key === ' ') {
        e.preventDefault();
        generateQuote();
    }
    
    // Press 'S' to share
    if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        shareQuote();
    }
});