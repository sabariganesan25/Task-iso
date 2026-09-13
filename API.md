# API reference

All protected endpoints require `Authorization: Bearer <JWT>`. Bodies are JSON. Errors use `{ "message": "…" }`; validation errors additionally contain a field-keyed `errors` object.

| Method | Path | Auth | Request body / query | Success |
| --- | --- | --- | --- | --- |
| POST | /api/auth/register | N | fullName, email, password | 201 `{user, token}` |
| POST | /api/auth/login | N | email, password | 200 `{user, token}` |
| POST | /api/auth/logout | N | — | 204 |
| GET | /api/projects | Y | search, status, page, limit, sortBy, order | `{items,total,page,limit}` |
| GET | /api/projects/:id | Y | — | Project |
| POST | /api/projects | Y | name, description?, status?, startDate?, endDate? | 201 Project |
| PUT | /api/projects/:id | Y | Project body | Project |
| DELETE | /api/projects/:id | Y | — | 204 |
| GET | /api/tasks | Y | projectId, search, status, priority, page, limit, sortBy, order | `{items,total,page,limit}` |
| GET | /api/tasks/:id | Y | — | Task |
| POST | /api/tasks | Y | name, projectId, description?, priority?, status?, dueDate? | 201 Task |
| PUT | /api/tasks/:id | Y | Task body | Task |
| DELETE | /api/tasks/:id | Y | — | 204 |
| PATCH | /api/tasks/:id/complete | Y | — | Task with toggled completion |
| GET | /api/dashboard | Y | — | metric object |
| GET | /api/audit-logs | Y | — | own latest 100 audit log entries |

Dates accept `YYYY-MM-DD` or an ISO timestamp. Invalid/missing tokens return 401, ownership misses return 404, and duplicate email returns 409.
