document.addEventListener('DOMContentLoaded', function() {
  const powered = document.querySelector('.footer-powered');
  const reveal = document.querySelector('.footer-powered-reveal');

  if (powered && reveal) {
    powered.addEventListener('mouseenter', () => {
      reveal.style.maxWidth = reveal.scrollWidth + 'px';
      reveal.style.opacity = '1';
    });
    powered.addEventListener('mouseleave', () => {
      reveal.style.maxWidth = '0';
      reveal.style.opacity = '0';
    });
  }

  initGalleryLightbox();
  initScrollTop();
  initHeaderScroll();
  initRandomEspais();
});

function initRandomEspais() {
  const container = document.getElementById('espais-random');
  const dataEl = document.getElementById('espais-data');
  if (!container || !dataEl) return;

  let espais;
  try {
    espais = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }
  if (!Array.isArray(espais) || espais.length === 0) return;

  for (let i = espais.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [espais[i], espais[j]] = [espais[j], espais[i]];
  }

  const escapeHtml = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const picks = espais.slice(0, 4);
  container.innerHTML = picks.map((espai) => {
    const img = '<img src="' + escapeHtml(espai.photo) + '" alt="' + escapeHtml(espai.title) + '">';
    const imageHtml = espai.placeholder
      ? '<div class="espai-card-placeholder">' + img + '</div>'
      : img;
    return '<a href="' + escapeHtml(espai.url) + '" class="espai-card">' +
      '<div class="espai-card-image">' + imageHtml + '</div>' +
      '<h3 class="espai-card-title">' + escapeHtml(espai.title) + '</h3>' +
      '</a>';
  }).join('');
}

function initHeaderScroll() {
  const body = document.body;
  const THRESHOLD = 70;

  function update() {
    const sc = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    body.classList.toggle('is-scrolled', sc > THRESHOLD);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

function initGalleryLightbox() {
  const groups = {};

  document.querySelectorAll('.espai-gallery-item').forEach(function(item) {
    const gallery = item.getAttribute('data-gallery') || '_';
    if (!groups[gallery]) groups[gallery] = [];
    groups[gallery].push(item);
  });

  const groupNames = Object.keys(groups);
  if (!groupNames.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'espai-lightbox';
  overlay.innerHTML =
    '<button class="espai-lightbox-btn espai-lightbox-close" type="button" aria-label="Tancar">×</button>' +
    '<button class="espai-lightbox-btn espai-lightbox-prev" type="button" aria-label="Anterior">‹</button>' +
    '<img class="espai-lightbox-img" alt="">' +
    '<button class="espai-lightbox-btn espai-lightbox-next" type="button" aria-label="Següent">›</button>' +
    '<span class="espai-lightbox-counter"></span>';
  document.body.appendChild(overlay);

  const img = overlay.querySelector('.espai-lightbox-img');
  const counter = overlay.querySelector('.espai-lightbox-counter');
  const btnPrev = overlay.querySelector('.espai-lightbox-prev');
  const btnNext = overlay.querySelector('.espai-lightbox-next');
  const btnClose = overlay.querySelector('.espai-lightbox-close');

  let currentGroup = null;
  let currentIndex = 0;
  let lastFocus = null;

  function show(index) {
    const group = groups[currentGroup];
    if (!group.length) return;
    currentIndex = (index + group.length) % group.length;
    const href = group[currentIndex].getAttribute('href');
    const alt = group[currentIndex].querySelector('img').getAttribute('alt');
    img.src = href;
    img.alt = alt;
    counter.textContent = (currentIndex + 1) + ' / ' + group.length;
    btnPrev.disabled = group.length <= 1;
    btnNext.disabled = group.length <= 1;
  }

  function open(group, index) {
    currentGroup = group;
    lastFocus = document.activeElement;
    show(index);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    img.src = '';
    if (lastFocus) lastFocus.focus();
  }

  groupNames.forEach(function(group) {
    groups[group].forEach(function(item, index) {
      item.addEventListener('click', function(event) {
        event.preventDefault();
        open(group, index);
      });
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function() { show(currentIndex - 1); });
  btnNext.addEventListener('click', function() { show(currentIndex + 1); });

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) close();
  });

  document.addEventListener('keydown', function(event) {
    if (!overlay.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });
}

function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  const bar = btn.querySelector('.scroll-top-bar');
  const CIRC = 2 * Math.PI * 22;
  let ticking = false;

  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const sc = window.scrollY || doc.scrollTop;
    const pct = max > 0 ? sc / max : 0;
    bar.style.strokeDashoffset = String(CIRC * (1 - pct));
    if (sc > 280 && !btn.classList.contains('is-visible')) btn.classList.add('is-visible');
    else if (sc <= 280 && btn.classList.contains('is-visible')) btn.classList.remove('is-visible');
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}