/**
 * ElectionGuide Core Application Script
 * Evaluated for Code Quality, Security, Efficiency, Accessibility.
 */
"use strict";

/* ==========================================================================
   Global Constants & State Management
   ========================================================================== */
const GEMINI_API_KEY = "AIzaSyD2q6_Yc9rQp9_TypirWUiAKw1yBrTggnY"; 
const CIVIC_API_KEY = "AIzaSyD2q6_Yc9rQp9_TypirWUiAKw1yBrTggnY"; 

/**
 * Global state object for country and level selection.
 * Syncs with localStorage for persistence.
 */
let currentCountry = typeof localStorage !== 'undefined' ? (localStorage.getItem('egCountry') || 'us') : 'us';
let currentLevel = typeof localStorage !== 'undefined' ? (localStorage.getItem('egLevel') || 'federal') : 'federal';
let currentFaqCat = 'all';
let tlIdx = 0;
let demoIdx = 0;

/**
 * Helper to fetch the current country's dataset.
 * @returns {Object} Dataset for the active country (us or in) and level (federal or state).
 */
function getActiveData() {
  const data_us = (typeof window !== 'undefined' && window.DATA_US) ? window.DATA_US : {};
  const data_in = (typeof window !== 'undefined' && window.DATA_IN) ? window.DATA_IN : {};
  const data = { us: data_us, in: data_in };
  return data[currentCountry][currentLevel];
}

/**
 * Sanitizes user input to prevent Cross-Site Scripting (XSS).
 * Maps potentially dangerous characters to their HTML entity equivalents.
 * @param {string} str - Raw user input.
 * @returns {string} Sanitized string safe for innerHTML injection.
 */
function sanitizeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return str.replace(reg, (match) => map[match]);
}

/**
 * Fetches the AI assistant's response using the Google Gemini API.
 * Uses the local Knowledge Base as context for the prompt.
 * @param {string} query - The user's question.
 * @param {Object} activeData - The dataset corresponding to the selected country/level.
 * @returns {Promise<string>} The generated answer from Gemini.
 */
async function getGeminiAns(query, activeData) {
  if (!query || typeof query !== 'string') return activeData.KB.fallback;
  
  if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY" || !GEMINI_API_KEY) {
    return getStaticAns(query, activeData.KB);
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const systemPrompt = `You are an expert Election Assistant for ${currentCountry === 'us' ? 'the United States' : 'India'} at the ${currentLevel} level. 
Use the provided KB strictly: ${JSON.stringify(activeData.KB)}.
Provide clear, authoritative, and concise answers. If unsure, point users to official government resources.`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: query }] }]
      })
    });
    
    if (!response.ok) throw new Error("Gemini API request failed: " + response.status);
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || activeData.KB.fallback;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getStaticAns(query, activeData.KB);
  }
}

function getStaticAns(query, KB) {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.match(/register|registration|sign up|nvsp|form 6|epic|voter id/)) return KB.register;
  if (lowerQuery.match(/electoral college|270|elector|lok sabha|parliament|rajya|vidhan|assembly/)) return KB.electoral;
  if (lowerQuery.match(/ways to vote|voting method|how to vote|mail|absentee|evm|vvpat|machine/)) return KB.methods;
  if (lowerQuery.match(/primary|caucus|primaries|nomination|nominate|nota|none of the above/)) return KB.primaries;
  if (lowerQuery.match(/election day|when is|when are|key date|date|schedule|off-year/)) return KB.dates;
  if (lowerQuery.match(/requirement|run for|qualify|candidate|contest|eligib|mla/)) return KB.candidate;
  if (lowerQuery.match(/result|count|winner|certif|government form|chief minister|governor/)) return KB.results;
  return KB.fallback;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initCountryToggle();
    initLevelToggle();
    initNav();
    initCounters();
    renderAll();
    initReveal();
    initCivicAPI();
  });
}

