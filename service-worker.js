const CACHE_NAME = 'app-cache-v1'

// Liste des assets statiques à pré-cacher
const STATIC_ASSETS = ['/', '/index.html', '/manifest.webmanifest']

// 1) INSTALL — pré-cache des assets statiques
self.addEventListener('install', (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
   )
   self.skipWaiting() // active immédiatement la nouvelle version
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
   self.clients.claim() // prend le contrôle des pages ouvertes
})

// 3) FETCH — stratégie Network First
self.addEventListener('fetch', (event) => {
   const request = event.request

   // On ignore les requêtes non GET (POST, PUT…)
   if (request.method !== 'GET') return

   event.respondWith(
      fetch(request)
         .then((response) => {
            // On met à jour le cache avec la réponse réseau
            const cloned = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned))
            return response
         })
         .catch(() => {
            // Si offline → fallback cache
            return caches.match(request).then((cached) => {
               return cached || caches.match('/index.html')
            })
         }),
   )
})
