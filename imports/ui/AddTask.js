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

  onInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  onSubmit = () => {
    this.props.onSubmit({
      description: this.state.description,
      details: this.state.details,
    });
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
  onSubmit: () => {},
};

AddTask.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddTask;
