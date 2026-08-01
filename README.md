# Invitación · Primera Comunión de María Alejandra

Invitación digital de una sola página. HTML + CSS + JS, sin frameworks ni dependencias.
El diseño es un SVG vectorial hecho a mano, así que se ve nítido en cualquier pantalla.

**Evento:** sábado 5 de septiembre de 2026 · Ceremonia 10:00 a.m. (Sagrado Corazón de Jesús) · Recepción al finalizar (Hacienda Casa Antonio)

---

## Estructura

```
.
├── index.html               ← GENERADO por build.js (no editar a mano)
├── build.js                 ← inyecta el SVG del hero en la plantilla
├── src/
│   ├── index.template.html  ← estructura de la página (secciones, textos, links)
│   ├── styles.css           ← estilos (variables de la paleta arriba del todo)
│   ├── app.js               ← cuenta regresiva, link de calendario, animaciones
│   └── hero.svg             ← la ilustración de la invitación (1080×2200)
└── assets/
    ├── preview.jpg          ← imagen para og:image (preview del link en WhatsApp)
    ├── invitacion-4-5.svg   ← versión 4:5 (formato para enviar como imagen)
    └── invitacion-whatsapp.png
```

## Desarrollo

```bash
node build.js            # genera index.html
node build.js --watch    # regenera al guardar (recomendado con Cursor)
npx serve .              # servidor local, o simplemente abre index.html
```

No hay `npm install`: build.js solo usa módulos nativos de Node.

---

## TODO antes de publicar

- [ ] **Verificar ubicaciones.** En `src/index.template.html`, los botones de Maps y Waze
      buscan por nombre + "Bucaramanga". Confirma que resuelvan al lugar correcto;
      si no, cambia el `query=` por la dirección exacta o por coordenadas (`query=7.1193,-73.1227`).
- [ ] **Confirmar el número de RSVP** (`wa.me/573143143863`).
- [ ] **Código de vestuario**: si lo definen, agregar una sección (ver plantilla más abajo).
- [ ] Revisar en un celular real, no solo en el emulador del navegador.

---

## Guía rápida de edición

### Cambiar textos del evento
Los datos aparecen en **dos lugares** y deben coincidir:
1. `src/hero.svg` → los `<text>` al final del archivo (los de la ilustración)
2. `src/index.template.html` → las tarjetas de ubicación y el `<meta og:description>`

### Cambiar colores
Todo sale de las variables CSS al inicio de `src/styles.css`:

```css
--marfil: #FBF7F1;  --crema: #F6ECDD;   --beige: #EADBC2;
--salvia: #C9D6C3;  --eucalipto: #A9BCA9;
--tinta: #6E5D41;   --tinta-verde: #5C6E52;  --oro: #C9A961;
```
En `hero.svg` los mismos tonos están como valores literales (los SVG no leen las variables del documento).

### Agregar una sección nueva
```html
<section class="fade">
  <h2>Código de vestuario</h2>
  <div class="divisor"><i></i></div>
  <p class="nota">Formal · Tonos claros</p>
</section>
```
La clase `fade` activa la animación de entrada automáticamente.

---

## Notas técnicas (por si tocas el layout)

- **`100svh` / `100dvh`**: la primera pantalla usa alto de viewport dinámico. No cambiar a `100vh`:
  en móvil mide sin la barra de direcciones y la invitación queda cortada al cargar.
- **`preserveAspectRatio="xMidYMid slice"`**: hace que el SVG llene la pantalla (equivale a `object-fit: cover`).
  Recorta los bordes laterales, por eso el lienzo es 1080×2200 (ratio 0.49, cercano al de un celular).
- **Zona segura del hero**: mantén cualquier texto dentro de `x ∈ [40, 1040]` e `y ∈ [130, 2070]`.
  Fuera de ahí se recorta en pantallas con proporciones extremas.
- **`viewport-fit=cover` + `env(safe-area-inset-bottom)`**: la página se extiende bajo la barra de
  gestos del iPhone, pero el texto la respeta.

## Deploy en Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # producción
```
Sitio estático, sin configuración. También sirve arrastrar la carpeta en vercel.com/new.

Cuando esté el dominio, actualiza `og:image` en la plantilla a la URL absoluta
(`https://tu-dominio.vercel.app/assets/preview.jpg`) — WhatsApp no siempre resuelve rutas relativas
para la miniatura del enlace.

## Cómo enviarla

1. La imagen `assets/invitacion-whatsapp.png` **como documento** (no como foto: WhatsApp no la recomprime).
2. Debajo, el link del sitio: *"Confirma tu asistencia y encuentra las ubicaciones aquí 👆"*
