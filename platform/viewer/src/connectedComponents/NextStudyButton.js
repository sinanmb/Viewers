import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStudyIndex, selectStudy } from '../actions/workingListActions';
import { withRouter } from 'react-router-dom';

class NextStudyButton extends Component {
  handleClick = async () => {
    if (
      this.props.studyIndex + 1 <
      this.props.selectedWorkingListStudies.length
    ) {
      const newIndex = this.props.studyIndex + 1;
      this.props.setStudyIndex(newIndex);
      await this.props.selectStudy(
        this.props.selectedWorkingListStudies[newIndex]
      );
      const path = `/viewer/${this.props.selectedWorkingListStudies[newIndex].study_instance_uid}`;
      this.props.history.push(path);
    }
  };

  render() {
    return (
      <button
        type="button"
        className="pointer"
        disabled={
          this.props.studyIndex ===
          this.props.selectedWorkingListStudies.length - 1
        }
        onClick={this.handleClick}
      >
        Next
      </button>
    );
  }
}

NextStudyButton.propTypes = {
  studyIndex: PropTypes.number.isRequired,
  setStudyIndex: PropTypes.func.isRequired,
  selectedWorkingListStudies: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  selectStudy: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  studyIndex: state.workingLists.studyIndex,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setStudyIndex, selectStudy }
  )(NextStudyButton)
);
