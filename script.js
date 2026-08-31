const loginBtn = document.getElementById('login-btn');
const nameInput = document.getElementById('name-input');
const loginView = document.getElementById('login-view');
const successView = document.getElementById('success-view');
const rejectView = document.getElementById('reject-view');
const errorMessage = document.getElementById('error-message');
const heartsContainer = document.getElementById('hearts-container');

// Preload sound effects to reduce latency
const successAudio = new Audio('sound-effect.mp3');
successAudio.preload = 'auto';

const wrongAudio = new Audio('angry-monkey.mp3');
wrongAudio.preload = 'auto';

loginBtn.addEventListener('click', handleLogin);
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});

function handleLogin() {
    const name = nameInput.value.trim().toLowerCase();
    
    if (!name) {
        errorMessage.textContent = "Please enter a name first!";
        errorMessage.classList.add('visible');
        return;
    }
    
    errorMessage.classList.remove('visible');
    
    // Animate button
    loginBtn.style.transform = 'scale(0.95)';
    setTimeout(() => { loginBtn.style.transform = ''; }, 150);
    
    // Switch Views
    loginView.classList.remove('active');
    
    setTimeout(() => {
        if (name === 'tauhid') {
            document.body.style.background = 'linear-gradient(to right, #1f001f, #4a0033, #1f001f)';
            successView.classList.add('active');
            startInfiniteHearts();
            successAudio.currentTime = 0;
            successAudio.play().catch(e => console.error("Audio play failed:", e));
        } else {
            // Scary red theme
            document.body.style.background = '#0a0000'; 
            rejectView.classList.add('active');
            wrongAudio.currentTime = 0;
            wrongAudio.play().catch(e => console.error("Audio play failed:", e));
        }
    }, 500);
}

function startInfiniteHearts() {
    const hearts = ['❤️', '💖', '💘', '💝', '💕', '💗', '💓', '💞', '✨'];
    
    // Optimize for mobile by reducing animation count
    const isMobile = window.innerWidth < 768;
    const burstCount = isMobile ? 10 : 20;
    const intervalTime = isMobile ? 350 : 150;
    
    // Create a burst initially
    for(let i=0; i<burstCount; i++) {
        setTimeout(createHeart, Math.random() * 500);
    }
    
    // Then continuous flow
    setInterval(createHeart, intervalTime);
}

function createHeart() {
    const hearts = ['❤️', '💖', '💘', '💝', '💕', '💗', '💓', '💞'];
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random heart symbol
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration between 3s and 7s
    const duration = (Math.random() * 4 + 3);
    heart.style.animationDuration = duration + 's';
    
    // Random size
    heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
    
    // Random sway (custom property for advanced animation, but we'll use rotate in CSS)
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation ends to prevent DOM clutter
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
