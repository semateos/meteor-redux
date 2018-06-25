
import '/imports/api/';
import _ from 'lodash';
import { graphQLTypes, graphQLInputTypes, graphQLMutations, graphQLQueries } from '/imports/lib/wireMethods';

// compose types from auto-wired collections
let types = '';

_.forEach(graphQLTypes, (type) => {
  types += `${type}\n\n`;
});

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

${types}

${inputTypes}

input UserProfileInput {
  _id: ID
  name: String!
}

type Query {
  ping: String
  ${queries}
}

type Mutation {
  ${mutations}
}
`;

// console.log('typeDefs', typeDefs);
