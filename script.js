function openEnvelope() {
    const overlay = document.getElementById('envelope-overlay');
    const mainSite = document.getElementById('main-site');
    createFlowerExplosion();
    
    // Pause for 2.5s to let guests read the glowing letter
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            mainSite.classList.remove('hidden');
            setTimeout(() => mainSite.style.opacity = '1', 50);
            startContinuousMagic();
            loadWishes();
        }, 1000);
    }, 2500); 
}

const canvas = document.getElementById('flower-fireworks');
const ctx = canvas.getContext('2d');
let particles = [];

function createFlowerExplosion() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 45; i++) {
        particles.push({
            x: canvas.width / 2, y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
            size: Math.random() * 15 + 10,
            color: ['#6d4c41', '#bcaaa4', '#d4a373', '#ffffff'][Math.floor(Math.random() * 4)]
        });
    }
    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx; 
        p.y += p.vy; 
        p.vy += 0.04;
        ctx.fillStyle = p.color;
        ctx.font = p.size + 'px serif';
        ctx.fillText('✿', p.x, p.y);
        if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) particles.splice(i, 1);
    });
    if (particles.length > 0) requestAnimationFrame(animateParticles);
}

function startContinuousMagic() {
    const bg = document.getElementById('floating-bg-layer');
    setInterval(() => {
        const el = document.createElement('div');
        el.className = 'moving-element';
        const isFlower = Math.random() > 0.4;
        if (isFlower) {
            el.innerHTML = '✿';
            el.style.color = '#d4a373';
            el.style.fontSize = (Math.random() * 15 + 10) + 'px';
        } else {
            el.style.width = '12px'; el.style.height = '18px';
            el.style.background = '#bcaaa4'; el.style.borderRadius = '50%';
            el.style.opacity = '0.3';
        }
        el.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 8 + 10;
        el.style.animationDuration = duration + 's';
        bg.appendChild(el);
        setTimeout(() => el.remove(), duration * 1000);
    }, 1500);
}

const targetDate = new Date("April 14, 2026 10:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff > 0) {
        document.getElementById("days").innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById("hours").innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById("mins").innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById("secs").innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

function openTab(evt, tabId) {
    const contents = document.getElementsByClassName("tab-content");
    for (let c of contents) c.style.display = "none";
    const links = document.getElementsByClassName("tab-link");
    for (let l of links) l.classList.remove("active");
    document.getElementById(tabId).style.display = "flex";
    if (evt) evt.currentTarget.classList.add("active");
}

window.addEventListener('mousedown', (e) => {
    if(e.target.closest('.tab-link') || e.target.closest('.rsvp-button') || e.target.closest('.submit-wish')) return; 
    spawnFlowers(e.clientX, e.clientY);
});

window.addEventListener('touchstart', (e) => {
    if(e.target.closest('.tab-link') || e.target.closest('.rsvp-button') || e.target.closest('.submit-wish')) return;
    spawnFlowers(e.touches.clientX, e.touches.clientY);
});

function spawnFlowers(x, y) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 8; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 4, 
            vy: (Math.random() - 0.5) * 4 - 1,
            size: Math.random() * 14 + 12,
            color: ['#6d4c41', '#bcaaa4', '#d4a373', '#ffffff'][Math.floor(Math.random() * 4)]
        });
    }
    animateParticles();
}

let currentImageIndex = 0;
const allImages = [
    'images/keona1.jpg', 'images/keona2.jpg', 'images/keona3.jpg', 'images/keona4.jpg', 'images/keona5.jpg',
    'images/keona6.jpg', 'images/keona7.jpg', 'images/keona8.jpg', 'images/keona9.jpg', 'images/keona10.jpg',
    'images/celicia1.jpg', 'images/celicia2.jpg', 'images/celicia3.jpg', 'images/celicia4.jpg', 'images/celicia5.jpg',
    'images/celicia6.jpg', 'images/celicia7.jpg', 'images/celicia8.jpg', 'images/celicia9.jpg', 'images/celicia10.jpg',
    'images/qrcode.jpg',
    'images/sample_boho1.jpg', 'images/sample_boho2.jpg', 'images/sample_boho3.jpg', 'images/sample_boho4.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = allImages[currentImageIndex];
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeSlide(direction, event) {
    event.stopPropagation();
    currentImageIndex += direction;
    if (currentImageIndex >= allImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = allImages.length - 1;
    document.getElementById('lightbox-img').src = allImages[currentImageIndex];
}

function saveWish() {
    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');
    if (nameInput.value.trim() === "" || messageInput.value.trim() === "") {
        alert("Please fill in your name and message! ✨");
        return;
    }
    const newWish = { name: nameInput.value, message: messageInput.value, date: new Date().toLocaleDateString() };
    let existingWishes = JSON.parse(localStorage.getItem('twinsWishes')) || [];
    existingWishes.unshift(newWish);
    localStorage.setItem('twinsWishes', JSON.stringify(existingWishes));
    nameInput.value = ""; messageInput.value = ""; loadWishes();
}

function loadWishes() {
    const container = document.getElementById('comments-display');
    const existingWishes = JSON.parse(localStorage.getItem('twinsWishes')) || [];
    container.innerHTML = existingWishes.map(wish => `
        <div class="wish-card">
            <p class="wish-text">"${wish.message}"</p>
            <p class="wish-author">— ${wish.name}</p>
        </div>
    `).join('');
}

function downloadCard() {
    const card = document.getElementById('aesthetic-card');
    const container = document.getElementById('hidden-card-container');
    container.style.left = "0"; container.style.top = "0";
    html2canvas(card, { scale: 2, backgroundColor: null }).then(canvas => {
        container.style.left = "-9999px";
        const link = document.createElement('a');
        link.download = 'KC-Twins-Invitation.jpg';
        link.href = canvas.toDataURL("image/jpeg", 0.9);
        link.click();
    });
}