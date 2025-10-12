// js/js_ejercicio2.js
(() => {
  const btn = document.getElementById('btnContar');
  const texto = document.getElementById('textoClics');

  let contador = 0;

  btn.addEventListener('click', () => {
    contador += 1;
    texto.textContent = `Clics: ${contador}`;
  });
})();
