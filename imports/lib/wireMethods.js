import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedActionMethod } from '/imports/lib/ValidatedActionMethod';

// collections of methods that have been wired
export const allMethods = {};

// collections of graphQL schema from wired collections
export const graphQLMutationResolvers = {};
export const graphQLTypes = {};
export const graphQLInputTypes = {};
export const graphQLMutations = {};

/*
makeGraphQLParam takes a key and piece of SimpleSchema and returns
  - a string containing a piece of graphQL schema describing a parameter
  - e.g. 'description: String!'
*/
export const makeGraphQLParam = (key, schema) => {
  let ret = `${key}: `;
  if (key === '_id') {
    ret += 'ID';
  } else {
    ret += schema.type.name;
  }
  if (!schema.optional) {
    ret += '!';
  }

  return ret;
};

const makeGraphQlObject = (type, name, schema) => {
  let params = '';
  _.forEach(schema, (schemaItem, key) => {
    const paramSchema = makeGraphQLParam(key, schemaItem);
    params += `\t${paramSchema}\n`;
  });
  const output = `${type} ${name} {\n${params}}`;

  return output;
};

export const makeGraphQLCollectionType = (name, schema) => {
  const newSchema = schema;

  if (!newSchema._id) {
    newSchema._id = { type: String, optional: true };
  }

  const type = makeGraphQlObject('type', name, newSchema);
  graphQLTypes[name] = type;
  return type;
};

/*
makeGraphQLInputSchema takes an object description of a method and creates:
  - a string containing a piece of graphQL schema describing the input
  - e.g.
    input UpsertTaskInput {
      _id: ID
      description: String!
      done: Boolean
    }
*/
export const makeGraphQLInputSchema = methodOptions => {
  const inputName = `${_.upperFirst(methodOptions.name)}Input`;
  return makeGraphQlObject('input', inputName, methodOptions.params);
};

/*
makeGraphQLFunctionSchema takes an object description of a method and creates:
  - a string containing a piece of graphQL schema describing the method
  - e.g. 'upsertTask(input: UpsertTaskInput!): Task'
*/
export const makeGraphQLFunctionSchema = methodOptions => {
  const inputName = `${_.upperFirst(methodOptions.name)}Input`;
  const returnType =
    typeof methodOptions.returns === 'string'
      ? methodOptions.returns
      : methodOptions.returns.name;
  return `${methodOptions.name}(input: ${inputName}!): ${returnType}`;
};

export const makeGraphQLQuerySchema = methodOptions => {
  const returnType =
    typeof methodOptions.returns === 'string'
      ? methodOptions.returns
      : methodOptions.returns.name;
  return `${methodOptions.name}(where: JSON): ${returnType}`;
};

/*
wireMethod takes an object description of a method and creates:
  - a meteor method with validator via ValidatedActionMethod
  - which in turn creates a redux actionCreator
  - and a graphQL resolver for the same method
*/
export const wireMethod = methodOptions => {
  const newMethodOptions = { ...methodOptions };

  // Automatically add token to params if auth is true
  if (newMethodOptions.auth === true) {
    if (typeof newMethodOptions.params === 'object') {
      newMethodOptions.params.token = { type: String };
    } else {
      newMethodOptions.params = { token: { type: String } };
    }

    newMethodOptions.run = function(args) {

      /*
        Of interest to auth / security
        If auth is true for given 'methodOptions', the login token is passed up
        from the client. The token is hashed on the server and checked
        against tokens associated with the logged-in user

        The method will error with 'Unauthorized' if there isn't a match
      */

      if (Meteor.isServer) {
        const user = Meteor.user();

        if (user.services &&
            user.services.resume &&
            user.services.resume.loginTokens &&
            Array.isArray(user.services.resume.loginTokens)) {
          const hashedToken = Accounts._hashLoginToken(args.token);
          const tokenMatch = user.services.resume.loginTokens.find(token =>
            token.hashedToken === hashedToken);

          if (!tokenMatch) {
            throw new Meteor.Error(403, 'Unauthorized');
          }
        } else {
          throw new Meteor.Error(403, 'Unauthorized');
        }
      }

      return methodOptions.run(args);
    };
  }

  if (
    typeof newMethodOptions.params === 'object' &&
    !newMethodOptions.validate
  ) {
    newMethodOptions.validate = new SimpleSchema(
      methodOptions.params
    ).validator();
  }

  const actionMethod = new ValidatedActionMethod(newMethodOptions);

  // write the graphQL resolver for this method:
  const graphQLResolver = async (root, { input }) =>
    actionMethod.callPromise(input);

  const graphQLInputSchema = makeGraphQLInputSchema(newMethodOptions);
  const graphQLMutation = makeGraphQLFunctionSchema(newMethodOptions);

  graphQLMutationResolvers[newMethodOptions.name] = graphQLResolver;
  graphQLInputTypes[newMethodOptions.name] = graphQLInputSchema;
  graphQLMutations[newMethodOptions.name] = graphQLMutation;
  allMethods[newMethodOptions.name] = actionMethod;

  return actionMethod;
};

/*
wireMethods takes a collection of method descriptions and wires them all
*/
export const wireMethods = methods => {
  const returnMethods = {};

  _.forEach(methods, methodOptions => {
    returnMethods[methodOptions.name] = wireMethod(methodOptions);
  });

  return returnMethods;
};
