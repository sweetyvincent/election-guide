const CACHE_NAME = 'election-guide-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './country-toggle.css',
  './script.js',
  './data-us.js',
  './data-india.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
