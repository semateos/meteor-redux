import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  item: [],
  stopped: false,
};

export function taskList(state = initialState, action) {
  switch (action.type) {
    case 'TASK_LIST_SUBSCRIPTION_READY':
      return {
        ...state,
        ready: action.payload.ready,
      };
    case 'TASK_LIST_SUBSCRIPTION_CHANGED':
      return (state.ready) ?
        { ...state, item: action.payload, stopped: false }
        : state;
    case STOP_SUBSCRIPTION:
      return action.payload === 'TASK_LIST' ?
        { ...state, stopped: true }
        : state;
    default:
      return state;
  }
}

export function currentTask(state = initialState, action) {
  switch (action.type) {
    case 'TASK_SUBSCRIPTION_READY':
      return {
        ...state,
        ready: action.payload.ready,
      };
    case 'TASK_SUBSCRIPTION_CHANGED':
      return { ...state, item: action.payload, stopped: false };
    case STOP_SUBSCRIPTION:
      return action.payload === 'TASK'
        ? { ...state, stopped: true }
        : state;
    default:
      return state;
  }
}
