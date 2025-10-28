const request = require('supertest');
const app = require('../index');

describe('API basic', () => {
  test('GET /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status','ok');
  });

  test('CRUD tasks', async () => {
    let res = await request(app).post('/api/tasks').send({ title: 'test task' });
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res = await request(app).put(`/api/tasks/${id}`).send({ done: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(204);
  });
});
