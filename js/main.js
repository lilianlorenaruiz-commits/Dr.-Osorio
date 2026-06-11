document.addEventListener('DOMContentLoaded', () => {

  // ----- Mobile menu -----
  const menuBtn = document.querySelector('.nav__menu-btn');
  const navLinks = document.querySelector('.nav__links');

  // Centralised state setter so aria-expanded and aria-label stay in sync
  // and we never pass a non-string value to setAttribute.
  function setMobileMenu(open) {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.toggle('nav__links--open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  function closeMobileMenu() { setMobileMenu(false); }
  function isMobileMenuOpen() {
    return !!(navLinks && navLinks.classList.contains('nav__links--open'));
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => setMobileMenu(!isMobileMenuOpen()));

    // Click outside the nav closes the menu. e.target may be a text node in
    // some browsers, which lacks .closest — optional chaining keeps us safe.
    document.addEventListener('click', (e) => {
      if (e.target.closest?.('.nav')) return;
      closeMobileMenu();
    });

    // Tapping any link inside the open menu closes it so the menu does not
    // cover the destination page when the user navigates.
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest?.('a.nav__link, a.nav__dropdown-item')) {
        closeMobileMenu();
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

  // Escape closes any open dropdown AND the mobile menu, returning focus to
  // the most relevant toggle so the user does not lose their place.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelectorAll('.nav__dropdown--open');
    open.forEach(d => {
      d.classList.remove('nav__dropdown--open');
      const t = d.querySelector('.nav__dropdown-toggle');
      if (t) {
        t.setAttribute('aria-expanded', 'false');
        t.focus();
      }
    });
    if (isMobileMenuOpen()) {
      closeMobileMenu();
      if (menuBtn) menuBtn.focus();
    }
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
  // - Skips empty/bare "#" hrefs (used by placeholder footer links) so we
  //   don't call querySelector('#'), which throws SyntaxError in some
  //   browsers.
  // - Respects prefers-reduced-motion: if the user has it on, we jump
  //   directly without animating.
  const prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      let target;
      try { target = document.querySelector(href); } catch { return; }
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
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
