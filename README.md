# Fauna Tapantí - Tarjetario Educativo

PWA educativa **offline-first** para registrar observaciones de fauna y flora del Parque Nacional Tapantí - Macizo de la Muerte.

## Tecnologías

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- next-pwa (instalable + service worker)
- Dexie.js + IndexedDB para hallazgos offline
- JSON local (`/data/species.json`)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build offline/PWA

```bash
npm run build
npm run start
```

## Despliegue en GitHub Pages

Este proyecto usa `output: "export"`, por lo que genera archivos estáticos en `out/`.

1. Ejecuta build:

```bash
npm run build
```

2. Publica el contenido de `out/` en la rama `gh-pages` (puedes usar GitHub Actions o un deploy manual).

3. En GitHub: **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` y carpeta `/ (root)`

4. Si necesitas servirlo en subruta, define `NEXT_PUBLIC_BASE_PATH` (por ejemplo `/Tapanti-Desk`) y ajusta también `basePath` + `assetPrefix` en `next.config.mjs`.

## Funcionalidades

- Registro inicial de estudiante con localStorage.
- Tarjetario con búsqueda y filtros por categoría.
- Vista de detalle tipo tarjeta de colección.
- Botón **✓ ¡La Observé!** con guardado local offline en IndexedDB.
- Pantalla **Mis Hallazgos** con contador, rejilla y listado.
- Pantalla **Exportar / Comparar** con resumen compartible.
- Banner: **Listo para usar sin internet en Tapantí**.
