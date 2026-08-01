// ---------- cuenta regresiva (hora Colombia UTC-5) ----------
const objetivo = new Date('2026-09-05T10:00:00-05:00').getTime();
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

// ---------- agregar al calendario (Google Calendar; 10:00 COT = 15:00 UTC) ----------
const cal = new URLSearchParams({
  action: 'TEMPLATE',
  text: 'Primera Comunión de María Alejandra',
  dates: '20260905T150000Z/20260905T180000Z',
  details: 'Ceremonia 10:00 a.m. en el Sagrado Corazón de Jesús. Recepción al finalizar en la Hacienda Casa Antonio.',
  location: 'Parroquia Sagrado Corazón de Jesús, Bucaramanga'
});
document.getElementById('btn-cal').href = 'https://calendar.google.com/calendar/render?' + cal;

// ---------- animaciones de entrada ----------
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.15 });
document.querySelectorAll('.fade').forEach(el => io.observe(el));
