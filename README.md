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

## version.json

El manifiesto que la app consulta para saber si hay una versión más nueva.

```json
{
  "version": "1.0.43",
  "url": "https://github.com/lgayc/montrack-web/releases/latest",
  "notas": "Una línea, opcional, que sale bajo el aviso."
}
```

La app lo mira una vez al día. Si `version` es mayor que la instalada,
enseña una barra con el enlace de `url`. Reglas que la app aplica sobre
este archivo, por si alguna vez lo edita alguien más:

- `version` tiene que ser solo números y puntos (`1.0.44`). Cualquier otra
  cosa y la app ignora el manifiesto entero.
- `url` tiene que empezar por `https://`. Si no, se enseña el aviso sin
  botón de descarga, nunca con un enlace que no sea https.
- Si el archivo no está, no es JSON válido o la red falla, la app no dice
  nada y lo vuelve a mirar al día siguiente.

**Al publicar una versión nueva hay que subir aquí el número**, o la gente
no se entera de que existe.
