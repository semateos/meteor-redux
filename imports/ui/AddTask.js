import React from 'react';
import { Button, TextField } from 'material-ui';
import { Add } from 'material-ui-icons';
import PropTypes from 'prop-types';

class AddTask extends React.Component {

  state = {
    _id: null,
    description: '',
    details: '',
  };
  
  componentWillReceiveProps(nextProps) {
    const { task, loading } = nextProps;
    if (!task || loading) {
      return;
    }
    this.setState({
      _id: task._id || null,
      description: task.description || '',
      details: task.details || '',
    });
  }

  onInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  onSubmit = () => {
    console.log(this.props);
    this.props.onSubmit(this.state);
  }

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
          <Add /> Task
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
  _id: PropTypes.string,
};

export default AddTask;
