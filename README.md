# ProjectFlow

A polished, ownership-safe project management SaaS built with React/Vite, Express, PostgreSQL, Prisma, JWT, and Tailwind CSS.

## Features

- JWT authentication with bcrypt password hashing, rate-limited auth requests, Helmet, CORS, request logging, Zod validation, and centralized errors.
- Full project/task CRUD, search, server-side filtering, pagination, sorting, dashboard metrics, and audit history.
- Responsive React UI with modal forms, React Hook Form, React Query cache invalidation, skeletons, toasts, status/priority badges, and mobile navigation.

## Local setup

1. Copy `server/.env.example` to `server/.env` and set `DATABASE_URL` and a strong `JWT_SECRET`.
2. Copy `client/.env.example` to `client/.env` (the defaults work locally).
3. Install dependencies: `npm run install:all`
4. Generate and migrate the database: `npm --prefix server run prisma:generate` then `npm --prefix server run prisma:migrate -- --name init`
5. Start both applications: `npm run dev`

The React app runs on `http://localhost:5173`; the API runs on `http://localhost:4000`.

Run individually with `npm --prefix server run dev` and `npm --prefix client run dev`. Run backend tests using `npm test`; lint using `npm run lint`.

## Docker

Run `docker compose up --build`. This starts PostgreSQL, applies Prisma migrations in the API container, serves API at port 4000 and frontend at port 5173. Before a first Docker run, create a committed Prisma migration locally using the migration command above (the schema is the source of truth).

## Documentation

See [API.md](API.md) for endpoint shapes and errors, and [DATABASE.md](DATABASE.md) for the data model.
