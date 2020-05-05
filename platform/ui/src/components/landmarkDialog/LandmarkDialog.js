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

    const label = props.measurementData.location;

    let initialState = {
      labelOptions: ['Nerve', 'Stenosis'],
      label,

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
        severeCentralCanalStenosis: null,
      },
    };

    if (props.measurementData.annotation !== undefined) {
      for (let data in props.measurementData.annotation) {
        initialState[label.toLowerCase()][data] =
          props.measurementData.annotation[data];
      }
    }

    this.state = initialState;
  }

  render() {
    return (
      <SimpleDialog
        headerTitle={this.props.title}
        onClose={this.onClose}
        onConfirm={this.onSubmit}
        className
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

  onClose = e => {
    // Delete the landmark if just created, or just close the popup if clicked on edit description
    if (this.props.measurementData.annotation) {
      this.props.onClose();
    } else {
      this.props.onSubmit(null, true);
    }
  };

  onSubmit = e => {
    const updatedData = {
      ...this.state[this.state.label.toLowerCase()],
      label: this.state.label,
    };

    // Position Intrathecal does not have a location nor a cause
    if (
      updatedData.label === 'Nerve' &&
      updatedData.position === 'Intrathecal'
    ) {
      delete updatedData.location;
      delete updatedData.cause;
    }
    this.props.onSubmit(updatedData);
  };

  handleLabelChange = label => {
    this.setState({ label });
  };

  handleStenosisChange = severeCentralCanalStenosis => {
    const stenosis = {
      ...this.state.stenosis,
      severeCentralCanalStenosis,
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
      ...this.state.nerve,
      cause,
    };
    this.setState({ nerve });
  };
}

export { LandmarkDialog };
