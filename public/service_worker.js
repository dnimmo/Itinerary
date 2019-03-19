const version = 'Wartortle';
const dynamicCacheVersion = `${version}-dynamic`;

const isDynamic = url => url.includes('travel.cloud/users/user/futureBookings');

const fetchAndUpdateCache = request => fetch(request)
  .then((response) => {
    if (response) {
      const cacheToUse = isDynamic(request.url) ? dynamicCacheVersion : version;
      return caches.open(cacheToUse)
        .then(cache => cache.put(request, response.clone())
          .then(() => response),
        );
    }
    return console.error('No response');
  });

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(version)
      .then(cache =>
        cache.addAll([
          './index.html',
          './global.css',
          './favicon.ico',
        ]),
      ),
  );
});

self.addEventListener('activate', (event) => {
  // Delete any cached assets that don't match the current version
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(x => (x !== version && x !== dynamicCacheVersion))
          .map(y => caches.delete(y)),
      ),
      ),
  );
});

self.addEventListener('fetch',
  (event) => {
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request)
        .then((res) => {
          if (res) {
            return res;
          }
          if (!navigator.onLine) {
            return caches.match(event.request);
          }
          return fetchAndUpdateCache(event.request);
        }),
    );
  },
);
