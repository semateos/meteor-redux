
import '/imports/api/';
import _ from 'lodash';
import { graphQLInputTypes, graphQLMutations, graphQLQueries } from '/imports/lib/wireMethods';


// compose input types from auto-wired methods
let inputTypes = '';

_.forEach(graphQLInputTypes, (inputType) => {
  inputTypes += `${inputType}\n\n`;
});

// compose queries
let queries = '';

_.forEach(graphQLQueries, (query) => {
  queries += `\t${query}\n`;
});

// compose mutations from auto-wired methods
let mutations = '';

_.forEach(graphQLMutations, (mutation) => {
  mutations += `\t${mutation}\n`;
});

export const typeDefs = `

scalar JSON

type Query {
  ping: String
  ${queries}
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

// console.log(typeDefs);
