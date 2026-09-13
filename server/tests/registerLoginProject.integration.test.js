/*
 * Full real-HTTP flow. Run against an isolated PostgreSQL instance with:
 * TEST_DATABASE_URL=postgresql://... DATABASE_URL=postgresql://... npm test
 * It is intentionally opt-in so the normal unit suite does not mutate a developer database.
 */
import request from 'supertest';
import { randomUUID } from 'crypto';
const runWithDatabase = process.env.TEST_DATABASE_URL ? describe : describe.skip;
runWithDatabase('register → login → create project', () => {
  test('creates a user session and an owned project', async () => {
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
    process.env.JWT_SECRET = 'test-secret-with-sufficient-length';
    const { default: app } = await import('../src/app.js');
    const email = `flow-${randomUUID()}@example.test`;
    await request(app).post('/api/auth/register').send({ fullName: 'Flow Test', email, password: 'long-test-password' }).expect(201);
    const login = await request(app).post('/api/auth/login').send({ email, password: 'long-test-password' }).expect(200);
    const project = await request(app).post('/api/projects').set('Authorization', `Bearer ${login.body.token}`).send({ name: 'Integration project', status: 'NOT_STARTED' }).expect(201);
    expect(project.body.name).toBe('Integration project');
  });
});
