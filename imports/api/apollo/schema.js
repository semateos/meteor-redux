export const typeDefs = `

type Query {
  say: String
  tasks: [Task]
  task(_id: ID!): Task
}

input UpsertTaskInput {
  _id: ID
  description: String!
  details: String
  done: Boolean
}

input SetTaskDoneInput {
  _id: ID!
  done: Boolean!
}

input RemoveTaskDoneInput {
  _id: ID!
}

type Mutation {
  upsertTask(input: UpsertTaskInput!): Task
  setTaskDone(input: SetTaskDoneInput!): Task
  removeTask(input: RemoveTaskDoneInput!): Task
}

type Task {
  _id: ID!
  description: String!
  details: String
  done: Boolean
}
`;
