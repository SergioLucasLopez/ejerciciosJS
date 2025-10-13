// js/js_ejercicio4.js
(() => {
  const $ = (s) => document.querySelector(s);
  const input = $('#txtFiltro');
  const lista = $('#lista');
  const estado = $('#estado');

  // Lista predefinida
  const items = ['Perro', 'Gato', 'Pez', 'Tortuga', 'Canario', 'Hámster', 'Iguana', 'Caballo'];

  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const render = (filtro = '') => {
    const q = filtro.trim().toLowerCase();
    lista.innerHTML = '';

    const visibles = items.filter(txt => txt.toLowerCase().includes(q));

    if (visibles.length === 0) {
      estado.textContent = 'Sin resultados';
      return;
    }

    estado.textContent = q ? `Coincidencias: ${visibles.length}` : 'Mostrando todos';

    const rx = q ? new RegExp(escapeRegExp(q), 'ig') : null;

    visibles.forEach(txt => {
      const li = document.createElement('li');
      li.innerHTML = rx ? txt.replace(rx, (m) => `<mark>${m}</mark>`) : txt;
      lista.appendChild(li);
    });
  };

  input.addEventListener('input', () => render(input.value));
  render(); // inicial
})();
