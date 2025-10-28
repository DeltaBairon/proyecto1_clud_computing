const apiBase = '/api';
const tasksEl = document.getElementById('tasks');
const form = document.getElementById('taskForm');
const titleInput = document.getElementById('title');

async function fetchTasks(){
  const res = await fetch(`${apiBase}/tasks`);
  const data = await res.json();
  render(data);
}

function render(items){
  tasksEl.innerHTML = '';
  items.forEach(t => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = t.title;
    if (t.done) span.classList.add('done');
    const actions = document.createElement('div');
    const toggle = document.createElement('button');
    toggle.textContent = t.done ? 'Reabrir' : 'Hecho';
    toggle.onclick = async () => {
      await fetch(`${apiBase}/tasks/${t.id}`, {
        method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({done: !t.done})
      });
      fetchTasks();
    };
    const del = document.createElement('button');
    del.textContent = 'Borrar';
    del.onclick = async () => {
      await fetch(`${apiBase}/tasks/${t.id}`, { method:'DELETE' });
      fetchTasks();
    };
    actions.appendChild(toggle);
    actions.appendChild(del);
    li.appendChild(span);
    li.appendChild(actions);
    tasksEl.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if(!title) return;
  await fetch(`${apiBase}/tasks`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title})});
  titleInput.value = '';
  fetchTasks();
});

fetchTasks();
