// Theme toggle
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
  }
}

// Load saved theme or reflect system preference (without persisting it,
// so the site keeps following the OS until the user explicitly toggles)
let savedTheme = null;
try {
  savedTheme = localStorage.getItem('theme');
} catch (error) {}

if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
} else if (themeToggle) {
  themeToggle.innerHTML = '&#9790;';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (error) {}
  });
}

// Mobile navigation toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Release history version selector
const releaseVersionSelect = document.getElementById('releaseVersionSelect');

if (releaseVersionSelect) {
  releaseVersionSelect.addEventListener('change', () => {
    document.querySelectorAll('.release-panel').forEach(panel => {
      panel.classList.toggle('is-active', panel.id === releaseVersionSelect.value);
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach((button, index) => {
  button.setAttribute('aria-expanded', 'false');
  const answer = button.nextElementSibling;
  if (answer) {
    if (!answer.id) answer.id = 'faq-answer-' + (index + 1);
    button.setAttribute('aria-controls', answer.id);
  }
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
      const q = faq.querySelector('.faq-question');
      if (q) q.setAttribute('aria-expanded', 'false');
    });

    // Open the clicked one (if it wasn't already open)
    if (!isActive) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// In-page anchor scrolling is handled by CSS: `scroll-behavior: smooth` on
// html plus `scroll-margin-top` on sections (which also accounts for the
// sticky guide tab bar — a JS offset here would scroll underneath it).