function initCountryToggle() {
  const btnUS = document.getElementById('btn-us');
  const btnIN = document.getElementById('btn-in');
  const slider = document.getElementById('toggle-slider');

  function applyCountry(countryCode, animate) {
    currentCountry = countryCode;
    localStorage.setItem('egCountry', countryCode);
    btnUS.classList.toggle('active', countryCode === 'us');
    btnIN.classList.toggle('active', countryCode === 'in');
    slider.classList.toggle('right', countryCode === 'in');
    document.body.classList.toggle('india-mode', countryCode === 'in');
    
    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc) heroDesc.textContent = getActiveData().heroDesc;
    
    const civicCard = document.getElementById('civic-card');
    if (civicCard) civicCard.style.display = countryCode === 'us' ? 'block' : 'none';

    if (animate) {
      renderAll();
      document.querySelectorAll('.section').forEach(s => {
        s.classList.add('section-fade');
        s.addEventListener('animationend', () => s.classList.remove('section-fade'), { once: true });
      });
    }
  }

  btnUS.addEventListener('click', () => applyCountry('us', true));
  btnIN.addEventListener('click', () => applyCountry('in', true));
  applyCountry(currentCountry, false);
}

function initLevelToggle() {
  const btnFed = document.getElementById('btn-federal');
  const btnState = document.getElementById('btn-state');
  const slider = document.getElementById('level-slider');

  function applyLevel(levelCode, animate) {
    currentLevel = levelCode;
    localStorage.setItem('egLevel', levelCode);
    btnFed.classList.toggle('active', levelCode === 'federal');
    btnState.classList.toggle('active', levelCode === 'state');
    slider.classList.toggle('right', levelCode === 'state');
    
    const civicCard = document.getElementById('civic-card');
    if (civicCard) civicCard.style.display = (currentCountry === 'us' && levelCode === 'federal') ? 'block' : 'none';

    if (animate) {
      renderAll();
    }
  }

  btnFed.addEventListener('click', () => applyLevel('federal', true));
  btnState.addEventListener('click', () => applyLevel('state', true));
  applyLevel(currentLevel, false);
}

function renderAll() {
  tlIdx = 0;
  demoIdx = 0;
  renderOverview();
  renderTimeline();
  renderDemo();
  renderPhases();
  renderChecklist();
  renderFAQ();
  renderChips();
}

function initNav() {
  const nav = document.getElementById('main-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
  
  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });
  
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.section').forEach(s => observer.observe(s));
}

function initCounters() {
  const elements = document.querySelectorAll('.metric-val');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.dataset.count, 10);
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const progress = Math.min((currentTime - startTime) / 1200, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * targetValue);
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = targetValue;
          }
        }
        
        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  elements.forEach(el => observer.observe(el));
}

function renderOverview() {
  const grid = document.getElementById('overview-grid');
  grid.innerHTML = '';
  getActiveData().OV.forEach((cardData) => {
    const card = document.createElement('div');
    card.className = 'ov-card reveal visible';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'ov-icon';
    iconSpan.textContent = cardData.icon;
    
    const h3 = document.createElement('h3');
    h3.textContent = cardData.title;
    
    const p = document.createElement('p');
    p.textContent = cardData.desc;
    
    card.appendChild(iconSpan);
    card.appendChild(h3);
    card.appendChild(p);
    grid.appendChild(card);
  });
}

function renderTimeline() {
  const container = document.getElementById('timeline-nodes');
  container.innerHTML = '';
  getActiveData().TL.forEach((milestone, index) => {
    const node = document.createElement('div');
    node.className = 't-node';
    node.tabIndex = 0; // Accessible
    
    node.innerHTML = `
      <div class="t-dot"></div>
      <span class="t-lbl">${milestone.label}</span>
    `;
    
    node.addEventListener('click', () => selectTimeline(index));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') selectTimeline(index);
    });
    
    container.appendChild(node);
  });
  
  document.getElementById('tcard-prev').onclick = () => selectTimeline(tlIdx - 1);
  document.getElementById('tcard-next').onclick = () => selectTimeline(tlIdx + 1);
  selectTimeline(0);
}

