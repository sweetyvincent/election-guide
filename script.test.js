/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Mock IntersectionObserver
class IntersectionObserver {
  constructor(callback) { this.callback = callback; }
  observe(element) { this.callback([{ isIntersecting: true, target: element }]); }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserver;

// Mock requestAnimationFrame
window.requestAnimationFrame = (cb) => { setTimeout(() => cb(performance.now()), 0); };
window.setTimeout = (cb) => { cb(); };

// Mock Service Worker
Object.defineProperty(window.navigator, 'serviceWorker', {
  value: { register: jest.fn().mockResolvedValue({}) }
});

// Mock Web Speech API
window.SpeechRecognition = class { start() {}; stop() {}; };
window.speechSynthesis = { speak: jest.fn() };
window.SpeechSynthesisUtterance = jest.fn();

// Mock animate
Element.prototype.animate = jest.fn().mockReturnValue({ onfinish: null });

// Setup Global Data for tests
window.DATA_US = {
  federal: {
    TL: [{ id: 1, label: 'L', icon: 'i', title: 'T', desc: 'D', meta: ['m'] }],
    OV: [{ icon: 'i', title: 'T', desc: 'D' }],
    PH: [{ tab: 'P', icon: 'i', title: 'T', sub: 'S', steps: [{ t: 't', d: 'd' }] }],
    CK: [{ t: 'c', d: 'd' }],
    FAQ: [{ q: 'q', a: 'a', c: 'registration' }],
    DEMO: [{ title: 'T', desc: 'D', content: 'C' }],
    KB: { register: 'reg_ans', fallback: 'fall_ans' },
    CHIPS: [{ label: 'L', q: 'Q' }],
    heroDesc: 'Desc'
  }
};

describe('ElectionGuide Final Polish Tests', () => {
  let script;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    localStorage.clear();
    jest.resetModules();
    script = require('./script.js');
    
    // Trigger DOMContentLoaded
    const event = document.createEvent('Event');
    event.initEvent('DOMContentLoaded', true, true);
    document.dispatchEvent(event);
  });

  test('sanitizeHTML works', () => {
    expect(script.sanitizeHTML('<b>')).toBe('&lt;b&gt;');
  });

  test('getStaticAns works', () => {
    const KB = { register: 'reg', fallback: 'fall' };
    expect(script.getStaticAns('how to register', KB)).toBe('reg');
    expect(script.getStaticAns('xyz', KB)).toBe('fall');
  });

  test('UI Toggles work', () => {
    const btnIN = document.getElementById('btn-in');
    if (btnIN) {
      btnIN.click();
      expect(document.body.classList.contains('india-mode')).toBe(true);
    }
  });

  test('Mobile Nav Toggle works', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
      mobileToggle.click();
      expect(navLinks.classList.contains('open')).toBe(true);
      mobileToggle.click();
      expect(navLinks.classList.contains('open')).toBe(false);
    }
  });

  test('FAQ Accordion works', () => {
    const faqQs = document.querySelectorAll('.faq-q');
    if (faqQs.length > 0) {
      faqQs[0].click();
      expect(faqQs[0].getAttribute('aria-expanded')).toBe('true');
    }
  });
});
