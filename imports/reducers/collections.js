import { REHYDRATE } from 'redux-persist'
import _ from 'lodash';
import { ADDED, CHANGED, REMOVED } from '/imports/lib/meteorReactOffline';

export const collections = (state = {}, action) => {
  let { collection, id, fields } = action.payload || {};

  if(fields && id){
    fields._id = id;
  }

  switch (action.type) {
    case ADDED:
      if (!state[collection]) {
        state[collection] = {};
        return {
          ...state,
          [collection]: {
            [id]: fields,
          },
        };
      } else if (!state[collection][id]) {
        return {
          ...state,
          [collection]: {
            ...state[collection],
            [id]: fields,
          },
        }
      } else {
        return {
          ...state,
          [collection]: {
            ...state[collection],
            [id]: { ...fields, ...state[collection][id] },
          }
        };
      }
    case CHANGED:
      return {
        ...state,
        [collection]: {
          ...state[collection],
          [id]: _.merge(state[collection][id], fields),
        },
      };
    case REMOVED:
      if (state[collection] && state[collection][id]) {
        return {
          ...state,
          [collection]: _.omit(state[collection], id),
        };
      }
    //case REHYDRATE:
    //  console.log('REHYDRATEing', action);
    //  return (action.payload) ? action.payload : {};
    default:
      return state;
  }
};
