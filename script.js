// Country data map
const DATA = { us: DATA_US, in: DATA_IN };
let currentCountry = localStorage.getItem('egCountry') || 'us';
let tlIdx = 0, demoIdx = 0;

function D() { return DATA[currentCountry]; }

document.addEventListener('DOMContentLoaded', () => {
  initCountryToggle();
  initNav();
  initCounters();
  renderAll();
  initReveal();
});

/* ---- Country Toggle ---- */
function initCountryToggle() {
  const btnUS = document.getElementById('btn-us');
  const btnIN = document.getElementById('btn-in');
  const slider = document.getElementById('toggle-slider');

  function applyCountry(c, animate) {
    currentCountry = c;
    localStorage.setItem('egCountry', c);
    btnUS.classList.toggle('active', c === 'us');
    btnIN.classList.toggle('active', c === 'in');
    slider.classList.toggle('right', c === 'in');
    document.body.classList.toggle('india-mode', c === 'in');
    // Update hero desc
    const hd = document.getElementById('hero-desc');
    if (hd) hd.textContent = D().heroDesc;
    if (animate) {
      renderAll();
      // Add fade animation to sections
      document.querySelectorAll('.section').forEach(s => {
        s.classList.add('section-fade');
        s.addEventListener('animationend', () => s.classList.remove('section-fade'), { once: true });
      });
    }
  }

  btnUS.addEventListener('click', () => applyCountry('us', true));
  btnIN.addEventListener('click', () => applyCountry('in', true));
  // Apply saved country on load
  applyCountry(currentCountry, false);
}

/* ---- Render All Sections ---- */
function renderAll() {
  tlIdx = 0; demoIdx = 0;
  renderOverview();
  renderTimeline();
  renderDemo();
  renderPhases();
  renderChecklist();
  renderFAQ();
  renderChips();
}

/* ---- Navbar ---- */
function initNav() {
  const n = document.getElementById('main-nav');
  const t = document.getElementById('mobile-toggle');
  const l = document.getElementById('nav-links');
  window.addEventListener('scroll', () => n.classList.toggle('scrolled', scrollY > 50));
  t.addEventListener('click', () => l.classList.toggle('open'));
  l.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => l.classList.remove('open')));
  const secs = document.querySelectorAll('.section');
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        l.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: .3 });
  secs.forEach(s => obs.observe(s));
}

/* ---- Counters ---- */
function initCounters() {
  const els = document.querySelectorAll('.metric-val');
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target, target = +el.dataset.count, start = performance.now();
        (function up(now) {
          const p = Math.min((now - start) / 1200, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(up); else el.textContent = target;
        })(start);
        obs.unobserve(el);
      }
    });
  }, { threshold: .5 });
  els.forEach(e => obs.observe(e));
}

/* ---- Overview ---- */
function renderOverview() {
  const g = document.getElementById('overview-grid');
  g.innerHTML = '';
  D().OV.forEach((c, i) => {
    const d = document.createElement('div');
    d.className = 'ov-card reveal visible';
    d.innerHTML = '<span class="ov-icon">' + c.icon + '</span><h3>' + c.title + '</h3><p>' + c.desc + '</p>';
    g.appendChild(d);
  });
}

/* ---- Timeline ---- */
function renderTimeline() {
  const c = document.getElementById('timeline-nodes');
  c.innerHTML = '';
  D().TL.forEach((t, i) => {
    const d = document.createElement('div');
    d.className = 't-node';
    d.innerHTML = '<div class="t-dot"></div><span class="t-lbl">' + t.label + '</span>';
    d.addEventListener('click', () => selTL(i));
    c.appendChild(d);
  });
  document.getElementById('tcard-prev').onclick = () => selTL(tlIdx - 1);
  document.getElementById('tcard-next').onclick = () => selTL(tlIdx + 1);
  selTL(0);
}

function selTL(i) {
  const TL = D().TL;
  if (i < 0 || i >= TL.length) return;
  tlIdx = i;
  const d = TL[i];
  document.querySelectorAll('.t-node').forEach((n, j) => n.classList.toggle('active', j === i));
  document.getElementById('timeline-rail-fill').style.width = (i / (TL.length - 1)) * 100 + '%';
  document.getElementById('timeline-card').classList.add('active');
  document.getElementById('tcard-badge').textContent = d.icon;
  document.getElementById('tcard-title').textContent = d.title;
  document.getElementById('tcard-desc').textContent = d.desc;
  document.getElementById('tcard-tags').innerHTML = d.meta.map(m => '<span>' + m + '</span>').join('');
  document.getElementById('tcard-counter').textContent = (i + 1) + ' / ' + TL.length;
  document.getElementById('tcard-prev').disabled = i === 0;
  document.getElementById('tcard-next').disabled = i === TL.length - 1;
}

