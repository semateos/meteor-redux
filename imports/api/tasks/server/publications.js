
import _ from 'lodash';
import { wirePublications } from '/imports/lib/wirePublications';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Tasks } from '../collection';

const taskPubFields = {
  description: true,
  details: true,
  done: true,
  userId: true,
};

const publications = [
  {
    name: 'getTasks',
    run: function(filter, pageSkip = 0) {

      const query = { userId: this.userId };

      switch (filter) {
        case 'SHOW_COMPLETED':
          query.done = true;
          break;
        case 'SHOW_ACTIVE':
          query.done = false;
          break;
        default:
          break;
      }

      Counts.publish(this, 'tasksCount', Tasks.find(query));

      return Tasks.find(query, {
        fields: taskPubFields,
        skip: pageSkip,
        limit: 10,
      });
    },
  },
];

export default _.forEach(wirePublications(publications), pub => Meteor.publish(pub.name, pub.run));
