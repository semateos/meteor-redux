import { Meteor } from 'meteor/meteor';
import { Store } from '/imports/store/store';

export const ADDED = 'ddp/added';
export const CHANGED = 'ddp/changed';
export const REMOVED = 'ddp/removed';

export const initializeMeteorOffline = () => {
  Meteor.connection._stream.on('message', (message) => {
    const payload = JSON.parse(message);

    switch (payload.msg) {

      case 'added':

        Store.dispatch({ type: ADDED, payload });
        break;

      case 'changed':

        Store.dispatch({ type: CHANGED, payload });
        break;

      case 'removed':

        Store.dispatch({ type: REMOVED, payload });
        break;

      default:
    }
  });
};