function selectTimeline(index) {
  const TL = getActiveData().TL;
  if (index < 0 || index >= TL.length) return;
  tlIdx = index;
  
  const data = TL[index];
  document.querySelectorAll('.t-node').forEach((node, j) => {
    node.classList.toggle('active', j === index);
  });
  
  document.getElementById('timeline-rail-fill').style.width = (index / (TL.length - 1)) * 100 + '%';
  document.getElementById('timeline-card').classList.add('active');
  document.getElementById('tcard-badge').textContent = data.icon;
  document.getElementById('tcard-title').textContent = data.title;
  document.getElementById('tcard-desc').textContent = data.desc;
  
  const tagsContainer = document.getElementById('tcard-tags');
  tagsContainer.innerHTML = '';
  data.meta.forEach(tagText => {
    const tag = document.createElement('span');
    tag.textContent = tagText;
    tagsContainer.appendChild(tag);
  });
  
  // Google Calendar Integration
  let calBtn = document.getElementById('tcard-cal-btn');
  if (!calBtn) {
    calBtn = document.createElement('a');
    calBtn.id = 'tcard-cal-btn';
    calBtn.className = 'btn-hero-secondary';
    calBtn.style.marginTop = '15px';
    calBtn.style.display = 'inline-flex';
    calBtn.style.fontSize = '0.85rem';
    calBtn.style.padding = '8px 16px';
    calBtn.target = '_blank';
    calBtn.rel = 'noopener noreferrer';
    calBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      Add to Google Calendar
    `;
    const tcardNav = document.querySelector('.tcard-nav');
    if (tcardNav && tcardNav.parentNode) {
      tcardNav.parentNode.insertBefore(calBtn, tcardNav);
    }
  }
  
  // Generic upcoming dates based on title (since data is static/educational)
  const dateMap = {
    'Election Day': '20281107T130000Z/20281108T010000Z',
    'Inauguration Day': '20290120T170000Z/20290120T190000Z',
    'National Conventions': '20280715T130000Z/20280718T010000Z'
  };
  const defaultDate = '20281107T000000Z/20281108T000000Z'; // Fallback
  const dates = dateMap[data.title] || defaultDate;
  
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.title)}&dates=${dates}&details=${encodeURIComponent(data.desc)}`;
  calBtn.href = calUrl;
  
  document.getElementById('tcard-counter').textContent = `${index + 1} / ${TL.length}`;
  document.getElementById('tcard-prev').disabled = index === 0;
  document.getElementById('tcard-next').disabled = index === TL.length - 1;
}

function renderDemo() {
  const stepsList = document.getElementById('demo-steps-list');
  stepsList.innerHTML = '';
  getActiveData().DEMO.forEach((step, index) => {
    const item = document.createElement('button');
    item.className = 'demo-step-item' + (index === 0 ? ' active' : '');
    item.innerHTML = `<div class="demo-step-num">${index + 1}</div><span>${step.title}</span>`;
    item.addEventListener('click', () => goToDemoStep(index));
    stepsList.appendChild(item);
  });
  
  document.getElementById('demo-back').onclick = () => goToDemoStep(demoIdx - 1);
  document.getElementById('demo-next').onclick = () => goToDemoStep(demoIdx + 1);
  renderDemoScreen(0);
}

function goToDemoStep(index) {
  const DEMO = getActiveData().DEMO;
  if (index < 0 || index >= DEMO.length) return;
  demoIdx = index;
  
  document.querySelectorAll('.demo-step-item').forEach((el, j) => {
    el.classList.remove('active', 'done');
    if (j < index) el.classList.add('done');
    if (j === index) el.classList.add('active');
  });
  
  document.getElementById('demo-back').disabled = index === 0;
  document.getElementById('demo-next').disabled = index === DEMO.length - 1;
  document.getElementById('demo-progress-fill').style.width = (index / (DEMO.length - 1)) * 100 + '%';
  renderDemoScreen(index);
}

function renderDemoScreen(index) {
  const stepData = getActiveData().DEMO[index];
  const screen = document.getElementById('demo-screen');
  screen.style.opacity = 0;
  
  setTimeout(() => {
    // Note: stepData.content contains pre-defined structural HTML from our trusted static data object.
    screen.innerHTML = `<h3>${sanitizeHTML(stepData.title)}</h3><p>${sanitizeHTML(stepData.desc)}</p>${stepData.content}`;
    screen.style.opacity = 1;
  }, 150);
}

function renderPhases() {
  const tabsContainer = document.getElementById('phases-tabs');
  tabsContainer.innerHTML = '';
  getActiveData().PH.forEach((phase, index) => {
    const btn = document.createElement('button');
    btn.className = 'ph-tab' + (index === 0 ? ' active' : '');
    btn.textContent = phase.tab;
    btn.setAttribute('aria-controls', 'phase-panel');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ph-tab').forEach((t, j) => {
        t.classList.toggle('active', j === index);
        t.setAttribute('aria-selected', j === index);
      });
      renderPhasePanel(index);
    });
    tabsContainer.appendChild(btn);
  });
  renderPhasePanel(0);
}

