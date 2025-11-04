# CLAUDE.md

This file helps AI assistants (like Claude) understand the project structure and conventions.

## Project Overview

A full-stack task management application using React + Vite frontend and Node.js + GraphQL backend in a monorepo structure.

## Repository Structure

```
react-ticket-board/
├── apps/
│   ├── frontend/          # React + Vite + TypeScript
│   └── backend/           # Node.js + Fastify + GraphQL
├── package.json           # Root workspace config (npm workspaces)
├── README.md              # User-facing documentation
└── NEXT_STEPS.md          # Development guide
```

## Tech Stack

### Frontend (`apps/frontend/`)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: React Aria Components
- **Drag & Drop**: @dnd-kit/core
- **Dev Server**: http://localhost:5173

### Backend (`apps/backend/`)
- **Runtime**: Node.js with TypeScript
- **Server**: Fastify 4
- **API**: GraphQL (Apollo Server 4)
- **Dev Tool**: tsx (TypeScript executor)
- **Dev Server**: http://localhost:4000/graphql

## Development Commands

```bash
# Install all dependencies
npm install

# Run both frontend and backend concurrently
npm run dev

# Run individual apps
npm run dev:frontend
npm run dev:backend

# Build all apps
npm run build

# Build individual apps
npm run build:frontend
npm run build:backend

# Lint all workspaces
npm run lint
```

## Workspace Management

This is an npm workspace monorepo. When installing packages:

```bash
# Install to frontend
npm install <package> --workspace=@react-ticket-board/frontend

# Install to backend
npm install <package> --workspace=@react-ticket-board/backend

# Install to root (dev tools, shared configs)
npm install <package> -D -w
```

## Code Conventions

### General
- **TypeScript**: Strict mode enabled
- **Module System**: ESM (type: "module")
- **Line Endings**: LF
- **Formatting**: Follow existing patterns in the codebase

### Frontend
- **Components**: Functional components with TypeScript
- **File Naming**: PascalCase for components (e.g., `TaskBoard.tsx`)
- **Styling**: Tailwind utility classes
- **State**: React hooks (useState, useEffect, etc.)
- **Props**: Define interfaces for component props

### Backend
- **File Naming**: camelCase for utilities, PascalCase for classes
- **Schema**: GraphQL schema-first approach
- **Resolvers**: Keep business logic separate from resolvers when complex
- **Error Handling**: Use try-catch and return appropriate GraphQL errors
- **Types**: Define TypeScript interfaces matching GraphQL types

## Key Files & Directories

### Frontend
- `apps/frontend/src/main.tsx` - Application entry point
- `apps/frontend/src/App.tsx` - Root component
- `apps/frontend/src/components/` - React components
- `apps/frontend/vite.config.ts` - Vite configuration
- `apps/frontend/.env.example` - Environment variables template

### Backend
- `apps/backend/src/index.ts` - Server entry point
- `apps/backend/src/schema/typeDefs.ts` - GraphQL schema definitions
- `apps/backend/src/schema/resolvers.ts` - GraphQL resolvers
- `apps/backend/tsconfig.json` - TypeScript configuration
- `apps/backend/.env.example` - Environment variables template

## Environment Variables

### Frontend
Create `apps/frontend/.env`:
```
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

### Backend
Create `apps/backend/.env`:
```
PORT=4000
NODE_ENV=development
```

## GraphQL Schema

Current schema supports task management:

**Types:**
- `Task` - Task entity with id, title, description, status, timestamps
- `TaskStatus` - Enum: TODO, IN_PROGRESS, DONE

**Queries:**
- `tasks` - Get all tasks
- `task(id: ID!)` - Get single task

**Mutations:**
- `createTask(title, description, status)` - Create new task
- `updateTask(id, title, description, status)` - Update existing task
- `deleteTask(id)` - Delete task

## Data Storage

**Current**: In-memory storage (resets on server restart)
**Future**: Consider PostgreSQL, MongoDB, or SQLite for persistence

## Common Tasks

### Adding a New Component (Frontend)
1. Create file in `apps/frontend/src/components/ComponentName/`
2. Export from component file
3. Import and use in parent component

### Adding a New GraphQL Type (Backend)
1. Add type definition to `apps/backend/src/schema/typeDefs.ts`
2. Add corresponding resolvers to `apps/backend/src/schema/resolvers.ts`
3. Update TypeScript interfaces to match

### Adding Dependencies
- Frontend dependencies: Use `--workspace=@react-ticket-board/frontend`
- Backend dependencies: Use `--workspace=@react-ticket-board/backend`
- Dev tools at root: Use `-D` flag

## Testing

**Current**: No test framework configured
**Recommendation**:
- Frontend: Vitest + React Testing Library
- Backend: Vitest or Jest
- E2E: Playwright or Cypress

## Deployment Considerations

### Frontend
- Build output: `apps/frontend/dist/`
- Serves static files (SPA)
- Needs environment variable for API URL

### Backend
- Build output: `apps/backend/dist/`
- Requires Node.js runtime
- Set production environment variables
- Consider adding database connection
- Add CORS configuration for production domains

## Known Issues & TODOs

- [ ] No data persistence (in-memory only)
- [ ] No authentication/authorization
- [ ] Frontend not connected to backend yet
- [ ] No error boundaries in frontend
- [ ] No input validation in backend
- [ ] No rate limiting
- [ ] No logging system
- [ ] No monitoring/observability

## Getting Help

- **Setup Issues**: Check `README.md` and `NEXT_STEPS.md`
- **Vite Issues**: https://vite.dev/
- **React Issues**: https://react.dev/
- **Fastify Issues**: https://fastify.dev/
- **GraphQL Issues**: https://www.apollographql.com/docs/

## AI Assistant Guidelines

When working on this project:

1. **Respect the monorepo structure** - Changes to frontend/backend should stay in their respective directories
2. **Use workspace commands** - Don't install packages at the root unless they're truly shared
3. **Maintain type safety** - Keep TypeScript strict mode working
4. **Follow existing patterns** - Match the code style already in the project
5. **Update this file** - If you make significant architectural changes
6. **Consider both apps** - Backend changes may require frontend updates and vice versa
7. **Environment variables** - Never commit `.env` files, only `.env.example`

## Recent Changes

- 2025-10-16: Initial monorepo setup with frontend and backend separation
