// js/js_ejercicio9.js
(() => {
  const $ = (s) => document.querySelector(s);
  const input = $('#taskText');
  const btnAdd = $('#btnAdd');
  const btnClear = $('#btnClearCompleted');
  const list = $('#list');
  const stats = $('#stats');

  const KEY = 'ej9_todos_v1';

  /** ----- Persistencia ----- **/
  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const save = (todos) => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  };

  /** ----- Estado ----- **/
  let todos = load(); // [{id, text, done}]

  const uid = () =>
    (crypto?.randomUUID?.() ?? `id_${Date.now()}_${Math.random().toString(16).slice(2)}`);

  /** ----- Render ----- **/
  const render = () => {
    list.innerHTML = '';
    todos.forEach(({ id, text, done }) => {
      const li = document.createElement('li');
      li.dataset.id = id;
      if (done) li.classList.add('done');

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = done;
      cb.addEventListener('change', onToggle);

      const span = document.createElement('span');
      span.className = 'text';
      span.textContent = text;

      // (Opcional) botón eliminar individual
      const del = document.createElement('button');
      del.textContent = 'Eliminar';
      del.addEventListener('click', onDelete);

      li.append(cb, span, del);
      list.appendChild(li);
    });

    const total = todos.length;
    const done = todos.filter(t => t.done).length;
    stats.textContent = total === 0
      ? 'No hay tareas'
      : `${total} tarea${total!==1?'s':''} — ${done} completada${done!==1?'s':''}`;
  };

  /** ----- Acciones ----- **/
  const add = () => {
    const text = input.value.trim();
    if (!text) {
      input.focus();
      return;
    }
    todos.push({ id: uid(), text, done: false });
    input.value = '';
    save(todos);
    render();
    input.focus();
  };

  const onToggle = (e) => {
    const li = e.currentTarget.closest('li');
    const id = li.dataset.id;
    const t = todos.find(t => t.id === id);
    if (!t) return;
    t.done = e.currentTarget.checked;
    save(todos);
    render();
  };

  const onDelete = (e) => {
    const li = e.currentTarget.closest('li');
    const id = li.dataset.id;
    todos = todos.filter(t => t.id !== id);
    save(todos);
    render();
  };

  const clearCompleted = () => {
    const before = todos.length;
    todos = todos.filter(t => !t.done);
    if (todos.length !== before) {
      save(todos);
      render();
    }
  };

  /** ----- Eventos ----- **/
  btnAdd.addEventListener('click', add);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') add(); });
  btnClear.addEventListener('click', clearCompleted);

  // Pintado inicial
  render();
})();
