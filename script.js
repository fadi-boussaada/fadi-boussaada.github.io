// Simple interactive behaviors
document.addEventListener('DOMContentLoaded', () => {
  // ======================
  // Typing effect
  // ======================
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const phrases = JSON.parse(typingEl.getAttribute('data-phrases'));
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function type() {
      const currentText = phrases[currentPhrase];
      
      if (isDeleting) {
        typingEl.textContent = currentText.substring(0, currentChar - 1);
        currentChar--;
      } else {
        typingEl.textContent = currentText.substring(0, currentChar + 1);
        currentChar++;
      }
      
      if (!isDeleting && currentChar === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    }
    
    type();
  }

  // ======================
  // Theme toggle
  // ======================
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '☀️' : '🌙';
    });
  }

  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    if (themeBtn) themeBtn.textContent = '☀️';
  }

  // ======================
  // Mobile menu
  // ======================
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // ======================
  // Demo links
  // ======================
  document.querySelectorAll('.demo').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Demo coming soon!');
    });
  });

  // ======================
  // Scroll Animation (NEW)
  // ======================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    {
      threshold: 0.2, // Section 20% visible triggers animation
    }
  );

  document.querySelectorAll('.section, .hero').forEach((el) => {
    observer.observe(el);
  });
});

// ======================
// Light Theme CSS (Dynamic injection)
// ======================
const lightThemeStyles = `
.light-theme {
  --bg: #f8fafc;
  --panel: #ffffff;
  --muted: #64748b;
  --text: #1e293b;
  --card: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
}

.light-theme .site-header {
  background: rgba(248, 250, 252, 0.95);
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.light-theme .skill-card,
.light-theme .project-card,
.light-theme .contact-card,
.light-theme .contact-info {
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightThemeStyles;
document.head.appendChild(styleSheet);
