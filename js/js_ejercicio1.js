// js/js_ejercicio1.js
(() => {
  const btn = document.getElementById('btnCambiarColor');
  const label = document.getElementById('colorActual');

  const randomColor = () =>
    `hsl(${Math.floor(Math.random()*360)} 90% 70%)`;

  btn.addEventListener('click', () => {
    const c = randomColor();
    document.body.style.backgroundColor = c;
    label.textContent = `Color actual: ${c}`;
  });
})();
