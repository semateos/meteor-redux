import { connect } from 'react-redux';
import { compose } from 'recompose';
import { upsert } from '/imports/api/tasks/methods';
import AddTask from '/imports/ui/AddTask';

export default compose(
  connect(null, {
    onSubmit: upsert.action,
  })
)(AddTask);
