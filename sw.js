const CACHE_NAME = 'einkauf-v5'; // Wichtig: v5!
const ASSETS = [
  './index.html',
  './manifest.json',
  './shopping_22120.png'
];

// Installation: Dateien in den Cache laden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Erzwingt, dass der neue SW sofort aktiv wird
});

// Aktivierung: Alten Cache aufräumen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch-Event: Erst im Cache suchen, dann Netzwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Optional: Hier könnte man eine Fallback-Seite liefern
      });
    })
  );
});
