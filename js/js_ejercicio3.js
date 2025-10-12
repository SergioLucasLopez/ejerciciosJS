// js/js_ejercicio3.js
(() => {
  const $ = (sel) => document.querySelector(sel);
  const input = $('#txtItem');
  const btn = $('#btnAgregar');
  const ul = $('#lista');
  const estado = $('#estado');

  const actualizarEstado = () => {
    estado.textContent = ul.children.length === 0
      ? 'La lista está vacía.'
      : `Total de ítems: ${ul.children.length}`;
  };

  const crearLi = (texto) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = texto;

    const del = document.createElement('button');
    del.type = 'button';
    del.textContent = 'Eliminar';
    del.addEventListener('click', () => {
      li.remove();
      actualizarEstado();
      input.focus();
    });

    li.append(span, del);
    return li;
  };

  const agregar = () => {
    const texto = input.value.trim();
    if (!texto) {
      input.focus();
      return;
    }
    ul.appendChild(crearLi(texto));
    input.value = '';
    actualizarEstado();
    input.focus();
  };

  btn.addEventListener('click', agregar);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') agregar();
  });

  actualizarEstado();
})();
