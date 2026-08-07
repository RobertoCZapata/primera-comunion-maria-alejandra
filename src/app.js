// ---------- cuenta regresiva (hora Colombia UTC-5) ----------
const objetivo = new Date('2026-09-05T12:00:00-05:00').getTime();
const pad = n => String(Math.max(0, n)).padStart(2, '0');
function tick() {
  const dif = objetivo - Date.now();
  const d = Math.floor(dif / 864e5), h = Math.floor(dif % 864e5 / 36e5),
        m = Math.floor(dif % 36e5 / 6e4), s = Math.floor(dif % 6e4 / 1e3);
  cd.textContent = pad(d); ch.textContent = pad(h);
  cm.textContent = pad(m); cs.textContent = pad(s);
  if (dif < 0) document.getElementById('count').innerHTML = '<div style="min-width:auto;padding:14px 26px"><b>¡Hoy es el gran día!</b></div>';
}
tick(); setInterval(tick, 1000);

// ---------- agregar al calendario (Google Calendar; 12:00 COT = 17:00 UTC) ----------
const cal = new URLSearchParams({
  action: 'TEMPLATE',
  text: 'Primera Comunión de María Alejandra',
  dates: '20260905T170000Z/20260905T210000Z',
  details: 'Recepción 12:00 m. en Casa Antonio 1912.',
  location: 'Casa Antonio 1912, Bucaramanga'
});
document.getElementById('btn-cal').href = 'https://calendar.google.com/calendar/render?' + cal;

// ---------- animaciones de entrada ----------
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.15 });
document.querySelectorAll('.fade').forEach(el => io.observe(el));

// ---------- profundidad: la invitacion se queda atras al bajar ----------
// Se mueve a 1/3 de la velocidad del scroll y se apaga: da sensacion de capas,
// como si la tarjeta quedara sobre la mesa. Todo va por variables CSS, asi el
// pintado lo hace el compositor y no hay saltos en moviles lentos.
const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const portada = document.querySelector('.hero-wrap');
if (portada && !menosMovimiento) {
  let pendiente = 0;
  const actualiza = () => {
    pendiente = 0;
    const y = window.scrollY;
    if (y > innerHeight * 1.3) return;          // fuera de vista: no gastamos nada
    const p = Math.min(1, y / innerHeight);
    portada.style.setProperty('--py', (y * 0.32).toFixed(1) + 'px');
    portada.style.setProperty('--pop', (1 - p * 0.9).toFixed(3));
  };
  addEventListener('scroll', () => { if (!pendiente) pendiente = requestAnimationFrame(actualiza); }, { passive: true });
  actualiza();
}
