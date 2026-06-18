document.addEventListener('DOMContentLoaded', () => {

  // ----- Mobile menu -----
  const menuBtn = document.querySelector('.nav__menu-btn');
  const navLinks = document.querySelector('.nav__links');

  // Collapse every open dropdown and reset its toggle's ARIA state.
  // Shared so the mobile menu, Escape, and click-outside all stay consistent.
  function closeAllDropdowns() {
    document.querySelectorAll('.nav__dropdown--open').forEach(d => {
      d.classList.remove('nav__dropdown--open');
      const t = d.querySelector('.nav__dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  // Centralised state setter so aria-expanded and aria-label stay in sync
  // and we never pass a non-string value to setAttribute.
  function setMobileMenu(open) {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.toggle('nav__links--open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    // Closing the menu also collapses any dropdown left open inside it, so it
    // doesn't reappear pre-expanded (with stale aria-expanded) on reopen.
    if (!open) closeAllDropdowns();
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
      // Intentional: stops this click from reaching the document-level
      // click-outside handlers below, which would otherwise immediately
      // re-close the dropdown we're toggling open. If you add other
      // document click listeners later, account for this.
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

  // Smooth scroll for in-page anchors.
  // Single delegated listener handles three cases:
  //   1. <a href="#anchor">          — classic in-page jump
  //   2. <a href="this-page.html#x"> — deep link to OWN page (e.g. nav item
  //      pointing to the same file the user is already on). Used to hard-jump.
  //   3. <a href="other.html#x">     — cross-page link. Let the browser handle.
  // Uses the anchor's resolved .origin/.pathname/.hash (DOM URL parsing) so we
  // don't have to manually strip ./ ../ or trailing slashes from the raw href.
  // Bare "#" hrefs (placeholder footer links) short-circuit at the hash check.
  // Respects prefers-reduced-motion.
  const prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest?.('a[href]');
    if (!anchor) return;
    if (!anchor.hash || anchor.hash === '#') return;
    if (anchor.origin !== location.origin) return;
    if (anchor.pathname !== location.pathname) return;
    let target;
    try { target = document.querySelector(anchor.hash); } catch { return; }
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  });

  // Active nav link based on current page.
  // Compares the filename of each link's pathname (DOM property, which already
  // strips any #hash or ?query) against the current page, so deep links like
  // "for-individuals.html#evaluation-types" still match "for-individuals.html".
  const pageFile = (path) => {
    // Strip trailing slashes, take the last segment, default to index.html,
    // and lowercase so matching is robust to casing and trailing-slash URLs.
    const file = path.replace(/\/+$/, '').split('/').pop();
    return (file || 'index.html').toLowerCase();
  };
  const current = pageFile(window.location.pathname);
  document.querySelectorAll('.nav__link').forEach(link => {
    if (!link.getAttribute('href')) return; // skip the dropdown <button> toggle
    if (pageFile(link.pathname) === current) {
      link.classList.add('nav__link--active');
    }
  });

  // ----- Modal: open from [data-open-modal], close from [data-close-modal] -----
  // Uses native <dialog>: Escape closes automatically and focus is trapped by
  // the browser. We add:
  //   - body scroll lock (.modal-open)
  //   - click-on-backdrop to close
  //   - return focus to the opener
  //   - mailto submit handler for [data-modal-form]
  let lastModalTrigger = null;

  // Single owner of dialog teardown. Calling modal.close() synchronously fires
  // the 'close' event, and the close listener below performs body-class cleanup
  // and focus restoration. Here we only initiate the close.
  function closeModalEl(modal) {
    if (!modal || typeof modal.close !== 'function') return;
    try {
      modal.close();
    } catch (err) {
      if (err && err.name !== 'InvalidStateError') {
        console.warn('[modal] close failed', err);
      }
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const id = trigger.getAttribute('data-open-modal');
      if (!id) return;
      const modal = document.getElementById(id);
      if (!modal) return;
      e.preventDefault();
      e.stopPropagation();
      // Fallback for browsers without native <dialog> support (Safari <15.4,
      // Firefox <98, some in-app webviews). Open a generic mailto so the user
      // does not end up with a dead click on the page's main lead CTA.
      if (typeof modal.showModal !== 'function') {
        window.location.href = 'mailto:admin@drosoriopsych.com'
          + '?subject=' + encodeURIComponent('Request Provider Packet')
          + '&body=' + encodeURIComponent('I would like to request the provider packet. Please reach out so we can coordinate.');
        return;
      }
      try {
        modal.showModal();
        lastModalTrigger = trigger;
        document.body.classList.add('modal-open');
      } catch (err) {
        console.warn('[modal] showModal failed', err);
      }
    });
  });

  document.querySelectorAll('dialog.modal').forEach(modal => {
    // Native close (Escape, form method="dialog", or .close()) syncs the body
    // and returns focus to whoever opened the dialog. This is the SINGLE
    // owner of post-close cleanup — closeModalEl only initiates the close.
    modal.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      const opener = lastModalTrigger;
      lastModalTrigger = null;
      // Reset the dialog: form visible + cleared, confirmation panel hidden.
      // This guarantees a fresh state if the same dialog is reopened later.
      const form = modal.querySelector('[data-modal-form]');
      const confirmation = modal.querySelector('.modal__confirmation');
      if (form) {
        form.hidden = false;
        if (typeof form.reset === 'function') form.reset();
      }
      if (confirmation) confirmation.hidden = true;
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) {
        opener.focus({ preventScroll: true });
      }
    });
    // Click on the dialog element itself (i.e. the backdrop area) closes it,
    // but clicks on the inner form bubble up with e.target inside the form.
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModalEl(modal);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = btn.closest('dialog.modal');
      if (!modal) return;
      e.preventDefault();
      closeModalEl(modal);
    });
  });

  // Mailto submit: build a prefilled email from the form fields and open the
  // user's email client. No data is sent over the network from this page.
  document.querySelectorAll('[data-modal-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // The browser's native validation (required, type=email, maxlength) runs
      // BEFORE the submit event is dispatched. If we reached this handler, the
      // required fields are populated and the email shape is acceptable.
      const data = new FormData(form);
      const val = (k) => (data.get(k) || '').toString().trim();
      const name = val('attorneyName');
      const firm = val('lawFirm');
      const email = val('email');
      const phone = val('phone');
      const evalType = val('evaluationType');
      const jurisdiction = val('jurisdiction');
      const urgency = val('urgency');
      const notes = val('caseNotes');

      const subject = 'Request Provider Packet: ' + (firm || name || 'Attorney inquiry');
      const lines = [
        'Hello Dr. Osorio,',
        '',
        'I would like to request a provider packet for the following matter:',
        '',
        'Attorney: ' + (name || '(not provided)'),
        'Email: ' + (email || '(not provided)'),
        'Law Firm: ' + (firm || '(not provided)'),
        'Phone: ' + (phone || '(not provided)'),
        'Type of Evaluation: ' + (evalType || '(not provided)'),
        'Jurisdiction: ' + (jurisdiction || '(not provided)'),
        'Case Urgency: ' + (urgency || '(not specified)'),
        '',
        'Brief description of the case:',
        notes || '(none provided)',
        '',
        'Thank you,',
        name || ''
      ];
      const body = lines.join('\n');
      const href = 'mailto:admin@drosoriopsych.com?subject='
        + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      // Swap to the confirmation panel BEFORE firing the mailto so the user
      // sees a stable confirmation state regardless of whether the mailto
      // succeeds, silently fails, or causes a brief navigation flicker. The
      // dialog stays open until they explicitly dismiss it.
      const modal = form.closest('dialog.modal');
      const confirmation = modal && modal.querySelector('.modal__confirmation');
      if (modal && confirmation) {
        form.hidden = true;
        confirmation.hidden = false;
        const closeBtn = confirmation.querySelector('[data-close-modal]');
        if (closeBtn) closeBtn.focus({ preventScroll: true });
      }
      window.location.href = href;
    });
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

  // PSYPACT Interactive Map — pointer + keyboard + touch support.
  const psypactMap = document.querySelector('[data-psypact-map]');
  if (psypactMap) {
    const tooltip = document.getElementById('psypact-tooltip');
    const nameEl = tooltip && tooltip.querySelector('.psypact-map__tooltip-name');
    const statusEl = tooltip && tooltip.querySelector('.psypact-map__tooltip-status');

    // Make each state focusable for keyboard navigation.
    psypactMap.querySelectorAll('[data-state]').forEach(function (el) {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label',
        el.getAttribute('data-state') + ' — ' +
        (el.getAttribute('data-participating') === 'true'
          ? 'PSYPACT Participating State'
          : 'Not a PSYPACT state'));
    });

    function showFor(target, evtX, evtY) {
      if (!tooltip || !nameEl || !statusEl) return;
      var name = target.getAttribute('data-state');
      var participating = target.getAttribute('data-participating') === 'true';
      if (!name) return;
      nameEl.textContent = name;
      statusEl.textContent = participating
        ? 'PSYPACT Participating State, Effective'
        : 'Not a PSYPACT state';
      statusEl.classList.toggle('psypact-map__tooltip-status--not', !participating);
      tooltip.setAttribute('aria-hidden', 'false');
      var rect = psypactMap.getBoundingClientRect();
      var x, y;
      if (typeof evtX === 'number' && typeof evtY === 'number') {
        x = evtX - rect.left;
        y = evtY - rect.top;
      } else {
        var tRect = target.getBoundingClientRect();
        x = tRect.left - rect.left + tRect.width / 2;
        y = tRect.top - rect.top + tRect.height / 2;
      }
      x = Math.max(110, Math.min(x, rect.width - 110));
      var tooltipH = tooltip.offsetHeight || 60;
      y = Math.max(tooltipH + 8, Math.min(y, rect.height - 8));
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }

    function hide() {
      if (tooltip) tooltip.setAttribute('aria-hidden', 'true');
    }

    // Pointer events cover mouse + touch + stylus.
    psypactMap.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var t = e.target.closest('[data-state]');
      if (t) showFor(t, e.clientX, e.clientY);
      else hide();
    });
    psypactMap.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'touch') hide();
    });

    // Touch: show on tap, dismiss on second tap or tap outside.
    var activeTouch = null;
    psypactMap.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch') return;
      var t = e.target.closest('[data-state]');
      if (t) {
        e.preventDefault();
        if (activeTouch === t) { hide(); activeTouch = null; }
        else { showFor(t); activeTouch = t; }
      } else { hide(); activeTouch = null; }
    });

    // Click fallback for non-pointer browsers.
    psypactMap.addEventListener('click', function (e) {
      if (e.pointerType) return;
      var t = e.target.closest('[data-state]');
      if (t) showFor(t);
      else hide();
    });

    // Keyboard: focus/blur on state elements.
    psypactMap.addEventListener('focusin', function (e) {
      var t = e.target.closest('[data-state]');
      if (t) showFor(t);
    });
    psypactMap.addEventListener('focusout', function (e) {
      if (!psypactMap.contains(e.relatedTarget)) hide();
    });

    document.addEventListener('pointerdown', function (e) {
      if (!psypactMap.contains(e.target)) { hide(); activeTouch = null; }
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  }

});
