const CACHE_NAME = 'gujihx-v2';

// AI 交互类 API — 必须实时网络，不可缓存
const NETWORK_ONLY_API = [
  '/api/chat',
  '/api/translate',
  '/api/annotate',
  '/api/tts',
];

// 需要预缓存的核心页面
const STATIC_ASSETS = [
  '/',
  '/reading',
  '/bestiary',
  '/poetry',
  '/dialogue',
  '/quiz',
  '/favorites',
  '/notes',
  '/achievements',
  '/settings',
  '/about',
];

// 安装时缓存核心页面
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// 请求拦截策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 仅处理 GET 请求
  if (request.method !== 'GET') return;

  // AI 交互类 API：network-only，离线返回 503
  if (NETWORK_ONLY_API.some((path) => url.pathname.startsWith(path))) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify({ error: '当前无网络连接，请稍后重试' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503,
        });
      })
    );
    return;
  }

  // 其他 API 请求：stale-while-revalidate（有缓存先用缓存，后台更新）
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((response) => {
              if (response.ok) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // 图片请求：缓存优先（图片不会变）
  if (request.destination === 'image' || url.pathname.startsWith('/images/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 页面和其他资源：network-first，失败则用缓存
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