/* ---- Demo ---- */
function renderDemo() {
  const sl = document.getElementById('demo-steps-list');
  sl.innerHTML = '';
  D().DEMO.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'demo-step-item' + (i === 0 ? ' active' : '');
    d.innerHTML = '<div class="demo-step-num">' + (i + 1) + '</div><span>' + s.title + '</span>';
    d.addEventListener('click', () => goDemo(i));
    sl.appendChild(d);
  });
  document.getElementById('demo-back').onclick = () => goDemo(demoIdx - 1);
  document.getElementById('demo-next').onclick = () => goDemo(demoIdx + 1);
  renderDemoScreen(0);
}

function goDemo(i) {
  const DEMO = D().DEMO;
  if (i < 0 || i >= DEMO.length) return;
  demoIdx = i;
  document.querySelectorAll('.demo-step-item').forEach((el, j) => {
    el.classList.remove('active', 'done');
    if (j < i) el.classList.add('done');
    if (j === i) el.classList.add('active');
  });
  document.getElementById('demo-back').disabled = i === 0;
  document.getElementById('demo-next').disabled = i === DEMO.length - 1;
  document.getElementById('demo-progress-fill').style.width = (i / (DEMO.length - 1)) * 100 + '%';
  renderDemoScreen(i);
}

function renderDemoScreen(i) {
  const s = D().DEMO[i], el = document.getElementById('demo-screen');
  el.style.opacity = 0;
  setTimeout(() => {
    el.innerHTML = '<h3>' + s.title + '</h3><p>' + s.desc + '</p>' + s.content;
    el.style.opacity = 1;
  }, 150);
}

/* ---- Phases ---- */
function renderPhases() {
  const nav = document.getElementById('phases-tabs');
  nav.innerHTML = '';
  D().PH.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'ph-tab' + (i === 0 ? ' active' : '');
    b.textContent = p.tab;
    b.addEventListener('click', () => {
      document.querySelectorAll('.ph-tab').forEach((t, j) => t.classList.toggle('active', j === i));
      renderPhasePanel(i);
    });
    nav.appendChild(b);
  });
  renderPhasePanel(0);
}

function renderPhasePanel(i) {
  const p = D().PH[i], el = document.getElementById('phase-panel');
  el.innerHTML = '<div class="ph-header"><span class="ph-icon">' + p.icon + '</span><div class="ph-header-text"><h3>' + p.title + '</h3><p>' + p.sub + '</p></div></div><div class="ph-body"><div class="ph-steps">' + p.steps.map((s, j) => '<div class="ph-step" style="animation:fu .4s ease-out ' + j * .1 + 's both"><div class="ph-num">' + (j + 1) + '</div><div class="ph-text"><h4>' + s.t + '</h4><p>' + s.d + '</p></div></div>').join('') + '</div></div>';
}

/* ---- Checklist ---- */
function renderChecklist() {
  const g = document.getElementById('checklist-col');
  g.innerHTML = '';
  const key = 'ckElection_' + currentCountry;
  const saved = JSON.parse(localStorage.getItem(key) || '[]');
  D().CK.forEach((c, i) => {
    const d = document.createElement('div');
    d.className = 'ck-item' + (saved.includes(i) ? ' checked' : '');
    d.dataset.i = i;
    d.innerHTML = '<div class="ck-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div><div class="ck-text"><h4>' + c.t + '</h4><p>' + c.d + '</p></div>';
    d.addEventListener('click', () => {
      d.classList.toggle('checked');
      const s = [...document.querySelectorAll('.ck-item.checked')].map(e => +e.dataset.i);
      localStorage.setItem(key, JSON.stringify(s));
      updProgress();
    });
    g.appendChild(d);
  });
  updProgress();
}

function updProgress() {
  const t = D().CK.length, c = document.querySelectorAll('.ck-item.checked').length;
  const p = Math.round(c / t * 100), circ = 2 * Math.PI * 60, off = circ - (p / 100) * circ;
  const f = document.getElementById('ring-fill');
  f.style.strokeDashoffset = off;
  f.style.stroke = p === 100 ? 'var(--grn)' : p >= 50 ? 'var(--ac)' : 'var(--amb)';
  document.getElementById('ring-label').textContent = p + '%';
  const msgs = ["Start checking items off your list.", "Great start! Keep going.", "Halfway there! Good progress.", "Almost ready! Just a few more.", "You're fully prepared!"];
  document.getElementById('readiness-msg').textContent = msgs[p === 100 ? 4 : p >= 75 ? 3 : p >= 50 ? 2 : p > 0 ? 1 : 0];
}

