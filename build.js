#!/usr/bin/env node
/**
 * Inyecta src/hero.svg dentro de src/index.template.html y genera index.html.
 * Uso:  node build.js        (una vez)
 *       node build.js --watch (recompila al guardar)
 *
 * ¿Por qué un build? El SVG del hero debe ir inline para heredar las fuentes
 * de Google Fonts y escalar sin pérdida. Tenerlo en un archivo aparte hace
 * que editar el diseño sea cómodo; el script lo mete al HTML final.
 */
const fs = require('fs');
const path = require('path');

const TEMPLATE = path.join(__dirname, 'src', 'index.template.html');
const HERO = path.join(__dirname, 'src', 'hero.svg');
const OUT = path.join(__dirname, 'index.html');

function build() {
  let svg = fs.readFileSync(HERO, 'utf8');

  // las @font-face en base64 no hacen falta: la página ya carga Google Fonts
  svg = svg.replace(/@font-face \{[^}]*base64[^}]*\}\s*/g, '');

  // la invitacion nunca debe recortarse: si el SVG no lo declara, forzamos "meet"
  if (!svg.includes('preserveAspectRatio')) {
    svg = svg.replace('<svg ', '<svg preserveAspectRatio="xMidYMid meet" ');
  }

  const tpl = fs.readFileSync(TEMPLATE, 'utf8');
  if (!tpl.includes('<!--HERO_SVG-->')) {
    console.error('✗ Falta el marcador <!--HERO_SVG--> en la plantilla');
    process.exit(1);
  }

  fs.writeFileSync(OUT, tpl.replace('<!--HERO_SVG-->', svg));
  const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
  console.log(`✓ index.html generado (${kb} KB) — ${new Date().toLocaleTimeString()}`);
}

build();

if (process.argv.includes('--watch')) {
  console.log('👀 Observando src/… (Ctrl+C para salir)');
  [TEMPLATE, HERO].forEach((f) => {
    let t;
    fs.watch(f, () => {
      clearTimeout(t);
      t = setTimeout(build, 80); // debounce: los editores guardan por partes
    });
  });
}
