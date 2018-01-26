import { TasksCollection } from '../collections/Tasks';

export default function addTask(task) {

  console.log('addTask action', task);

  return () => {

    console.log('addTask action return', task);

    TasksCollection.findOne(TasksCollection.insert({ task }));
  };
};
