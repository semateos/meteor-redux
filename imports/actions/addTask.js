import { TasksCollection } from '../collections/Tasks';

export default function addTask(task) {
  return () => {
    TasksCollection.findOne(TasksCollection.insert({ task }));
  };
};
