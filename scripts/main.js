/* Darul Ikhlas International Academy - site scripts. No libraries needed. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header shadow after scrolling ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const settle = (el) => {
    // After the animation, remove the reveal attribute so normal hover effects work again.
    const delay = parseInt(el.style.getPropertyValue('--d'), 10) || 0;
    window.setTimeout(() => { el.removeAttribute('data-reveal'); el.classList.remove('is-in'); }, 900 + delay);
  };
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.removeAttribute('data-reveal'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        settle(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- count-up numbers ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    const run = (el) => {
      const end = parseFloat(el.dataset.count);
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(end * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      el.textContent = '0';
      requestAnimationFrame(tick);
    };
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- contact form (Web3Forms) ---------- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    const say = (msg, kind) => { status.textContent = msg; status.className = 'form-status' + (kind ? ' is-' + kind : ''); };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const key = form.elements.access_key ? form.elements.access_key.value : '';
      if (!key || key.indexOf('YOUR_') === 0) {
        say('The form is not connected yet. Please email us or message us on WhatsApp.', 'error');
        return;
      }
      button.disabled = true;
      say('Sending your message...');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          form.reset();
          say('Thank you. Your message was sent. We will reply soon.', 'ok');
        } else {
          say(data.message || 'Your message could not be sent. Please try again or email us.', 'error');
        }
      } catch (err) {
        say('Network problem. Please check your connection and try again.', 'error');
      } finally {
        button.disabled = false;
      }
    });
  }
})();
