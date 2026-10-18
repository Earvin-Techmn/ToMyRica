// ================== SCALE-TO-FIT (all devices) ==================
const DESIGN_W = 1440;   // the site is designed at 1440x810
const DESIGN_H = 810;

function fitScreen() {
  // shrink (or grow) the whole site until it fits the device screen
  const scale = Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H);
  document.documentElement.style.setProperty('--fit', scale);
}
window.addEventListener('resize', fitScreen);
window.addEventListener('orientationchange', fitScreen);
fitScreen();

// ================== PAGE SWITCHING ==================
const pages = {
  1: document.getElementById('page1'),
  2: document.getElementById('page2')
};
const toggleBtn = document.getElementById('pageToggle');
const lotus = document.getElementById('lotus');
const headers = [...document.querySelectorAll('.header')];
let currentPage = 1;

function showPage(n) {
  currentPage = n;
  Object.entries(pages).forEach(([key, el]) => {
    el.classList.toggle('active', Number(key) === n);
  });

  toggleBtn.textContent = n === 1 ? 'Go to Page 2 →' : '← Back to Page 1';
  animatePage(n);
}

// ============ ENTRANCE ANIMATIONS (randomized) ============
function animatePage(n) {
  const items = [...pages[n].querySelectorAll('.float-text, .lotus, .arrow, .deco')];

  // reset so animation can replay every visit
  items.forEach(el => el.classList.remove('in'));
  void pages[n].offsetWidth; // force reflow

  // shuffle the order randomly
  const shuffled = items.slice().sort(() => Math.random() - 0.5);

  // stagger them ~0.3s apart, each with a small random jitter
  shuffled.forEach((el, i) => {
    const delay = i * 0.3 + Math.random() * 0.15;
    el.style.transitionDelay = delay.toFixed(2) + 's';
    el.classList.add('in');
  });

  // clear delays afterwards so hover effects stay snappy
  const total = (shuffled.length * 0.3 + 1) * 1000;
  setTimeout(() => items.forEach(el => (el.style.transitionDelay = '0s')), total);
}

// ================== EVENTS ==================
lotus.addEventListener('click', () => showPage(2));

toggleBtn.addEventListener('click', () => showPage(currentPage === 1 ? 2 : 1));

// ============ HEADER: hides scrolling down, shows scrolling up ============
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  headers.forEach(h => {
    if (y > lastY && y > 60) {
      h.classList.add('header-hidden');    // scrolling down
    } else {
      h.classList.remove('header-hidden'); // scrolling up
    }
  });
  lastY = y;
});

// ================== START ==================
fitScreen();
showPage(1);