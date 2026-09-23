/* A股新指标监控 PWA Service Worker */
var CACHE='rsi-monitor-pwa-v1';
var CORE=[
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 安装：预缓存核心资源
self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(CACHE).then(function(cache){return cache.addAll(CORE)}).then(function(){return self.skipWaiting()})
  );
});

// 激活：清理旧缓存
self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
    }).then(function(){return self.clients.claim()})
  );
});

// 请求拦截：核心资源 cache-first，API 请求不缓存
self.addEventListener('fetch',function(event){
  var url=new URL(event.request.url);
  // 只处理同源 GET 请求
  if(event.request.method!=='GET'||url.origin!==self.location.origin){
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(resp){
      if(resp)return resp;
      return fetch(event.request).then(function(resp){
        // 成功时缓存副本
        if(resp.ok){
          var clone=resp.clone();
          caches.open(CACHE).then(function(cache){cache.put(event.request,clone)});
        }
        return resp;
      }).catch(function(){
        // 离线时回退到缓存中的 index.html
        return caches.match('./index.html');
      });
    })
  );
});
