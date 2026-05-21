const CACHE_NAME = 'cardapio-v2';
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  './coracao.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Usar o método simples para evitar travamentos caso falte algum arquivo
      return cache.addAll(ASSETS).catch(err => console.log("Aviso de cache:", err));
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
