import SimpleSchema from 'simpl-schema';
import _ from 'lodash';
import { ValidatedActionMethod } from '/imports/lib/ValidatedActionMethod';

export const allMethods = {};
export const graphqlResolvers = {};

/*
wireMethod takes an object description of a method and creates:
  - a meteor method with validator via ValidatedActionMethod
  - which in turn creates a redux actionCreator
  - a graphql resolver for the same method
*/
export const wireMethod = (methodOptions) => {
  const newMethodOptions = methodOptions;

  if (typeof newMethodOptions.validate === 'object') {
    newMethodOptions.validate = new SimpleSchema(methodOptions.validate).validator();
  }

  const actionMethod = new ValidatedActionMethod(newMethodOptions);

  const resolver = async (root, { _id, done }) => {
    return actionMethod.callPromise({ _id, done });
  };

  graphqlResolvers[newMethodOptions.name] = resolver;
  allMethods[newMethodOptions.name] = actionMethod;

  return actionMethod;
};

/*
wireMethods takes a collection of method descriptions and wires them all
*/
export const wireMethods = (methods) => {
  const returnMethods = {};

  _.forEach(methods, (methodOptions) => {
    returnMethods[methodOptions.name] = wireMethod(methodOptions);
  });

  return returnMethods;
};
