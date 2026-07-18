// ---------------------------------------------------------------- Theme
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next =
      root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });
}

// ---------------------------------------------------------------- Mobile nav
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
  });
}

// ---------------------------------------------------------------- Header shadow
const header = document.getElementById('header');
function onScrollHeader() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', onScrollHeader);
onScrollHeader();

// ---------------------------------------------------------------- Active link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 90;
    const sectionId = current.getAttribute('id');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', activateNavLink);

// ---------------------------------------------------------------- Reveal on scroll
// Tag common blocks as reveal targets, then fade them in as they enter view.
const revealTargets = document.querySelectorAll(
  '.reveal, .skill-item, .exp-item, .project-card, .edu-item, .pub-item, .about-image, .about-content, .hero-stat'
);
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');

      // Animate skill bars when their card appears
      const bar = el.querySelector && el.querySelector('.skill-progress');
      if (bar && bar.dataset.width) {
        requestAnimationFrame(() => {
          bar.style.width = bar.dataset.width;
        });
      }
      io.unobserve(el);
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
revealTargets.forEach((el) => io.observe(el));

// Store skill-bar target widths (set inline in HTML) then reset to 0 for animation
document.querySelectorAll('.skill-progress').forEach((bar) => {
  const target = bar.style.width || '0%';
  bar.dataset.width = target;
  bar.style.width = '0%';
});

// ---------------------------------------------------------------- Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------------------------------------------------------------- Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    const subject = encodeURIComponent('Portfolio Contact Form Message');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:dharmanikheem@gmail.com?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}
