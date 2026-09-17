# TaskFlow — Task Management App

A professional full-stack task management application built with Next.js (frontend) and Node.js/Express + SQLite (backend).

## Technologies Used

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Font Awesome (icons)

### Backend *(see backend setup guide below)*
- Node.js + Express
- Prisma ORM
- SQLite (recommended) — can be swapped for PostgreSQL or MySQL

---

## Frontend — Install & Run

```bash
cd task-management-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Features

- View all tasks with title, description, priority, status, due date, and created date
- Create a task with full validation
- Edit a task
- Delete a task
- Mark a task as Pending or Completed
- Filter tasks by status and priority
- Search tasks by title or description
- Task statistics (total, completed, pending, overdue)
- Quick actions (mark all complete, clear completed)
- Responsive design with Header and Footer
- Pages: Home, Dashboard, About, Contact

---

## Backend Setup Guide

See the **Backend Guide** section below for step-by-step instructions.

---

## Database Recommendation

**SQLite** — best choice to get started fast:
- No installation required
- Single file database (`dev.db`)
- Prisma supports it out of the box
- Easy to switch to PostgreSQL later for production

---

## Backend Guide

### Folder Structure

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── index.ts
│   └── routes/
│       └── tasks.ts
├── .env
├── package.json
└── tsconfig.json
```

### Step 1 — Create the backend folder

```bash
mkdir backend
cd backend
npm init -y
```

### Step 2 — Install dependencies

```bash
npm install express cors
npm install -D typescript ts-node @types/node @types/express @types/cors prisma
npx prisma init --datasource-provider sqlite
```

### Step 3 — Files to create (see README for code)

- `prisma/schema.prisma`
- `src/index.ts`
- `src/routes/tasks.ts`
- `.env`
- `tsconfig.json`

### Step 4 — Run migrations and start

```bash
npx prisma migrate dev --name init
npx ts-node src/index.ts
```

API runs at [http://localhost:4000](http://localhost:4000)

---

## API Endpoints

| Method | Endpoint     | Purpose        |
|--------|-------------|----------------|
| GET    | /tasks      | Get all tasks  |
| GET    | /tasks/:id  | Get one task   |
| POST   | /tasks      | Create a task  |
| PUT    | /tasks/:id  | Update a task  |
| DELETE | /tasks/:id  | Delete a task  |
