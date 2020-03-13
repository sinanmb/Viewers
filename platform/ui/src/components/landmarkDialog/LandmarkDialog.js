import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SimpleDialog } from '@ohif/ui';
import StenosisComponent from './Stenosis';
import NerveComponent from './Nerve';
import LabelComponent from './Label';
import './LandmarkDialog.styl';

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
      labelOptions: ['Nerve', 'Stenosis'],
      label: props.measurementData.location,

      nerve: {
        position: null,
        location: {
          location: null,
          side: null,
        },
        type: {
          displace: false,
          compress: false,
        },
        cause: null,
      },

      stenosis: {
        severalCentralCanalStenosis: null,
      },
    };
  }

  render() {
    return (
      <SimpleDialog
        headerTitle={this.props.title}
        onClose={this.props.onClose}
        onConfirm={this.onSubmit}
        className
        // rootClass="editcategoryDialog"
      >
        <LabelComponent
          label={this.state.label}
          onChange={this.handleLabelChange}
        />

        {this.state.label === 'Stenosis' && (
          <StenosisComponent
            data={this.state.stenosis}
            onChange={this.handleStenosisChange}
          />
        )}

        {this.state.label === 'Nerve' && (
          <NerveComponent
            data={this.state.nerve}
            onPositionChange={this.handlePositionChange}
            onLocationSideChange={this.handleLocationSideChange}
            onLocationLocationChange={this.handleLocationLocationChange}
            onTypeChange={this.handleTypeChange}
            onCauseChange={this.handleCauseChange}
          />
        )}
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

  handleStenosisChange = severalCentralCanalStenosis => {
    const stenosis = {
      ...this.state.stenosis,
      severalCentralCanalStenosis,
    };

    this.setState({ stenosis });
  };

  handlePositionChange = position => {
    const nerve = {
      ...this.state.nerve,
      position,
    };
    this.setState({ nerve });
  };

  handleLocationSideChange = side => {
    const nerve = { ...this.state.nerve };
    nerve.location.side = side;
    this.setState({ nerve });
  };

  handleLocationLocationChange = location => {
    const nerve = { ...this.state.nerve };
    nerve.location.location = location;
    this.setState({ nerve });
  };

  handleTypeChange = (name, value) => {
    const nerve = this.state.nerve;
    nerve.type[name] = value;
    this.setState({ nerve });
  };

  handleCauseChange = cause => {
    const nerve = {
      ...this.state.stenosis,
      cause,
    };
    this.setState({ nerve });
  };
}

export { LandmarkDialog };
