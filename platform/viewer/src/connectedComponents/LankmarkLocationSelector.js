import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLocation } from '../actions/landmarkActions';

class LandmarkLocationSelector extends Component {
  selectNerve = _ => {
    this.props.selectLocation('Nerve');
  };

  selectStenosis = _ => {
    this.props.selectLocation('Stenosis');
  };

  handleSelection = e => {
    if (e.key === 'n' || e.key === '1') this.selectNerve();
    else if (e.key === 's' || e.key === '2') this.selectStenosis();
  };

  render() {
    const divStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '150px',
      marginBottom: '-37px',
      position: 'relative',
      paddingTop: '12px',
    };

    return this.props.isToolSelected ? (
      // Show only if landmark is selected
      <div style={divStyle}>
        <button
          type="button"
          className="pointer"
          disabled={this.props.selectedLocation === 'Nerve'}
          onClick={this.selectNerve}
        >
          Nerve
        </button>
        <button
          type="button"
          className="pointer"
          disabled={this.props.selectedLocation === 'Stenosis'}
          onClick={this.selectStenosis}
        >
          Stenosis
        </button>
      </div>
    ) : null;
  }
}

LandmarkLocationSelector.propTypes = {
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
)(LandmarkLocationSelector);
