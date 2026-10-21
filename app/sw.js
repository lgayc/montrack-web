/* Service worker de Montrack.
 *
 * Hace una sola cosa: que la app abra sin conexión. NO guarda datos --
 * los movimientos viven en IndexedDB, que el service worker ni toca.
 *
 * La estrategia es "la red primero, la caché si falla". Al revés (caché
 * primero) sería más rápido, pero dejaría a la gente con una versión
 * vieja después de publicar una nueva, y encima sin forma de enterarse.
 * Una app de dinero no puede quedarse atrás en silencio.
 */

// El nombre lleva la versión: al cambiar, el navegador trata la caché
// anterior como ajena y la borra en el paso de 'activate'.
const CACHE = 'montrack-1.0.57';

// Lo mínimo para que la app arranque estando sin conexión. El resto de
// archivos entran a la caché a medida que se piden.
const BASE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png'];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE)
      // Si un archivo de la lista falla, que no se caiga la instalación
      // entera: mejor una caché incompleta que ninguna.
      .then((cache) => Promise.allSettled(BASE.map((u) => cache.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nombres) => Promise.all(
        nombres.filter((n) => n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const peticion = evento.request;

  // Solo GET del propio sitio. Una petición a Google, a las fuentes o al
  // manifiesto de versiones tiene que ir siempre a la red: cachear la
  // respuesta de un login sería un fallo de seguridad, y cachear el
  // manifiesto dejaría el aviso de versión congelado para siempre.
  if (peticion.method !== 'GET') return;
  if (new URL(peticion.url).origin !== self.location.origin) return;

  evento.respondWith(
    fetch(peticion)
      .then((respuesta) => {
        // Solo se guarda lo que salió bien. Cachear un 404 o un 500 lo
        // volvería permanente.
        if (respuesta && respuesta.ok) {
          const copia = respuesta.clone();
          caches.open(CACHE).then((cache) => cache.put(peticion, copia));
        }
        return respuesta;
      })
      .catch(async () => {
        const guardada = await caches.match(peticion);
        if (guardada) return guardada;
        // Sin conexión y sin copia: si es una navegación, al menos la
        // pantalla principal.
        if (peticion.mode === 'navigate') {
          const inicio = await caches.match('./index.html');
          if (inicio) return inicio;
        }
        return new Response('Sin conexión', { status: 503, statusText: 'Sin conexión' });
      })
  );
});
