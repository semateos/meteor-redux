import { TasksCollection } from '../collections/Tasks';

export default function toggleTask(id) {
  return () => {
    const task = TasksCollection.findOne(id);
    TasksCollection.update({ id }, { $set: { done: !task.done } });
    return TasksCollection.findOne(id);
  };
};
