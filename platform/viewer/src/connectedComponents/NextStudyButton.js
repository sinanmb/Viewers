import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setStudyIndex,
  selectStudy,
  setReviewStatus,
} from '../actions/workingListActions';
import { withRouter } from 'react-router-dom';
import { Icon } from '@ohif/ui';

/*
 * Next Study button marks the current study as approved before going to next study
 */
class NextStudyButton extends Component {
  handleClick = async () => {
    if (
      this.props.studyIndex + 1 <
      this.props.selectedWorkingListStudies.length
    ) {
      // Mark study as approved
      await this.props.setReviewStatus(
        this.props.selectedWorkingList,
        this.props.selectedStudy.study_instance_uid,
        true
      );

      // Go to next study
      const newIndex = this.props.studyIndex + 1;
      this.props.setStudyIndex(newIndex);
      this.props.selectStudy(this.props.selectedWorkingListStudies[newIndex]);
      const path = `/viewer/${this.props.selectedWorkingListStudies[newIndex].study_instance_uid}`;
      this.props.history.push(path);
    }
  };

  render() {
    const isLastIndex =
      this.props.studyIndex ===
      this.props.selectedWorkingListStudies.length - 1;

    const iconStyle = {
      width: '1rem',
      height: '1rem',
      color: isLastIndex ? 'gray' : 'white',
    };
    const buttonStyle = {
      background: 'transparent',
      border: 'none',
      cursor: isLastIndex ? 'default' : 'pointer',
      margin: '0.25rem',
      marginTop: '1rem',
    };

    return (
      <button
        type="button"
        style={buttonStyle}
        disabled={isLastIndex}
        onClick={this.handleClick}
      >
        <Icon name="step-forward" style={iconStyle} />
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
  setReviewStatus: PropTypes.func.isRequired,
  selectedStudy: PropTypes.object.isRequired,
  selectedWorkingList: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  studyIndex: state.workingLists.studyIndex,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
  selectedStudy: state.workingLists.selectedStudy,
  selectedWorkingList: state.workingLists.selectedWorkingList,
});

export default withRouter(
  connect(mapStateToProps, { setStudyIndex, selectStudy, setReviewStatus })(
    NextStudyButton
  )
);
