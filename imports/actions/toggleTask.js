import { Tasks } from '../collections/Tasks';

export default function toggleTask(id) {
  return () => {
    const task = Tasks.findOne(id);
    Tasks.update({ id }, { $set: { done: !task.done } });
    return Tasks.findOne(id);
  };
};
