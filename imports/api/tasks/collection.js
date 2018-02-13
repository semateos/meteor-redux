import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { makeGraphQLCollectionType } from '/imports/lib/wireMethods';

export const Tasks = new Mongo.Collection('tasks');

export const schema = {
  description: { type: String },
  details: { type: String, optional: true },
  done: { type: Boolean, defaultValue: false, optional: true },
  // userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
};

Tasks.attachSchema(new SimpleSchema(schema));

makeGraphQLCollectionType('Task', schema);
