import { connect } from 'react-redux';
import { compose } from 'recompose';
import { upsert, remove } from '/imports/api/tasks/methods';
import { push } from 'react-router-redux'
import Task from '/imports/ui/Task';


export default compose(
  connect(null, {
    onRemove: (item) => remove.action({ _id: item._id }),
    onFlip: (item) => upsert.action({ _id: item._id, done: !item.done }),
    onItemClick: (item) => push(`/edit/${item._id}`),
  })
)(Task);
