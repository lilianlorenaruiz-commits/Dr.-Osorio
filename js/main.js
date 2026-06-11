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

  // Dropdown: click/keyboard toggle + Escape + click-outside.
  // CSS shows the menu via :hover OR via .nav__dropdown--open on the parent.
  document.querySelectorAll('.nav__dropdown-toggle').forEach(btn => {
    const dropdown = btn.closest('.nav__dropdown');
    if (!dropdown) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !dropdown.classList.contains('nav__dropdown--open');
      // Close any other open dropdowns so only one is open at a time.
      document.querySelectorAll('.nav__dropdown--open').forEach(d => {
        if (d === dropdown) return;
        d.classList.remove('nav__dropdown--open');
        const other = d.querySelector('.nav__dropdown-toggle');
        if (other) other.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('nav__dropdown--open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  // Escape closes any open dropdown and returns focus to its toggle.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelectorAll('.nav__dropdown--open');
    if (!open.length) return;
    open.forEach(d => {
      d.classList.remove('nav__dropdown--open');
      const t = d.querySelector('.nav__dropdown-toggle');
      if (t) {
        t.setAttribute('aria-expanded', 'false');
        t.focus();
      }
    });
  });

  // Click outside a dropdown closes it.
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav__dropdown--open').forEach(d => {
      if (d.contains(e.target)) return;
      d.classList.remove('nav__dropdown--open');
      const t = d.querySelector('.nav__dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll for anchor links.
  // Skip empty/bare "#" hrefs (used by placeholder footer links) so we don't
  // call querySelector('#'), which throws SyntaxError in some browsers.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      let target;
      try { target = document.querySelector(href); } catch { return; }
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
