import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Tasks = new Mongo.Collection('tasks');

const schema = new SimpleSchema({
  description: { type: String },
  details: { type: String, optional: true },
  done: { type: Boolean, defaultValue: false, optional: true },
  // userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

Tasks.attachSchema(schema);

export { Tasks };
