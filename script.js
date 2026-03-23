// OPEN ENVELOPE
function openEnvelope() {
    const overlay = document.getElementById('envelope-overlay');
    const mainSite = document.getElementById('main-site');
    createFlowerExplosion();
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        mainSite.classList.remove('hidden');
        setTimeout(() => mainSite.style.opacity = '1', 50);
        startContinuousMagic();
    }, 1000);
}

// FIREWORKS
const canvas = document.getElementById('flower-fireworks');
const ctx = canvas.getContext('2d');
let particles = [];

function createFlowerExplosion() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: canvas.width / 2, y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.5) * 12,
            size: Math.random() * 20 + 10,
            color: ['#6d4c41', '#bcaaa4', '#d4a373'][Math.floor(Math.random() * 3)]
        });
    }
    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.1;
        ctx.fillStyle = p.color;
        ctx.font = p.size + 'px serif';
        ctx.fillText('✿', p.x, p.y);
        if (p.y > canvas.height) particles.splice(i, 1);
    });
    if (particles.length > 0) requestAnimationFrame(animateParticles);
}

// BACKGROUND MOTION
function startContinuousMagic() {
    const bg = document.getElementById('floating-bg-layer');
    setInterval(() => {
        const el = document.createElement('div');
        el.className = 'moving-element';
        const isFlower = Math.random() > 0.5;
        if (isFlower) {
            el.innerHTML = '✿';
            el.style.color = '#d4a373';
            el.style.fontSize = (Math.random() * 20 + 10) + 'px';
        } else {
            el.style.width = '15px'; el.style.height = '22px';
            el.style.background = '#bcaaa4'; el.style.borderRadius = '50%';
        }
        el.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 7 + 8;
        el.style.animationDuration = duration + 's';
        bg.appendChild(el);
        setTimeout(() => el.remove(), duration * 1000);
    }, 1200);
}

// COUNTDOWN
const targetDate = new Date("April 14, 2026 10:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff > 0) {
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("mins").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("secs").innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// TABS
function openTab(evt, tabId) {
    const contents = document.getElementsByClassName("tab-content");
    for (let c of contents) c.classList.remove("active");
    const links = document.getElementsByClassName("tab-link");
    for (let l of links) l.classList.remove("active");
    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}