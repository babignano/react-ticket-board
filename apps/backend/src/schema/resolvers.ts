// In-memory data store (replace with a database in production)
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  createdAt: string;
  updatedAt: string;
}

let tasks: Task[] = [
  {
    id: '1',
    title: 'Setup GraphQL Server',
    description: 'Initialize Apollo Server with Express',
    status: 'DONE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Connect Frontend to Backend',
    description: 'Integrate GraphQL client in React app',
    status: 'TODO',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 3;

export const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (_: unknown, { id }: { id: string }) => tasks.find((task) => task.id === id),
  },
  Mutation: {
    createTask: (
      _: unknown,
      { title, description, status = 'TODO' }: { title: string; description?: string; status?: Task['status'] }
    ) => {
      const newTask: Task = {
        id: String(nextId++),
        title,
        description,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (
      _: unknown,
      { id, title, description, status }: { id: string; title?: string; description?: string; status?: Task['status'] }
    ) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return null;

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      task.updatedAt = new Date().toISOString();

      return task;
    },
    deleteTask: (_: unknown, { id }: { id: string }) => {
      const index = tasks.findIndex((t) => t.id === id);
      if (index === -1) return false;
      tasks.splice(index, 1);
      return true;
    },
  },
};
