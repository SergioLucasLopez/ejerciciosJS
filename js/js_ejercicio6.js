// js/js_ejercicio6.js
(() => {
  const $ = (s) => document.querySelector(s);
  const display = $('#display');
  const btnStart = $('#btnStart');
  const btnPause = $('#btnPause');
  const btnReset = $('#btnReset');

  let timerId = null;   // id del setInterval activo (si lo hay)
  let elapsed = 0;      // milisegundos acumulados
  let startAt = 0;      // timestamp (ms) cuando se pulsó Iniciar

  const format = (ms) => {
    const total = Math.floor(ms / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const render = () => {
    display.textContent = format(elapsed);
  };

  const start = () => {
    if (timerId !== null) return; // para evitar múltiples intervalos
    // Si estaba pausado, reanuda desde el tiempo acumulado
    startAt = Date.now() - elapsed;
    timerId = setInterval(() => {
      elapsed = Date.now() - startAt; // cálculo por diferencia para una mayor precisión
      render();
    }, 250); // refresh cómodo (4 fps)
    btnStart.disabled = true;
    btnPause.disabled = false;
  };

  const pause = () => {
    if (timerId === null) return;
    clearInterval(timerId);
    timerId = null;
    render();
    btnStart.disabled = false;
    btnPause.disabled = true;
  };

  const reset = () => {
    pause();
    elapsed = 0;
    render();
  };

  // Eventos
  btnStart.addEventListener('click', start);
  btnPause.addEventListener('click', pause);
  btnReset.addEventListener('click', reset);

  // Estado inicial
  render();
})();
