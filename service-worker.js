const CACHE_NAME = 'app-cache-v1.1'

// Liste des assets statiques à pré-cacher
const STATIC_ASSETS = [
   './',
   './index.html',
   './manifest.webmanifest',
   './icons/icon-192.png',
   './icons/icon-512.png',
]

// 1) INSTALL — pré-cache des assets statiques
self.addEventListener('install', (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
   )
   self.skipWaiting()
})

// 2) ACTIVATE — nettoyage des anciens caches
self.addEventListener('activate', (event) => {
   event.waitUntil(
      caches
         .keys()
         .then((keys) =>
            Promise.all(
               keys
                  .filter((key) => key !== CACHE_NAME)
                  .map((key) => caches.delete(key)),
            ),
         ),
   )
   self.clients.claim()
})

// 3) FETCH — stratégie Network First
self.addEventListener('fetch', (event) => {
   const request = event.request

   if (request.method !== 'GET') return

   event.respondWith(
      fetch(request)
         .then((response) => {
            const cloned = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned))
            return response
         })
         .catch(() => {
            return caches.match(request).then((cached) => {
               return cached || caches.match('./index.html')
            })
         }),
   )
})
