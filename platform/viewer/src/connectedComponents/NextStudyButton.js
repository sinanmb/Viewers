import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setStudyIndex,
  selectStudy,
  updateWorkingListStudy,
  setDisableViewer,
} from '../actions/workingListActions';
import { withRouter } from 'react-router-dom';
import { Icon } from '@ohif/ui';

import api from '../utils/api';
/*
 * Next Study button marks the current study as approved before going to next study
 */
class NextStudyButton extends Component {
  handleClick = async () => {
    if (this.props.selectedStudy.locked_by === this.props.userGoogleID) {
      // Save status and unlock study
      const { status } = this.props.selectedStudy;
      const approveStudyIfNoStatus = status === null ? true : status;
      await this.props.updateWorkingListStudy(
        this.props.selectedWorkingList,
        this.props.selectedStudy.study_instance_uid,
        approveStudyIfNoStatus,
        null, // Unlocking current study
        this.props.userGoogleID
      );
    }

    // Get first study sorted by status and by locked_by
    const nextStudy = await api
      .get(`/working-lists/${this.props.selectedWorkingList}/studies`)
      .then(response => response.data[0]);

    // Lock study we just loaded
    try {
      await this.props.updateWorkingListStudy(
        this.props.selectedWorkingList,
        nextStudy.study_instance_uid,
        nextStudy.status,
        this.props.userGoogleID,
        this.props.userGoogleID
      );
      nextStudy.locked_by = this.props.userGoogleID;
      // this.props.setDisableViewer(false);
    } catch (e) {
      console.log(`Can't unlock study ${nextStudy.study_instance_uid}`);
      console.log(e);
    }

    const newIndex = this.props.selectedWorkingListStudies.findIndex(
      study => study.study_id === nextStudy.study_id
    );

    // Go to next study
    this.props.setStudyIndex(newIndex);
    this.props.selectStudy(nextStudy);
    const path = `/viewer/${nextStudy.study_instance_uid}`;
    this.props.history.push(path);
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
  updateWorkingListStudy: PropTypes.func.isRequired,
  selectedStudy: PropTypes.object.isRequired,
  selectedWorkingList: PropTypes.string.isRequired,
  setDisableViewer: PropTypes.func.isRequired,
  userGoogleID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  studyIndex: state.workingLists.studyIndex,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
  selectedStudy: state.workingLists.selectedStudy,
  selectedWorkingList: state.workingLists.selectedWorkingList,
  userGoogleID: state.oidc.user.profile.email,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      setStudyIndex,
      selectStudy,
      updateWorkingListStudy,
      setDisableViewer,
    }
  )(NextStudyButton)
);
