import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateWorkingListStudy,
  setDisableViewer,
} from '../actions/workingListActions';
import { Icon } from '@ohif/ui';
import api from '../utils/api';

class StudyLockedByComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { studyWhenMounted: this.props.selectedStudy };
  }

  unlockStudy = async e => {
    // Unlock study as the component is unmounting
    const params = {
      locked_by: null,
      user_google_id: this.props.userGoogleID,
    };

    if (this.state.studyWhenMounted.locked_by === this.props.userGoogleID) {
      try {
        api.put(
          `/working-lists/${this.props.selectedWorkingList}/studies/${this.state.studyWhenMounted.study_id}`,
          params
        );
      } catch (e) {
        console.log(
          `Can't unlock study while unmounting: ${this.state.studyWhenMounted.study_id}`
        );
      }
    }
  };

  componentDidMount() {
    window.addEventListener('unload', this.unlockStudy);
    this.setViewerDisability();
  }

  setViewerDisability() {
    if (this.state.studyWhenMounted.locked_by !== this.props.userGoogleID) {
      this.disableViewer();
    } else {
      this.enableViewer();
    }
  }

  disableViewer() {
    this.props.setDisableViewer(true);

    const viewerBelowToolBar = document.querySelector('.FlexboxLayout');
    const reviewStatus = document.querySelector('#review-status');

    viewerBelowToolBar.style.pointerEvents = 'none';
    reviewStatus.style.pointerEvents = 'none';
  }

  enableViewer() {
    this.props.setDisableViewer(false);

    const viewerBelowToolBar = document.querySelector('.FlexboxLayout');
    const reviewStatus = document.querySelector('#review-status');

    viewerBelowToolBar.style.pointerEvents = null;
    reviewStatus.style.pointerEvents = null;
  }

  componentWillUnmount() {
    this.unlockStudy();
  }

  render() {
    const iconStyle = {
      width: '1.5rem',
      height: '1.5rem',
      color: 'red',
      marginTop: '0.4rem',
    };

    if (this.props.isViewerDisabled) {
      return (
        <>
          <Icon name="lock" style={iconStyle} />
        </>
      );
    }
    return null;
  }
}

StudyLockedByComponent.propTypes = {
  selectedStudy: PropTypes.object.isRequired,
  selectedWorkingList: PropTypes.string.isRequired,
  updateWorkingListStudy: PropTypes.func.isRequired,
  isViewerDisabled: PropTypes.bool.isRequired,
  setDisableViewer: PropTypes.func.isRequired,
  userGoogleID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  selectedStudy: state.workingLists.selectedStudy,
  selectedWorkingList: state.workingLists.selectedWorkingList,
  updateWorkingListStudy: state.workingLists.updateWorkingListStudy,
  isViewerDisabled: state.workingLists.isViewerDisabled,
  userGoogleID: state.oidc.user.profile.email,
});

export default connect(
  mapStateToProps,
  { updateWorkingListStudy, setDisableViewer }
)(StudyLockedByComponent);
