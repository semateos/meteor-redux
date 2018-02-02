import { connect } from 'react-redux';
import { compose } from 'recompose';
import { upsert, remove } from '/imports/api/tasks/methods';
import Task from '/imports/ui/Task';

const onItemClick = (dispatch, props) => {
  return (upsert.action(dispatch, { done: !props.item.done }));
}

export default compose(
  connect(null, {
    onRemove: (item) => remove.action({ _id: item._id }),
    onFlip: (item) => upsert.action({ _id: item._id, done: !item.done }),
    onItemClick,
  })
)(Task);
