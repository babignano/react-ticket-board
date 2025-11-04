# Next Steps

Your monorepo is now set up with both frontend and backend! Here's what you can do next:

## 1. Start Development

```bash
# Run both frontend and backend
npm run dev

# Or run them separately
npm run dev:frontend  # Frontend at http://localhost:5173
npm run dev:backend   # Backend at http://localhost:4000
```

## 2. Test the GraphQL API

Once the backend is running, visit the Apollo GraphQL Playground at:
- http://localhost:4000/graphql

Try these example queries:

```graphql
# Get all tasks
query {
  tasks {
    id
    title
    description
    status
    createdAt
  }
}

# Create a new task
mutation {
  createTask(
    title: "My new task"
    description: "Task description"
    status: TODO
  ) {
    id
    title
    status
  }
}

# Update a task
mutation {
  updateTask(
    id: "1"
    status: IN_PROGRESS
  ) {
    id
    title
    status
  }
}
```

## 3. Connect Frontend to Backend

To connect your React frontend to the GraphQL backend, you'll need to:

1. Install a GraphQL client (e.g., Apollo Client or urql):

```bash
npm install @apollo/client graphql --workspace=@react-ticket-board/frontend
```

2. Create a GraphQL client in your frontend
3. Replace the mock data in your components with GraphQL queries

Example Apollo Client setup:

```typescript
// apps/frontend/src/graphql/client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});
```

## 4. Add Database (Optional)

Currently, the backend uses in-memory storage. To persist data, consider adding:

- **PostgreSQL** with Prisma or TypeORM
- **MongoDB** with Mongoose
- **SQLite** for simple local development

## 5. Add Authentication (Optional)

Consider adding authentication using:
- JWT tokens
- OAuth (Google, GitHub, etc.)
- Passport.js

## 6. Deploy

When ready to deploy:

### Frontend (Vercel, Netlify, etc.)
- Build command: `npm run build:frontend`
- Output directory: `apps/frontend/dist`

### Backend (Railway, Fly.io, Render, etc.)
- Build command: `npm run build:backend`
- Start command: `npm run start --workspace=@react-ticket-board/backend`
- Set environment variables

## Project Structure Reference

```
react-ticket-board/
├── apps/
│   ├── frontend/               # React frontend
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── backend/                # Node.js backend
│       ├── src/
│       │   ├── index.ts       # Server entry point
│       │   └── schema/
│       │       ├── typeDefs.ts    # GraphQL schema
│       │       └── resolvers.ts   # GraphQL resolvers
│       ├── package.json
│       └── tsconfig.json
├── package.json                # Root workspace config
└── README.md
```

## Useful Commands

```bash
# Install new package to frontend
npm install <package> --workspace=@react-ticket-board/frontend

# Install new package to backend
npm install <package> --workspace=@react-ticket-board/backend

# Build everything
npm run build

# Lint everything
npm run lint
```
