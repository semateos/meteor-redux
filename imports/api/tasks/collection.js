import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class Tasks extends Mongo.Collection {}

Tasks.schema = new SimpleSchema({
  description: { type: String },
  details: { type: String, optional: true },
  done: { type: Boolean, defaultValue: false, optional: true },
  // userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

const collection = new Tasks('tasks');

export { collection as Tasks };
