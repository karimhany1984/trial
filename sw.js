const CACHE_NAME = 'trial-dynamic-v2';
const BASE = '/trial/';  // Your subdirectory path on GitHub Pages

// Files that MUST be available offline immediately
const PRE_CACHE_ASSETS = [
    BASE + 'index.html',
    BASE + 'manifest.json',
    BASE + 'icon.png',
    BASE + 'style.css',
    BASE + 'app.js',
    BASE + 'questions.json'
];

// Install: Cache all essential files
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(PRE_CACHE_ASSETS))
    );
    self.skipWaiting();
});

// Activate: Clean up old cache versions
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
    self.clients.claim();
});

// Fetch: Cache First, then Network (better for offline PWA)
self.addEventListener('fetch', e => {
    // Skip non-GET requests
    if (e.request.method !== 'GET') return;

    e.respondWith(
        caches.match(e.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(e.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => {
            // If offline and not in cache, return fallback for navigation
            if (e.request.mode === 'navigate') {
                return caches.match(BASE + 'index.html');
            }
        })
    );
});