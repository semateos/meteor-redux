export const typeDefs = `

type Query {
  say: String
  tasks: [Task]
  task(_id: ID!): Task
}

input AddTaskInput {
  _id: ID
  description: String!
  details: String
  done: Boolean
}

type Mutation {
  upsertTask(task: AddTaskInput!): Task
  setTaskDone(_id: ID!, done: Boolean): Task
  removeTask(_id: ID!): Task
}

type Task {
  _id: ID!
  description: String!
  details: String
  done: Boolean
}
`;
