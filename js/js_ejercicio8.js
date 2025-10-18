// js/js_ejercicio8.js
(() => {
  const $ = (s) => document.querySelector(s);
  const area = $('#texto');
  const outWords = $('#palabras');
  const outChars = $('#caracteres');

  const contar = (str) => {
    // Normaliza saltos de línea a espacios para separar palabras por espacios
    const soloEspacios = str.replace(/\n+/g, ' ');

    // Palabras = secuencias separadas por espacios (múltiples espacios no cuentan doble)
    const tokens = soloEspacios.trim().split(' ').filter(t => t.length > 0);
    const palabras = tokens[0] === '' ? 0 : tokens.length;

    // Caracteres SIN espacios ni saltos de línea (y sin tabs)
    const caracteres = str.replace(/\s/g, '').length;

    return { palabras, caracteres };
  };

  const render = () => {
    const { palabras, caracteres } = contar(area.value);
    outWords.textContent = palabras;
    outChars.textContent = caracteres;
  };

  area.addEventListener('input', render);
  render(); // inicial
})();
