const { sanitizeHTML, getAns } = require('./script.js');

describe('Security: sanitizeHTML', () => {
  test('escapes XSS characters', () => {
    const dangerousInput = '<script>alert("XSS")</script>';
    const safeOutput = sanitizeHTML(dangerousInput);
    expect(safeOutput).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
  });

  test('preserves safe text', () => {
    expect(sanitizeHTML('Hello world')).toBe('Hello world');
  });

  test('escapes ampersands properly', () => {
    expect(sanitizeHTML('Ben & Jerry')).toBe('Ben &amp; Jerry');
  });
});

describe('Logic: getAns', () => {
  const dummyKB = {
    register: 'registration_answer',
    electoral: 'electoral_answer',
    methods: 'methods_answer',
    fallback: 'fallback_answer'
  };

  test('returns register answer for registration keywords', () => {
    expect(getAns('how do i register', dummyKB)).toBe('registration_answer');
    expect(getAns('nvsp portal link', dummyKB)).toBe('registration_answer');
  });

  test('returns electoral answer for college/lok sabha keywords', () => {
    expect(getAns('lok sabha seats', dummyKB)).toBe('electoral_answer');
    expect(getAns('270 to win', dummyKB)).toBe('electoral_answer');
  });

  test('returns methods answer for voting method keywords', () => {
    expect(getAns('evm vvpat', dummyKB)).toBe('methods_answer');
    expect(getAns('mail ballot', dummyKB)).toBe('methods_answer');
  });

  test('returns fallback for unknown queries', () => {
    expect(getAns('who is the president of france?', dummyKB)).toBe('fallback_answer');
  });

  test('returns fallback for empty queries', () => {
    expect(getAns('', dummyKB)).toBe('fallback_answer');
    expect(getAns(null, dummyKB)).toBe('fallback_answer');
  });
});
