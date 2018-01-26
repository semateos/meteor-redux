import TasksCollection from '../../imports/collection/Tasks';

Meteor.methods({
  addTask(task) {
    const task = TasksCollection.insert(task);
    return task;
  },
  toggleTask(id) {
    const taskInQuestion = TasksCollection.findOne({_id: id});
    const done = taskInQuestion.done;
    return TasksCollection.update({_id: id}, {$set: {done: !done}});
  }
});
