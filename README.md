# Sitio web de Montrack

Página informativa de la app Montrack, publicada en
**https://montrack.869thesign.com** con GitHub Pages.

Este repositorio es público únicamente para que GitHub Pages pueda
servirlo. **El código de la aplicación no está aquí**: vive en un
repositorio privado aparte.

## Qué hay

```
index.html      Portada: qué es la app, funciones, descarga, preguntas
privacy.html    Política de privacidad
terms.html      Términos de uso
estilo.css      Hoja de estilos compartida
CNAME           montrack.869thesign.com
.nojekyll       Evita que GitHub procese el sitio con Jekyll
```

Son archivos estáticos: sin JavaScript, sin cookies y sin analítica.

## Cómo se publica

GitHub Pages sirve la rama `main` desde la raíz. Cualquier push a `main`
actualiza el sitio en un par de minutos.

## El instalador (APK)

El botón de descarga apunta a la **última release de este repositorio**.
Para publicar una versión nueva:

1. Descarga el APK del artefacto de la compilación (repositorio privado,
   pestaña Actions).
2. Aquí: *Releases → Draft a new release*, crea la etiqueta (`v1.0.38`,
   por ejemplo) y adjunta el `.apk`.

Mientras no haya ninguna release publicada, ese botón lleva a una página
vacía.

## Configuración del dominio

- **Cloudflare** — registro `CNAME`: `montrack` → `lgayc.github.io`,
  con la nube **gris (DNS only)** hasta que GitHub emita el certificado.
- **GitHub** — *Settings → Pages*: rama `main`, carpeta `/ (root)`,
  dominio personalizado `montrack.869thesign.com`, y *Enforce HTTPS* cuando
  la casilla deje de estar en gris.
