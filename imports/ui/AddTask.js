import React from 'react';
import { Button, TextField } from 'material-ui';
import PropTypes from 'prop-types';

class AddTask extends React.Component {
  defaultState = {
    _id: null,
    description: '',
    details: '',
  };

  state = this.defaultState;

  componentWillMount() {
    this.updateState(this.props.task);
  }

  componentWillReceiveProps({ task, loading }) {
    if (loading) return;
    this.updateState(task);
  }

  updateState(task) {
    if (task) {
      this.setState({
        _id: task._id,
        description: task.description,
        details: task.details,
      });
    } else {
      this.setState(this.defaultState);
    }
  }

  onInputChange = ({ target: { name, value } }) => {
    const newState = this.state;

    newState[name] = value;

    this.setState(newState);
  };

  onSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <form className="form">
        <TextField
          name="description"
          label="Description"
          value={this.state.description}
          onChange={this.onInputChange}
          fullWidth
        />
        <TextField
          name="details"
          label="Details"
          value={this.state.details}
          onChange={this.onInputChange}
          fullWidth
        />
        <Button
          className="form-action"
          raised
          color="primary"
          onClick={this.onSubmit}
        >
          Save
        </Button>
      </form>
    );
  }
}

AddTask.defaultProps = {
  onSubmit: () => {
    console.log('AddTask onSubmit is default');
  },
};

AddTask.propTypes = {
  onSubmit: PropTypes.func,
  task: PropTypes.object,
};

export default AddTask;
