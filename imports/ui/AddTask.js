import React from 'react';
import { Button, TextField } from 'material-ui';
import { Add } from 'material-ui-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addTask from '../actions/addTask';

class AddTask extends React.Component {

  state = {
    _id: null,
    description: '',
    details: '',
  };

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (!data || data.loading) {
      return;
    }
    this.setState({
      _id: data.task._id || null,
      description: data.task.description || '',
      details: data.task.details || '',
    });
  }

  onInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  addTaskAndGo = () => {
    const { dispatch } = this.props;
    const { router: { history } } = this.context;

    dispatch(addTodo({
      description: this.state.description,
      details: this.state.details,
    }));

    history.push('/');

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
          onClick={this.addTaskAndGo}
        >
          <Add /> Task
        </Button>
      </form>
    );
  }
}

AddTask.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

export default connect()(AddTask);
