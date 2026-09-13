import request from 'supertest';
import { jest } from '@jest/globals';

// Health should be testable without a database. This also sidesteps Jest's
// Linux ESM loader trying to require Prisma's generated client.
jest.unstable_mockModule('../src/utils/prisma.js', () => ({ default: {} }));
const { default: app } = await import('../src/app.js');

describe('API integration', () => {
  test('reports health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
