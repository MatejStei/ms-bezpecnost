/* ============================================================================
   sw.js — Service Worker pro PWA režim

   Service worker je skript, který běží **mimo stránku** (v pozadí prohlížeče)
   a může zachytávat síťové požadavky. Tím nám umožňuje:

   1. Caching app shell (HTML, CSS, JS, ikony) — aplikace funguje offline
   2. Rychlé načítání — i když je net pomalý, app se zobrazí okamžitě z cache

   POZOR: Microsoft Graph API (skutečná data) NIKDY necachujeme. To by bylo
   bezpečnostní riziko (data v cache po odhlášení) a porušení zásady
   "data nikdy neopouštějí prohlížeč".

   Strategie: cache-first pro statické soubory, network-only pro Graph API.
   ============================================================================ */

const CACHE_VERSION = "v3.2.0";
const CACHE_NAME = "skolni-bezpecnost-" + CACHE_VERSION;

// Soubory, které tvoří "kostru" aplikace — bez nich app nefunguje
const APP_SHELL = [
  "./",
  "./index.html",
  "./config.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

// Při instalaci nového service workeru — stáhni shell do cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[sw] Cachuji app shell, verze " + CACHE_VERSION);
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting()) // hned aktivuj nový SW
  );
});

// Při aktivaci nového SW — smaž staré cache verze
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k.startsWith("skolni-bezpecnost-") && k !== CACHE_NAME)
          .map(k => {
            console.log("[sw] Mažu starou cache: " + k);
            return caches.delete(k);
          })
      );
    }).then(() => self.clients.claim()) // převezmi kontrolu hned, ne až po reload
  );
});

// Zachytávej síťové požadavky a rozhoduj, odkud je obsloužit
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // KRITICKÉ: Microsoft Graph a Microsoft login NIKDY necachujeme.
  // Jdou vždy přímo na síť, nikdy přes service worker cache.
  if (
    url.hostname.endsWith("microsoft.com") ||
    url.hostname.endsWith("microsoftonline.com") ||
    url.hostname.endsWith("msauth.net") ||
    url.hostname.endsWith("microsoft.net") ||
    url.hostname === "graph.microsoft.com" ||
    url.hostname === "login.live.com"
  ) {
    return; // nech projít rovnou na síť, žádné zacházení
  }

  // Pro vlastní statické soubory — cache-first
  if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) {
          return cached;
        }
        // Nemáme v cache → zkus síť, a pokud uspěje, ulož do cache
        return fetch(event.request).then(response => {
          // Ukládej jen úspěšné odpovědi pro náš origin
          if (response.ok && url.origin === self.location.origin) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          // Síť selhala a v cache nic nemáme — vrať fallback HTML
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
      })
    );
  }
});