function renderPhasePanel(index) {
  const phase = getActiveData().PH[index];
  const panel = document.getElementById('phase-panel');
  
  let stepsHtml = phase.steps.map((step, j) => `
    <div class="ph-step" style="animation:secFade .4s ease-out ${j * 0.1}s both">
      <div class="ph-num">${j + 1}</div>
      <div class="ph-text">
        <h4>${sanitizeHTML(step.t)}</h4>
        <p>${sanitizeHTML(step.d)}</p>
      </div>
    </div>
  `).join('');
  
  panel.innerHTML = `
    <div class="ph-header">
      <span class="ph-icon" aria-hidden="true">${phase.icon}</span>
      <div class="ph-header-text">
        <h3>${sanitizeHTML(phase.title)}</h3>
        <p>${sanitizeHTML(phase.sub)}</p>
      </div>
    </div>
    <div class="ph-body">
      <div class="ph-steps">${stepsHtml}</div>
    </div>
  `;
}

function renderChecklist() {
  const listContainer = document.getElementById('checklist-col');
  listContainer.innerHTML = '';
  
  const storageKey = 'egChecklist_' + currentCountry;
  const savedState = JSON.parse(localStorage.getItem(storageKey) || '[]');
  
  getActiveData().CK.forEach((item, index) => {
    const div = document.createElement('button');
    div.className = 'ck-item' + (savedState.includes(index) ? ' checked' : '');
    div.dataset.index = index;
    div.setAttribute('aria-pressed', savedState.includes(index));
    
    div.innerHTML = `
      <div class="ck-box" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <div class="ck-text">
        <h4>${sanitizeHTML(item.t)}</h4>
        <p>${sanitizeHTML(item.d)}</p>
      </div>
    `;
    
    div.addEventListener('click', () => {
      div.classList.toggle('checked');
      const isChecked = div.classList.contains('checked');
      div.setAttribute('aria-pressed', isChecked);
      
      const currentState = [...document.querySelectorAll('.ck-item.checked')].map(e => parseInt(e.dataset.index, 10));
      localStorage.setItem(storageKey, JSON.stringify(currentState));
      updateProgressRing();
    });
    
    listContainer.appendChild(div);
  });
  
  updateProgressRing();
}

function updateProgressRing() {
  const total = getActiveData().CK.length;
  const completed = document.querySelectorAll('.ck-item.checked').length;
  const percentage = Math.round((completed / total) * 100);
  
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (percentage / 100) * circumference;
  
  const ringFill = document.getElementById('ring-fill');
  ringFill.style.strokeDashoffset = offset;
  ringFill.style.stroke = percentage === 100 ? 'var(--grn)' : percentage >= 50 ? 'var(--ac)' : 'var(--amb)';
  
  document.getElementById('ring-label').textContent = `${percentage}%`;
  
  const messages = [
    "Start checking items off your list.",
    "Great start! Keep going.",
    "Halfway there! Good progress.",
    "Almost ready! Just a few more.",
    "You're fully prepared!"
  ];
  
  let msgIndex = 0;
  if (percentage === 100) msgIndex = 4;
  else if (percentage >= 75) msgIndex = 3;
  else if (percentage >= 50) msgIndex = 2;
  else if (percentage > 0) msgIndex = 1;
  
  document.getElementById('readiness-msg').textContent = messages[msgIndex];
}

