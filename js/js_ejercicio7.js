// js/js_ejercicio7.js
(() => {
  const $ = (s) => document.querySelector(s);
  const lenEl = $('#len');
  const outEl = $('#out');
  const msgEl = $('#msg');
  const btnGen = $('#btnGen');
  const btnCopy = $('#btnCopy');

  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const NUMS  = '0123456789';
  // símbolos comunes y seguros para contraseñas
  const SYMS  = '!@#$%^&*()-_=+[]{};:,<.>/?';

  // Random seguro si hay Web Crypto, si no, fallback a Math.random
  const randomInt = (max) => {
    if (window.crypto && crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  const pick = (pool) => pool[randomInt(pool.length)];

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generar = (len) => {
    // Aseguramos al menos 1 de cada tipo
    const must = [pick(LOWER), pick(UPPER), pick(NUMS), pick(SYMS)];
    const all  = LOWER + UPPER + NUMS + SYMS;

    const rest = [];
    for (let i = must.length; i < len; i++) {
      rest.push(pick(all));
    }
    return shuffle([...must, ...rest]).join('');
  };

  const validarLongitud = (raw) => {
    const n = Math.floor(Number(raw));
    if (!Number.isFinite(n)) return { ok: false, msg: 'Introduce un número válido.' };
    if (n < 4) return { ok: false, msg: 'La longitud debe ser mayor o igual a 4.' };
    if (n > 128) return { ok: false, msg: 'Longitud máxima recomendada: 128.' };
    return { ok: true, n };
  };

  const setError = (t) => { msgEl.className = 'msg error'; msgEl.textContent = `⚠️ ${t}`; };
  const setOk    = (t) => { msgEl.className = 'msg ok';    msgEl.textContent = t; };

  const onGenerar = () => {
    const { ok, n, msg } = validarLongitud(lenEl.value);
    if (!ok) {
      setError(msg);
      outEl.value = '';
      return;
    }
    const pass = generar(n);
    outEl.value = pass;
    setOk(`Contraseña generada (${n} caracteres).`);
  };

  const onCopiar = async () => {
    if (!outEl.value) return;
    try {
      await navigator.clipboard.writeText(outEl.value);
      setOk('Contraseña copiada al portapapeles.');
    } catch {
      setError('No se pudo copiar al portapapeles.');
    }
  };

  btnGen.addEventListener('click', onGenerar);
  btnCopy.addEventListener('click', onCopiar);
  lenEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') onGenerar(); });
})();
