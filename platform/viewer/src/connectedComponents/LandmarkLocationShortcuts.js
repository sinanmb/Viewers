import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLocation } from '../actions/landmarkActions';

class LandmarkLocationShortcuts extends Component {
  handleSelection = e => {
    if (e.key === '1') this.props.selectLocation('Nerve');
    else if (e.key === '2') this.props.selectLocation('Stenosis');
  };

  componentDidMount() {
    if (this.props.isLandmarkToolSelected) {
      window.addEventListener('keypress', this.handleSelection);
    } else {
      window.removeEventListener('keypress', this.handleSelection);
    }
  }

  componentDidUpdate() {
    if (this.props.isLandmarkToolSelected) {
      window.addEventListener('keypress', this.handleSelection);
    } else {
      window.removeEventListener('keypress', this.handleSelection);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleSelection);
  }

  render() {
    return null;
  }
}

LandmarkLocationShortcuts.propTypes = {
  selectedLocation: PropTypes.string.isRequired,
  selectLocation: PropTypes.func.isRequired,
  isLandmarkToolSelected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  selectedLocation: state.landmark.selectedLocation,
  isLandmarkToolSelected: state.landmark.isToolSelected,
});

export default connect(
  mapStateToProps,
  { selectLocation }
)(LandmarkLocationShortcuts);
