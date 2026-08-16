/* ══════════════════════════════════════════════
   NORTHLIGHT — portfolio
   Vanilla. No build step, no dependencies.

   Everything the page shows lives in the data blocks below.
   To add a new experience, append one object to WORKS — the
   grid, the layout and the reveals all follow automatically,
   whatever niche it belongs to.
   ══════════════════════════════════════════════ */
(() => {
  'use strict';

  /* ─────────────────────────────────────────────
     0 · CONTACT  ← EDIT THESE TWO LINES
     ───────────────────────────────────────────── */
  const CONTACT = {
    email: 'aatifshaikh523@gmail.com',   // ← your email address
    // MUST include the country code — wa.me will not resolve without it.
    // 91 = India. Change the leading 91 if that is wrong.
    whatsapp: '919028983334',            // ← country code + number, digits only, no + or spaces
  };

  /* ─────────────────────────────────────────────
     1 · WORKS — add a new object to add a new project
     ───────────────────────────────────────────── */
  const WORKS = [
    {
      name: 'AZURE & STONE',
      category: 'Hospitality',
      kind: 'Concept',
      img: 'assets/work-azure.jpg',
      alt: 'The pool and stone arches at golden hour — AZURE & STONE',
      idea: 'Arrive before you arrive.',
      copy: 'A twelve-suite cliffside resort. One unbroken camera move carries the '
        + 'visitor in from open water, past the pool, through an arched doorway and '
        + 'into a suite — then a live panel prices the stay, season by season.',
      notes: ['180-frame cinematic sequence', 'Live booking arithmetic', 'Seasonal rates'],
      url: 'https://azure-and-stone.aatifshaikh523.workers.dev/',
    },
    {
      name: 'HALCYON',
      category: 'Property',
      kind: 'Concept',
      img: 'assets/work-halcyon.jpg',
      alt: 'A glass and travertine house on a headland at golden hour — HALCYON',
      idea: 'The whole house, taken apart and put back.',
      copy: 'A cliff-headland estate. Four scroll-scrubbed chapters, an exploded '
        + 'architectural reveal that holds the building in mid-air, a drag-to-turn '
        + 'exterior study and a finance calculator that does real work.',
      notes: ['Four scrubbed chapters', 'Drag-to-turn exterior', 'Floor-by-floor plans'],
      // GitHub Pages, NOT Cloudflare: the Workers host does not answer HTTP Range
      // requests, which makes the video unseekable and freezes every scrub chapter
      // on frame zero. Verified 2026-08-16. Do not "fix" this to the workers.dev URL.
      url: 'https://shaikh-aatif.github.io/halcyon/',
    },
  ];

  /* ─────────────────────────────────────────────
     2 · WHAT WE MAKE
     ───────────────────────────────────────────── */
  const CREATES = [
    {
      n: '01',
      title: 'Cinematic sequences',
      copy: 'Film-grade footage that advances with the scroll, so the story moves at '
        + 'the visitor’s pace instead of a video player’s.',
    },
    {
      n: '02',
      title: 'Things you can handle',
      copy: 'Turntables, level selectors, galleries — ways to turn a thing over in your '
        + 'hands rather than look at a photograph of it.',
    },
    {
      n: '03',
      title: 'Tools that do real work',
      copy: 'Calculators, configurators and booking panels with honest arithmetic '
        + 'behind them, not decorative sliders.',
    },
  ];

  /* ─────────────────────────────────────────────
     3 · WHY
     ───────────────────────────────────────────── */
  const WHYS = [
    {
      title: 'You stop looking like the template',
      copy: 'Most businesses in any premium category are running the same handful of '
        + 'themes. A built experience is different in the first two seconds, before '
        + 'a word has been read.',
    },
    {
      title: 'People explore instead of skim',
      copy: 'When moving down the page is rewarded with something new, visitors keep '
        + 'moving. The page gives them a reason to stay in it.',
    },
    {
      title: 'You show it instead of listing it',
      copy: 'A specification tells someone a room is eleven thousand square feet. An '
        + 'experience lets them cross it.',
    },
    {
      title: 'It gets remembered, and sent on',
      copy: 'A page that felt like something is a page people describe to other people. '
        + 'That is difficult to buy any other way.',
    },
  ];

  /* ─────────────────────────────────────────────
     4 · PROCESS
     ───────────────────────────────────────────── */
  const STEPS = [
    { n: '01', title: 'Discover', copy: 'We learn the place, the work and the person you are trying to reach.' },
    { n: '02', title: 'Concept', copy: 'We decide what the visitor should feel, and the one moment the whole thing turns on.' },
    { n: '03', title: 'Design', copy: 'Look, type, colour and pacing — agreed before a line of it is built.' },
    { n: '04', title: 'Build', copy: 'We make it, on real devices, at real speeds, until it is smooth everywhere.' },
    { n: '05', title: 'Launch', copy: 'It goes live on your domain. We stay on hand while it settles in.' },
  ];

  /* ═════════════════════════════════════════════
     RENDER
     ═════════════════════════════════════════════ */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ── works ──────────────────────────────────
  $('#worksGrid').innerHTML = WORKS.map((w, i) => `
    <article class="work" data-reveal data-at="${i * 60}">
      <a class="work-media" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer"
         aria-label="Open the ${esc(w.name)} experience in a new tab">
        <img src="${esc(w.img)}" alt="${esc(w.alt)}" loading="lazy" decoding="async">
        <span class="work-open"><i></i>Open experience</span>
      </a>

      <div class="work-body">
        <div class="work-tags">
          <span class="tag">${esc(w.category)}</span>
          <span class="tag tag-quiet">${esc(w.kind)}</span>
        </div>

        <h3 class="work-name">${esc(w.name)}</h3>
        <p class="work-idea">${esc(w.idea)}</p>
        <p class="work-copy">${esc(w.copy)}</p>

        <ul class="work-notes">
          ${w.notes.map((n) => `<li>${esc(n)}</li>`).join('')}
        </ul>

        <a class="work-link" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">
          Open ${esc(w.name)}<i aria-hidden="true"></i>
        </a>
      </div>
    </article>`).join('');

  // ── what we make ───────────────────────────
  $('#createsGrid').innerHTML = CREATES.map((c, i) => `
    <div class="create" data-reveal data-at="${i * 70}">
      <span class="create-n">${esc(c.n)}</span>
      <h3 class="create-t">${esc(c.title)}</h3>
      <p class="create-c">${esc(c.copy)}</p>
    </div>`).join('');

  // ── why ────────────────────────────────────
  $('#whysGrid').innerHTML = WHYS.map((w, i) => `
    <div class="why" data-reveal data-at="${i * 60}">
      <h3 class="why-t">${esc(w.title)}</h3>
      <p class="why-c">${esc(w.copy)}</p>
    </div>`).join('');

  // ── process ────────────────────────────────
  $('#stepsList').innerHTML = STEPS.map((s, i) => `
    <li class="step" data-reveal data-at="${i * 50}">
      <span class="step-n">${esc(s.n)}</span>
      <div class="step-body">
        <h3 class="step-t">${esc(s.title)}</h3>
        <p class="step-c">${esc(s.copy)}</p>
      </div>
    </li>`).join('');

  // ── contact ────────────────────────────────
  const wa = String(CONTACT.whatsapp).replace(/\D/g, '');
  const subject = encodeURIComponent('Project enquiry');
  const waText = encodeURIComponent("Hello — I saw your work and I'd like to talk about a project.");
  const parts = [];

  if (CONTACT.email && !CONTACT.email.startsWith('REPLACE_ME')) {
    parts.push(`<a class="btn btn-solid" href="mailto:${esc(CONTACT.email)}?subject=${subject}">
        Email us<i aria-hidden="true"></i></a>`);
  }
  // a real number is 8+ digits — a stub or half-typed one must not render a dead link
  if (wa.length >= 8 && wa !== '910000000000') {
    parts.push(`<a class="btn btn-ghost" href="https://wa.me/${wa}?text=${waText}"
        target="_blank" rel="noopener noreferrer">WhatsApp<i aria-hidden="true"></i></a>`);
  }
  if (!parts.length) {
    parts.push(`<p class="contact-todo">Set your email and WhatsApp number at the top of
      <code>main.js</code> and they will appear here.</p>`);
  }
  $('#contactActions').innerHTML = parts.join('');

  /* ═════════════════════════════════════════════
     BEHAVIOUR
     ═════════════════════════════════════════════ */
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── chrome shrinks past the fold ───────────
  const chrome = $('#chrome');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      chrome.classList.toggle('is-tight', window.scrollY > 40);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── reveals ────────────────────────────────
  const reveals = document.querySelectorAll('[data-reveal]');
  if (REDUCED) {
    reveals.forEach((n) => n.classList.add('is-in'));
  } else {
    reveals.forEach((n) => { n.style.transitionDelay = `${+(n.dataset.at || 0)}ms`; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((n) => io.observe(n));
  }

  // ── quiet parallax on the band ─────────────
  const band = document.querySelector('.band-media img');
  if (band && !REDUCED) {
    let raf = false;
    const move = () => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        const r = band.parentElement.getBoundingClientRect();
        const vh = innerHeight;
        if (r.bottom > 0 && r.top < vh) {
          const p = (r.top + r.height / 2 - vh / 2) / vh;   // -1 … 1
          band.style.transform = `translate3d(0, ${(-p * 6).toFixed(2)}%, 0) scale(1.12)`;
        }
        raf = false;
      });
    };
    addEventListener('scroll', move, { passive: true });
    addEventListener('resize', move);
    move();
  }

  // ── misc ───────────────────────────────────
  $('#year').textContent = new Date().getFullYear();
})();
