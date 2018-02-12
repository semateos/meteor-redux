import '/imports/api/';
import _ from 'lodash';
import { graphQLInputTypes, graphQLMutations } from '/imports/lib/wireMethods';


// compose input types from auto-wired methods
let inputTypes = '';

_.forEach(graphQLInputTypes, (inputType) => {
  inputTypes += inputType + '\n\n';
});

// compose mutations from auto-wired methods
let mutations = '';

_.forEach(graphQLMutations, (mutation) => {
  mutations += '\t' + mutation + '\n';
});

export const typeDefs = `

input SayQuery {
  something: String
}

type Query {
  say(query: SayQuery): String
  tasks: [Task]
  task(_id: ID!): Task
}

${inputTypes}

type Mutation {
${mutations}
}

type Task {
  _id: ID!
  description: String!
  details: String
  done: Boolean
}
`;

//console.log(typeDefs);
