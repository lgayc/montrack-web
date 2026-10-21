// idioma.js
//
// Decide en qué idioma se ve el sitio, antes de que se pinte nada.
//
// Va en un archivo aparte porque son tres páginas. Estaba en línea dentro
// de index.html y duplicarlo tres veces es la forma segura de que dentro de
// un mes las tres hagan cosas distintas.
//
// IMPORTANTE: se carga con un <script src> normal -- sin defer ni async --
// y colocado DESPUÉS del <title> y de la meta description. Las dos cosas
// importan:
//
//   - Sin defer, el navegador lo ejecuta antes de pintar el <body>. Si se
//     decidiera el idioma después, se vería el español un instante y
//     saltaría al inglés.
//   - Después del <title>, porque de ahí saca el texto en español. Si
//     corriera antes, document.title estaría vacío.
//
// El español es el que está escrito en el HTML. El inglés viaja en
// atributos de <html>: data-titulo-en y data-descripcion-en, uno por
// página. El cuerpo del texto no pasa por aquí: está en el HTML, marcado
// con lang="es" y lang="en", y lo esconde el CSS.

(function () {
  var CLAVE = 'montrack_idioma';
  var raiz = document.documentElement;
  var meta = document.querySelector('meta[name="description"]');

  var TEXTOS = {
    es: {
      titulo: document.title,
      descripcion: meta ? meta.getAttribute('content') : ''
    },
    en: {
      titulo: raiz.getAttribute('data-titulo-en') || document.title,
      descripcion: raiz.getAttribute('data-descripcion-en') ||
                   (meta ? meta.getAttribute('content') : '')
    }
  };

  /** Lo que eligió la persona manda; si no eligió, lo que diga el navegador. */
  function elegido() {
    try {
      var guardado = localStorage.getItem(CLAVE);
      if (guardado === 'es' || guardado === 'en') return guardado;
    } catch (e) {
      // En una ventana privada o con el almacenamiento bloqueado esto
      // lanza. No es motivo para no cargar la página.
    }
    var suyo = (navigator.language || 'es').toLowerCase();
    return suyo.indexOf('es') === 0 ? 'es' : 'en';
  }

  function poner(idioma, recordar) {
    raiz.setAttribute('data-idioma', idioma);
    raiz.setAttribute('lang', idioma);

    document.title = TEXTOS[idioma].titulo;
    if (meta) meta.setAttribute('content', TEXTOS[idioma].descripcion);

    var botones = document.querySelectorAll('[data-ir]');
    for (var i = 0; i < botones.length; i++) {
      botones[i].setAttribute(
        'aria-current',
        botones[i].getAttribute('data-ir') === idioma ? 'true' : 'false'
      );
    }

    if (recordar) {
      try { localStorage.setItem(CLAVE, idioma); } catch (e) { /* ídem */ }
    }
  }

  poner(elegido(), false);

  // Delegado en el documento: el conmutador vive en el <body>, que cuando
  // esto corre todavía no existe.
  document.addEventListener('click', function (ev) {
    var boton = ev.target.closest && ev.target.closest('[data-ir]');
    if (!boton) return;
    ev.preventDefault();
    poner(boton.getAttribute('data-ir'), true);
  });

  // Y al terminar de cargar, para marcar el botón activo.
  document.addEventListener('DOMContentLoaded', function () {
    poner(raiz.getAttribute('data-idioma'), false);
  });
})();