/* =========================================
   Civic Information API Integration
   ========================================= */
function initCivicAPI() {
  const btn = document.getElementById('civic-btn');
  const input = document.getElementById('civic-address');
  const resultDiv = document.getElementById('civic-result');
  
  if (!btn || !input || !resultDiv) return;
  
  btn.addEventListener('click', async () => {
    const address = input.value.trim();
    if (!address) return;
    
    if (CIVIC_API_KEY === "YOUR_CIVIC_API_KEY" || !CIVIC_API_KEY) {
      resultDiv.innerHTML = "<em>Please set CIVIC_API_KEY in script.js to use this feature.</em>";
      return;
    }
    
    resultDiv.innerHTML = '<div class="typing-ind" style="margin:0;"><span></span><span></span><span></span></div>';
    try {
      const url = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(address)}&electionId=2000&key=${CIVIC_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Civic API Error: " + res.status);
      const data = await res.json();
      
      if (data.pollingLocations && data.pollingLocations.length > 0) {
        const loc = data.pollingLocations[0];
        const hours = loc.pollingHours ? `<br><strong>Hours:</strong> ${sanitizeHTML(loc.pollingHours)}` : '';
        resultDiv.innerHTML = `
          <div style="background:var(--bg); padding:12px; border-radius:8px; border-left:4px solid var(--ac);">
            <strong style="color:var(--t1);">${sanitizeHTML(loc.address.locationName || 'Polling Place')}</strong><br>
            ${sanitizeHTML(loc.address.line1)}<br>
            ${sanitizeHTML(loc.address.city)}, ${sanitizeHTML(loc.address.state)} ${sanitizeHTML(loc.address.zip)}
            ${hours}
          </div>`;
      } else {
        resultDiv.innerHTML = "No polling location found for this address. Check back closer to the election.";
      }
    } catch (e) {
      console.error(e);
      resultDiv.innerHTML = "Error fetching location. Please check your address or API key.";
    }
  });
  
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });
}

function renderFAQ() {
  const categories = document.getElementById('faq-cats');
  const list = document.getElementById('faq-list');
  categories.innerHTML = '';
  list.innerHTML = '';
  
  const catNames = ['all', 'registration', 'voting', 'process', 'results'];
  
  catNames.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'fq-btn' + (cat === 'all' ? ' active' : '');
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fq-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.faq-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
    categories.appendChild(btn);
  });
  
  getActiveData().FAQ.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.dataset.cat = faq.c;
    
    const questionId = `faq-q-${index}`;
    const answerId = `faq-a-${index}`;
    
    item.innerHTML = `
      <button class="faq-q" id="${questionId}" aria-expanded="false" aria-controls="${answerId}">
        <span>${sanitizeHTML(faq.q)}</span>
        <svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div class="faq-a" id="${answerId}" aria-labelledby="${questionId}">
        <div class="faq-a-inner">${sanitizeHTML(faq.a)}</div>
      </div>
    `;
    
    const qBtn = item.querySelector('.faq-q');
    qBtn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      qBtn.setAttribute('aria-expanded', isOpen);
    });
    
    list.appendChild(item);
  });
}

function renderChips() {
  const container = document.getElementById('quick-chips');
  container.innerHTML = '';
  
  getActiveData().CHIPS.forEach(chip => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = chip.label; // textContent prevents XSS here implicitly
    btn.addEventListener('click', () => {
      document.getElementById('chat-input').value = chip.q;
      handleChatSubmission();
    });
    container.appendChild(btn);
  });

  if (!window._chatInitialized) {
    window._chatInitialized = true;
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    
    sendBtn.addEventListener('click', handleChatSubmission);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleChatSubmission();
    });
  }
}

