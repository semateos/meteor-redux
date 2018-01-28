
export default function addTask(task) {

  console.log('addTask action', task);

  return () => {

    console.log('addTask action return', task);

    Meteor.call('tasks.insert', task);

    /*addTaskMethod.call(task, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    });*/
  };
}
