var cacheName = 'product-hunt-cache';

self.addEventListener('install', event => { event.waitUntil(
	caches.open(cacheName).then(cache => cache.addAll([
		'/bootstrap.js',
    '/static/js/bundle.js',
    '/index.html',
    '/',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/sw.js']))
	);
});

//fetch
self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response)
				return response;

			var fetchRequest = event.request.clone();
			return fetch(fetchRequest).then(function(fetchResponse){
				if(!fetchResponse || fetchResponse.status !== 0)
					return fetchResponse;

				var responseToCache = fetchResponse.clone();

				caches.open(cacheName).then(function(cache) {
					cache.put(event.request, responseToCache);
				});

				return fetchResponse;
			});
		})
	)
})

// SEE : https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
// WORKING with one error :
// Failed to load resource: net::ERR_INTERNET_DISCONNECTED
// The FetchEvent for "http://localhost:3000/sockjs-node/info?t=1502976701002" resulted in a network error response: an object that was not a Response was passed to respondWith().
// Promise resolved (async)
// (anonymous) @ sw.js:64
// VM192:1 GET http://localhost:3000/sockjs-node/info?t=1502976701002 net::ERR_FAILED
//
//
//
//
// var filesToCache = [
//   '.',
//   '/bootstrap.js',
//   '/static/js/bundle.js',
//   '/index.html',
//   '/',
//   'https://fonts.googleapis.com/icon?family=Material+Icons',
//   '/sw.js'
//
// ];
//
// var staticCacheName = 'pages-cache-v1';
//
// self.addEventListener('install', function(event) {
//   console.log('Attempting to install service worker and cache static assets');
//   event.waitUntil(
//     caches.open(staticCacheName)
//     .then(function(cache) {
//       return cache.addAll(filesToCache);
//     })
//   );
// });
//
// self.addEventListener('fetch', function(event) {
//   console.log('Fetch event for ', event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         console.log('Found ', event.request.url, ' in cache');
//         return response;
//       }
//       console.log('Network request for ', event.request.url);
//       return fetch(event.request)
//
//       // TODO 4 - Add fetched files to the cache
//
//     }).catch(function(error) {
//
//       // TODO 6 - Respond with custom offline page
//
//     })
//   );
// });
//
// self.addEventListener('activate', function(event) {
//   console.log('Activating new service worker...');
//
//   var cacheWhitelist = [staticCacheName];
//
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
