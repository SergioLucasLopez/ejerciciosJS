// js/js_ejercicio5.js
(() => {
  const $ = (s) => document.querySelector(s);
  const n1 = $('#n1');
  const n2 = $('#n2');
  const msg = $('#mensaje');

  const leerNumero = (el) => {
    // Admite coma o punto decimal
    const val = el.value.trim().replace(',', '.');
    const num = parseFloat(val);
    return Number.isFinite(num) ? num : null;
  };

  const validar = (a, b, op) => {
    if (a === null || b === null) {
      return 'Introduce números válidos en ambos campos.';
    }
    if (op === 'dividir' && b === 0) {
      return 'No se puede dividir entre cero.';
    }
    return null; // a ido todo OK
  };

  const mostrarError = (texto) => {
    msg.className = 'msg error';
    msg.textContent = `${texto}`;
  };

  const mostrarResultado = (valor) => {
    msg.className = 'msg ok';
    msg.textContent = `Resultado: ${valor}`;
  };

  const calcular = (op) => {
    const a = leerNumero(n1);
    const b = leerNumero(n2);
    const error = validar(a, b, op);
    if (error) return mostrarError(error);

    let r;
    switch (op) {
      case 'sumar':        r = a + b; break;
      case 'restar':       r = a - b; break;
      case 'multiplicar':  r = a * b; break;
      case 'dividir':      r = a / b; break;
      default: return;
    }
    mostrarResultado(r);
  };

  // Enlazamos botones
  $('#btnSumar').addEventListener('click', () => calcular('sumar'));
  $('#btnRestar').addEventListener('click', () => calcular('restar'));
  $('#btnMultiplicar').addEventListener('click', () => calcular('multiplicar'));
  $('#btnDividir').addEventListener('click', () => calcular('dividir'));

  // UX: si pulsamos Enter en un input, intentamos sumar por defecto
  [n1, n2].forEach((el) => el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calcular('sumar');
  }));
})();
