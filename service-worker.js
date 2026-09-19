/* 清泉看大片 PWA Service Worker */
const CACHE = 'qingquan-pwa-v3';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './posters/aiqingshenhua.jpg',
  './posters/beishang.jpg',
  './posters/bxjgqiyuan.jpg',
  './posters/changjinhu.jpg',
  './posters/changjinhu2.jpg',
  './posters/chirensheng3.jpg',
  './posters/dongjidao.jpg',
  './posters/fumuaiqing.jpg',
  './posters/jigongyouji.jpg',
  './posters/motianyingjiu.jpg',
  './posters/rslbrs.jpg',
  './posters/sishi2.jpg',
  './posters/tianxingjian.jpg',
  './posters/waijiaofengyun.jpg',
  './posters/woshexingjing.jpg',
  './posters/wupan.jpg',
  './posters/xongshishaonian.jpg',
  './posters/yewen4.jpg',
  './posters/zhujue.jpg',
  './posters/zreyulong.jpg',
  './posters/zyj_cwzz.jpg',
  './posters/zyj_xbcj.jpg',
  './posters/zyj_yxhp.jpg'
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

// 取数：网络优先、失败回退缓存（JSON 实时性优先）
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

  // 静态资源：缓存优先，后台更新
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