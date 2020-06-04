import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleRerefenceLinesDisplay } from '../actions/referenceLinesActions';

class ReferenceLinesToggle extends Component {
  toggle = e => {
    if (e.key === 'r') {
      this.props.toggleRerefenceLinesDisplay();
    }
  };

  componentDidMount() {
    window.addEventListener('keypress', this.toggle);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.toggle);
  }

  render() {
    return null;
  }
}

ReferenceLinesToggle.propTypes = {
  toggleRerefenceLinesDisplay: PropTypes.func.isRequired,
};

export default connect(
  null,
  { toggleRerefenceLinesDisplay }
)(ReferenceLinesToggle);
