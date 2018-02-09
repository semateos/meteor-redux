import { Meteor } from 'meteor/meteor';
import { Store } from '/imports/store/store';

export const ADDED = 'ddp/added';
export const CHANGED  = 'ddp/changed';
export const REMOVED = 'ddp/removed';


export const initializeMeteorOffline = (opts = {}) => {
  Meteor.connection._stream.on('message', (message) => {

    const payload = JSON.parse(message);

    switch(payload.msg){

      case 'added':

        Store.dispatch({ type: ADDED, payload });
        //console.log('doc added', messageObj);
        break;

      case 'changed':

        Store.dispatch({ type: CHANGED, payload });
        //console.log('doc changed', messageObj);
        break;

      case 'removed':

        Store.dispatch({ type: REMOVED, payload });
        //console.log('doc removed', messageObj);
        break;

      default:

    }

    //console.log('_stream', message);
  });


/*

  Meteor.ddp.on('changed', (payload) => {
    console.log('Doc changed', payload);
  });

  Meteor.connection._stream.on('removed', (payload) => {
    console.log('Doc removed', payload);
  });*/
};