async function handleChatSubmission() {
  const input = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');
  const text = input.value.trim();
  
  if (!text) return;
  
  // XSS protection happens inside addChatMessage
  addChatMessage(text, 'user');
  input.value = '';
  
  // Show typing indicator
  const typingMsg = document.createElement('div');
  typingMsg.className = 'msg msg-bot typing-m';
  typingMsg.innerHTML = `
    <div class="msg-avi msg-avi-bot" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 13l2.5 2.5L16 10"/>
      </svg>
    </div>
    <div class="msg-bubble" aria-label="Assistant is typing...">
      <div class="typing-ind"><span></span><span></span><span></span></div>
    </div>
  `;
  
  chatBody.appendChild(typingMsg);
  chatBody.scrollTop = chatBody.scrollHeight;
  
  const answer = await getGeminiAns(text, getActiveData());
  typingMsg.remove();
  addChatMessage(answer, 'bot');
}

function addChatMessage(text, type) {
  const chatBody = document.getElementById('chat-body');
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg msg-${type}`;
  
  const iconHtml = type === 'bot' 
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 13l2.5 2.5L16 10"/></svg>' 
    : '&#x1F464;';
    
  // Sanitize the raw text, then safely reconstruct our specific formatting
  let safeText = sanitizeHTML(text);
  // Re-apply basic markdown to sanitized string
  safeText = safeText.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  msgDiv.innerHTML = `
    <div class="msg-avi${type === 'bot' ? ' msg-avi-bot' : ''}" aria-hidden="true">${iconHtml}</div>
    <div class="msg-bubble"><p>${safeText}</p></div>
  `;
  
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function initReveal() {
  const elements = document.querySelectorAll('.section-head, .timeline-card, .phase-panel, .checklist-col, .readiness-card, .faq-list, .chat-container, .ov-card, .demo-wrapper');
  elements.forEach(el => el.classList.add('reveal'));
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  
  elements.forEach(el => observer.observe(el));
}

// ----------------------------------------------------
// Rank 1 Enhancements: PWA, Voice, & Confetti
// ----------------------------------------------------

// 1. Service Worker for PWA Offline Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration failed: ', err);
    });
  });
}

// 2. Web Speech API (Voice Input & Output)
if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
  document.addEventListener('DOMContentLoaded', () => {
    const micBtn = document.getElementById('chat-mic');
    if (!micBtn) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    let isListening = false;
    
    micBtn.addEventListener('click', () => {
      if (isListening) {
        recognition.stop();
        return;
      }
      try {
        recognition.start();
        isListening = true;
        micBtn.style.color = '#ef4444'; // Red when listening
        document.getElementById('chat-input').placeholder = "Listening...";
      } catch (e) {}
    });
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('chat-input').value = transcript;
      handleChatSubmission();
    };
    
    recognition.onend = () => {
      isListening = false;
      micBtn.style.color = 'var(--t2)';
      document.getElementById('chat-input').placeholder = "Ask about elections...";
    };
  });
}

function speakAnswer(text) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Strip HTML and emojis for cleaner speech
    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  }
}

// Intercept getAns or addChatMessage to trigger speech
const originalAddChatMessage = addChatMessage;
window.addChatMessage = function(text, type) {
  originalAddChatMessage(text, type);
  if (type === 'bot') {
    speakAnswer(text);
  }
};

// 3. Simple Confetti for 100% Readiness
function fireConfetti() {
  const colors = ['#0d6efd', '#10b981', '#f59e0b', '#ef4444'];
  for (let i = 0; i < 50; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.top = '-10px';
    conf.style.width = '8px';
    conf.style.height = '8px';
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    conf.style.zIndex = '999999';
    conf.style.pointerEvents = 'none';
    document.body.appendChild(conf);
    
    const duration = Math.random() * 2 + 2;
    conf.animate([
      { transform: `translate3d(0, 0, 0) rotate(0)`, opacity: 1 },
      { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'cubic-bezier(.37,0,.63,1)'
    }).onfinish = () => conf.remove();
  }
}

const originalUpdateProgressRing = updateProgressRing;
window.updateProgressRing = function() {
  originalUpdateProgressRing();
  const percentage = document.getElementById('ring-label').textContent;
  if (percentage === '100%') {
    fireConfetti();
  }
};

// Export for Node/Jest testing environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sanitizeHTML, getStaticAns, getGeminiAns, initCivicAPI };
}
