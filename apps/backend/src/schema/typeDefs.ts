import gql from 'graphql-tag';

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus!
    createdAt: String!
    updatedAt: String!
  }

  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, status: TaskStatus): Task!
    updateTask(id: ID!, title: String, description: String, status: TaskStatus): Task
    deleteTask(id: ID!): Boolean!
  }
`;
