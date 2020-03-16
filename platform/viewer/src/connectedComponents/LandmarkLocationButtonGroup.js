import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLocation } from '../actions/landmarkActions';

import { RoundedButtonGroup } from '@ohif/ui';

class LandmarkLocationButtonGroup extends Component {
  render() {
    const divStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '150px',
      marginTop: '-40px',
    };

    const options = [
      {
        value: 'Nerve',
        icon: 'sun',
        bottomLabel: 'Nerve',
      },
      {
        value: 'Stenosis',
        icon: 'ellipse-v',
        bottomLabel: 'Stenosis',
      },
    ];

    return this.props.isToolSelected ? (
      // Show only if landmark is selected
      <div style={divStyle}>
        <RoundedButtonGroup
          options={options}
          value={this.props.selectedLocation}
          onValueChanged={this.props.selectLocation}
        />
      </div>
    ) : null;
  }
}

LandmarkLocationButtonGroup.propTypes = {
  selectedLocation: PropTypes.string.isRequired,
  selectLocation: PropTypes.func.isRequired,
  isToolSelected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  selectedLocation: state.landmark.selectedLocation,
  isToolSelected: state.landmark.isToolSelected,
});

export default connect(
  mapStateToProps,
  { selectLocation }
)(LandmarkLocationButtonGroup);
