# TaskFlow — Task Management App

A full-stack task management web application built with **Next.js 16**, **Prisma ORM**, and **SQLite**. Create, edit, filter, and track your tasks with a clean and responsive UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | SQLite (via Prisma ORM v5) |
| Icons | Font Awesome |
| Runtime | Node.js |

---

## Project Structure

```
task-management-nextjs/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET, POST /api/tasks
│   │       └── [id]/
│   │           └── route.ts      # PUT, DELETE /api/tasks/[id]
│   ├── dashboard/
│   │   └── page.tsx              # Main task dashboard
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── layout.tsx                # Root layout (Header + Footer)
│   └── page.tsx                  # Home / landing page
├── components/
│   ├── Header.tsx                # Sticky navigation header
│   └── Footer.tsx                # Site footer
├── lib/
│   └── prisma.ts                 # Prisma client singleton
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── dev.db                    # SQLite database file
│   └── migrations/               # Prisma migration history
├── .env                          # Environment variables
└── tsconfig.json                 # TypeScript config
```

---

## Features

- **Add Tasks** — Create tasks with title, description, priority, and due date
- **Edit Tasks** — Update any task via a modal form
- **Delete Tasks** — Remove individual tasks with confirmation
- **Toggle Status** — Mark tasks as pending or completed
- **Mark All Complete** — Complete all tasks in one click
- **Clear Completed** — Bulk delete all completed tasks
- **Filter** — Filter by status (all / pending / completed) and priority
- **Sort** — Sort by due date, title, or priority
- **Search** — Search tasks by title or description
- **Statistics** — Live counts for total, completed, pending, and overdue tasks
- **Overdue Detection** — Tasks past their due date are highlighted
- **Persistent Storage** — All data saved to SQLite database via REST API

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/racheluwera/Task-Management.git
cd Task-Management/task-management-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root (already included):

```env
DATABASE_URL="file:./dev.db"
```

### 3. Run database migration

```bash
npx prisma migrate dev --name init
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Fetch all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/[id]` | Update a task by ID |
| `DELETE` | `/api/tasks/[id]` | Delete a task by ID |

---

## Database Schema

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  status      String   @default("pending")
  priority    String   @default("medium")
  dueDate     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Generate Prisma client + build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npx prisma studio  # Open Prisma Studio (visual DB browser)
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero and CTA |
| `/dashboard` | Full task management dashboard |
| `/about` | About TaskFlow |
| `/contact` | Contact form |
## Link for deployment:  

https://task-management-cmf2.vercel.app/