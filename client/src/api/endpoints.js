import client from './client';
const data = (p) => p.then((r) => r.data);
export const authApi = { register: (v) => data(client.post('/auth/register', v)), login: (v) => data(client.post('/auth/login', v)), logout: () => data(client.post('/auth/logout')) };
export const projectsApi = { list: (p) => data(client.get('/projects', { params: p })), get: (id) => data(client.get(`/projects/${id}`)), create: (v) => data(client.post('/projects', v)), update: (id, v) => data(client.put(`/projects/${id}`, v)), remove: (id) => data(client.delete(`/projects/${id}`)) };
export const tasksApi = { list: (p) => data(client.get('/tasks', { params: p })), create: (v) => data(client.post('/tasks', v)), update: (id, v) => data(client.put(`/tasks/${id}`, v)), remove: (id) => data(client.delete(`/tasks/${id}`)), complete: (id) => data(client.patch(`/tasks/${id}/complete`)) };
export const dashboardApi = () => data(client.get('/dashboard'));
