document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const menuBtn = document.querySelector('.nav__menu-btn');
  const navLinks = document.querySelector('.nav__links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav__links--open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav')) {
        navLinks.classList.remove('nav__links--open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', false);
      }
    });
  }

  // Dropdown keyboard support
  document.querySelectorAll('.nav__dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  // Animate elements on scroll (subtle fade-in)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .process__step, .trust-item, .path-card').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

});
