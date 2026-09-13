import { projectSchema } from '../src/validators/index.js';

describe('project CRUD input contract', () => {
  test('create/update payload requires a title and rejects an inverted date range', () => {
    expect(projectSchema.safeParse({ name: '', status: 'NOT_STARTED' }).success).toBe(false);
    expect(projectSchema.safeParse({ name: 'Release', startDate: '2026-10-20', endDate: '2026-10-10' }).success).toBe(false);
    expect(projectSchema.safeParse({ name: 'Release', description: 'Ship it', status: 'IN_PROGRESS' }).success).toBe(true);
  });
});