/* ---- FAQ ---- */
function renderFAQ() {
  const cats = document.getElementById('faq-cats');
  const list = document.getElementById('faq-list');
  cats.innerHTML = '';
  list.innerHTML = '';
  ['all', 'registration', 'voting', 'process', 'results'].forEach(c => {
    const b = document.createElement('button');
    b.className = 'fq-btn' + (c === 'all' ? ' active' : '');
    b.textContent = c[0].toUpperCase() + c.slice(1);
    b.addEventListener('click', () => {
      document.querySelectorAll('.fq-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      document.querySelectorAll('.faq-item').forEach(x => x.style.display = (c === 'all' || x.dataset.c === c) ? '' : 'none');
    });
    cats.appendChild(b);
  });
  D().FAQ.forEach(f => {
    const d = document.createElement('div');
    d.className = 'faq-item';
    d.dataset.c = f.c;
    d.innerHTML = '<button class="faq-q"><span>' + f.q + '</span><svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button><div class="faq-a"><div class="faq-a-inner">' + f.a + '</div></div>';
    d.querySelector('.faq-q').addEventListener('click', () => d.classList.toggle('open'));
    list.appendChild(d);
  });
}

/* ---- Chat / Assistant ---- */
function renderChips() {
  const container = document.getElementById('quick-chips');
  container.innerHTML = '';
  D().CHIPS.forEach(ch => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.dataset.q = ch.q;
    b.textContent = ch.label;
    b.addEventListener('click', () => {
      document.getElementById('chat-input').value = ch.q;
      sendChat();
    });
    container.appendChild(b);
  });
  // Init chat only once
  if (!window._chatInit) {
    window._chatInit = true;
    const inp = document.getElementById('chat-input');
    const btn = document.getElementById('chat-send');
    btn.addEventListener('click', sendChat);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
  }
}

function sendChat() {
  const inp = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');
  const t = inp.value.trim();
  if (!t) return;
  addMsg(t, 'user');
  inp.value = '';
  const typ = document.createElement('div');
  typ.className = 'msg msg-bot typing-m';
  typ.innerHTML = '<div class="msg-avi msg-avi-bot"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 13l2.5 2.5L16 10"/></svg></div><div class="msg-bubble"><div class="typing-ind"><span></span><span></span><span></span></div></div>';
  body.appendChild(typ);
  body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    typ.remove();
    addMsg(getAns(t), 'bot');
  }, 700 + Math.random() * 500);
}

function addMsg(t, type) {
  const body = document.getElementById('chat-body');
  const d = document.createElement('div');
  d.className = 'msg msg-' + type;
  const avi = type === 'bot' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 13l2.5 2.5L16 10"/></svg>' : '\u{1F464}';
  d.innerHTML = '<div class="msg-avi' + (type === 'bot' ? ' msg-avi-bot' : '') + '">' + avi + '</div><div class="msg-bubble"><p>' + t.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') + '</p></div>';
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}

function getAns(q) {
  const KB = D().KB;
  const l = q.toLowerCase();
  if (l.match(/register|registration|sign up|nvsp|form 6|epic|voter id/)) return KB.register;
  if (l.match(/electoral college|270|elector|lok sabha|parliament|rajya/)) return KB.electoral;
  if (l.match(/ways to vote|voting method|how to vote|mail|absentee|evm|vvpat|machine/)) return KB.methods;
  if (l.match(/primary|caucus|primaries|nomination|nominate|nota|none of the above/)) return KB.primaries;
  if (l.match(/election day|when is|when are|key date|date|schedule/)) return KB.dates;
  if (l.match(/requirement|run for|qualify|candidate|contest|eligib/)) return KB.candidate;
  if (l.match(/result|count|winner|certif|government form/)) return KB.results;
  return KB.fallback;
}

/* ---- Scroll Reveal ---- */
function initReveal() {
  const els = document.querySelectorAll('.section-head,.timeline-card,.phase-panel,.checklist-col,.readiness-card,.faq-list,.chat-container,.ov-card,.demo-wrapper');
  els.forEach(e => e.classList.add('reveal'));
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => obs.observe(e));
}
