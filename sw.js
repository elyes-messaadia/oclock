const CACHE_NAME = 'horloge-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/scripts/app.js',
  '/scripts/timer.js',
  '/scripts/stopwatch.js',
  '/scripts/clock.js',
  '/scripts/alarm.js',
  '/assets/sounds/alarm.mp3',
  '/assets/sounds/timer-end.mp3',
  '/assets/images/icon-192x192.png',
  '/assets/images/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
