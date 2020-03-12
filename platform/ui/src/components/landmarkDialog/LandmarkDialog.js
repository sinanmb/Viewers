import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, SimpleDialog } from '@ohif/ui';
import StenosisComponent from './Stenosis';
import NerveComponent from './Nerve';
import LabelComponent from './Label';

class LandmarkDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
    measurementData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      // TODO Sinan: category and types options should not be hardcoded.
      labelOptions: ['Nerve', 'Stenosis'],
      label: props.measurementData.location,

      stenosis: {
        severalCentralCanalStenosis: false,
      },
    };
  }

  render() {
    return (
      <SimpleDialog
        headerTitle={this.props.title}
        onClose={this.props.onClose}
        onConfirm={this.onSubmit}
        // rootClass="editcategoryDialog"
      >
        <LabelComponent
          label={this.state.label}
          onChange={this.handleLabelChange}
        />

        {this.state.label === 'Stenosis' && (
          <StenosisComponent
            data={this.state.stenosis.severalCentralCanalStenosis}
            onChange={this.handleStenosisChange}
          />
        )}

        {/* {this.state.label === 'Nerve' && (
          <NerveComponent
            measurementData={this.measurementData}
            onChange={this.handleStenosisChange}
          />
        )} */}
      </SimpleDialog>
    );
  }

  onSubmit = e => {
    const measurements = {
      displayText: this.state.label,
      location: this.state.category,
      description: this.state.type,
    };
    this.props.onSubmit(measurements);
  };

  handleLabelChange = label => {
    this.setState({ label });
  };

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
    this.setState({
      type: this.state.typeOptions[event.target.value.toLowerCase()][0],
    });
  };

  handleTypeChange = event => {
    this.setState({ type: event.target.value });
  };

  handleStenosisChange = newValue => {
    const stenosis = {
      ...this.state.stenosis,
      severalCentralCanalStenosis: newValue,
    };

    this.setState({ stenosis });
  };
}

export { LandmarkDialog };
