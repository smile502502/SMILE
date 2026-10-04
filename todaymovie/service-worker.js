/* 清泉看大片 PWA Service Worker（子目录部署版）v36：HTML 网络优先，旧缓存自动清理 */
const CACHE = 'qingquan-pwa-v36';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png'
];

// 安装：预缓存核心资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 取数：静态资源网络优先（HTML/JSON）、失败回退缓存；其余资源缓存优先
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 数据接口：网络优先
  if (url.hostname === 'smile502502.github.io' && url.pathname.indexOf('todaymovie_data.json') !== -1) {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
            return resp;
          }
          throw new Error('bad resp');
        })
        .catch(() => caches.match(event.request).then((m) => m || caches.match('./index.html')))
    );
    return;
  }

  // HTML 文档请求：网络优先，失败回退缓存（确保页面始终拿到最新版本）
  const isNavigate = event.request.mode === 'navigate';
  const isHtml = url.origin === location.origin &&
    (url.pathname === '/' || url.pathname.endsWith('index.html'));
  if (isNavigate || isHtml) {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
            return resp;
          }
          throw new Error('bad resp');
        })
        .catch(() => caches.match(event.request).then((m) => m || caches.match('./index.html')))
    );
    return;
  }

  // 静态资源（图标/manifest）：缓存优先，后台更新
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((resp) => {
          if (resp && resp.ok && (url.origin === location.origin)) {
            const copy = resp.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});
