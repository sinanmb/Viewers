import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLocation } from '../actions/landmarkActions';

class LandmarkLocationShortcuts extends Component {
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

  componentDidMount() {
    if (this.props.isToolSelected) {
      window.addEventListener('keypress', this.handleSelection);
    } else {
      window.removeEventListener('keypress', this.handleSelection);
    }
  }

  componentDidUpdate() {
    if (this.props.isToolSelected) {
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
  isToolSelected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  selectedLocation: state.landmark.selectedLocation,
  isToolSelected: state.landmark.isToolSelected,
});

export default connect(
  mapStateToProps,
  { selectLocation }
)(LandmarkLocationShortcuts);
