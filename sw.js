const CACHE = "subjeknota-v1"; // <-- tukar versi cache jika buat salinan app baru
const ASSETS = [
  "index.html",
  "manifest.json",
  "Perniagaanicon-192.png",
  "Perniagaanicon-512.png"
]; // <-- tukar path icon jika buat salinan app baru

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting(); // <-- pastikan service worker activate segera
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
