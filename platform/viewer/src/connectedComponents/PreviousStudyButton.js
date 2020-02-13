import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStudyIndex } from '../actions/workingListActions';
import { withRouter } from 'react-router-dom';

class PreviousStudyButton extends Component {
  handleClick = () => {
    if (this.props.studyIndex > 0) {
      const newIndex = this.props.studyIndex - 1;
      this.props.setStudyIndex(newIndex);

      const path = `/viewer/${this.props.selectedWorkingListStudies[newIndex]}`;
      this.props.history.push(path);
    }
  };

  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Previous
      </button>
    );
  }
}

PreviousStudyButton.propTypes = {
  studyIndex: PropTypes.number.isRequired,
  setStudyIndex: PropTypes.func.isRequired,
  selectedWorkingListStudies: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  studyIndex: state.workingLists.studyIndex,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setStudyIndex }
  )(PreviousStudyButton)
);
