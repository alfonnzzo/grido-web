document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  const tabBtns  = document.querySelectorAll('.tab-btn');
  const prodCards = document.querySelectorAll('.card[data-cat]');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      prodCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.style.display = match ? '' : 'none';
        if (match) {
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            setTimeout(() => card.classList.add('visible'), 60);
          });
        }
      });
    });
  });

  function startCountdown(targetDate, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const dDays  = container.querySelector('[data-days]');
    const dHours = container.querySelector('[data-hours]');
    const dMins  = container.querySelector('[data-mins]');
    const dSecs  = container.querySelector('[data-secs]');

    const pad = n => String(n).padStart(2, '0');

    function tick() {
      const diff = new Date(targetDate) - Date.now();
      if (diff <= 0) {
        container.innerHTML = '<span style="font-size:1rem;font-weight:700">¡Oferta finalizada!</span>';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);

      if (dDays)  dDays.textContent  = pad(d);
      if (dHours) dHours.textContent = pad(h);
      if (dMins)  dMins.textContent  = pad(m);
      if (dSecs)  dSecs.textContent  = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  startCountdown('2026-08-31T23:59:59', 'countdown-hero');
  startCountdown('2026-08-31T23:59:59', 'countdown-promo1');
  startCountdown('2026-07-15T23:59:59', 'countdown-promo2');
  startCountdown('2026-09-15T23:59:59', 'countdown-promo3');

  const form    = document.getElementById('contactForm');
  const success = document.getElementById('success-msg');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando…';
      }
      setTimeout(() => {
        form.reset();
        if (success) { success.style.display = 'block'; }
        if (submitBtn) {
          submitBtn.textContent = 'Enviar mensaje';
          submitBtn.disabled = false;
        }
        setTimeout(() => {
          if (success) success.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('visible'));
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(0,0,0,0.22)'
        : '0 2px 20px rgba(0,0,0,0.18)';
    }, { passive: true });
  }

});