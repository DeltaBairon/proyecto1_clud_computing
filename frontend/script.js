const API_URL = "http://localhost:3000/tasks";
const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

async function loadTasks() {
  const res = await fetch(API_URL);
  const data = await res.json();

  taskList.innerHTML = "";
  data.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.title;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit", async e => {
  e.preventDefault();
  const title = taskInput.value;
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  taskInput.value = "";
  loadTasks();
});

loadTasks();
