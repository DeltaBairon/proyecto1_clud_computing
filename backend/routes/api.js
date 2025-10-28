const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: "Tarea ejemplo", done: false }
];

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET /api/tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
router.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const id = tasks.length ? tasks[tasks.length-1].id + 1 : 1;
  const newTask = { id, title, done:false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
router.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'not found' });
  task.done = !!req.body.done;
  if (req.body.title) task.title = req.body.title;
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  tasks.splice(idx,1);
  res.status(204).send();
});

module.exports = router;
