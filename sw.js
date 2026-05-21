const CACHE_NAME = 'cardapio-v1';
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  './coracao.png'
];

// Instala o Service Worker e guarda os arquivos essenciais no cache do celular
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa o Service Worker
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Serve os arquivos do cache quando o app for aberto
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
