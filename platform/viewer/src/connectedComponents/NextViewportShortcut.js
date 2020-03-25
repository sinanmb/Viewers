import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setViewportActive } from '../../../core/src/redux/actions';

class NextViewportShortcut extends Component {
  handleSelection = e => {
    if (e.key === '`') {
      const { numRows, numColumns, activeViewportIndex } = this.props.viewports;
      const numViewports = numRows * numColumns;

      let nextIndex =
        activeViewportIndex + 1 == numViewports.length
          ? 0
          : activeViewportIndex + 1;

      this.props.setViewportActive(nextIndex);
    }
  };

  componentDidMount() {
    window.addEventListener('keypress', this.handleSelection);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleSelection);
  }

  render() {
    return null;
  }
}

NextViewportShortcut.propTypes = {
  viewports: PropTypes.object.isRequired,
  setViewportActive: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  viewports: state.viewports,
});

export default connect(
  mapStateToProps,
  { setViewportActive }
)(NextViewportShortcut);
