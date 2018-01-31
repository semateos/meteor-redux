import { connect } from 'react-redux';
import { compose } from 'recompose';
import insertTask from '/imports/actions/insertTask';
import AddTask from '/imports/ui/AddTask';

export default compose(
  connect(null, {
    onSubmit: insertTask,
  })
)(AddTask);
