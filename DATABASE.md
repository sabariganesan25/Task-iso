# Database schema

ProjectFlow uses PostgreSQL through Prisma. `User` owns many `Project`, `Task`, and `AuditLog` records. A `Project` owns many `Task` records; tasks also carry `userId`, making every task query ownership-scoped without relying only on the project relation.

| Entity | Important fields | Relationships |
| --- | --- | --- |
| User | id, fullName, email (unique), password hash | 1 → many Projects, Tasks, AuditLogs |
| Project | name, description, status, start/end dates | belongs to User; 1 → many Tasks |
| Task | name, priority, status, dueDate | belongs to User and Project |
| AuditLog | action, entity, entityId, createdAt | belongs to User |

Enum values are defined in [schema.prisma](server/prisma/schema.prisma). Prisma cascades related records when a user or project is deleted.
