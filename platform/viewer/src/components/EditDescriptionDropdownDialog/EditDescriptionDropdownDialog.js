import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import SimpleDialog from '../SimpleDialog/SimpleDialog.js';
import './../EditDescriptionDialog/EditDescriptionDialog.css';

export class EditDescriptionDropdownDialog extends Component {
  static propTypes = {
    description: PropTypes.string,
    measurementData: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      description: props.measurementData.description || '',
      // TODO: dropdown options should not be hardcoded.
      dropdownOptions: {
        nerve: ['nerve1', 'nerve2'],
        stenosis: ['stenosis1', 'stenosis2'],
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.description !== prevProps.description) {
      this.setState({
        description: this.props.description,
      });
    }
  }

  render() {
    const location =
      this.props.measurementData.location &&
      this.props.measurementData.location.toLowerCase();

    if (!location | !this.state.dropdownOptions.hasOwnProperty(location)) {
      return (
        <SimpleDialog
          headerTitle="Edit Description"
          onClose={this.onClose}
          onConfirm={this.onConfirm}
          rootClass="editDescriptionDialog"
        >
          You need to select a valid label first
        </SimpleDialog>
      );
    }

    const dropdownOptionElements = this.state.dropdownOptions[location].map(
      option => (
        <option value={option} key={option}>
          {option}
        </option>
      )
    );

    return (
      <SimpleDialog
        headerTitle="Edit Description"
        onClose={this.onClose}
        onConfirm={this.onConfirm}
        rootClass="editDescriptionDialog"
      >
        <select
          id="description"
          autoFocus
          className="simpleDialogInput"
          onChange={this.handleChange}
          value={this.state.description}
        >
          {dropdownOptionElements}
        </select>
      </SimpleDialog>
    );
  }

  onClose = () => {
    this.props.onCancel();
  };

  onConfirm = e => {
    e.preventDefault();
    this.props.onUpdate(this.state.description);
  };

  handleChange = event => {
    this.setState({ description: event.target.value });
  };
}
