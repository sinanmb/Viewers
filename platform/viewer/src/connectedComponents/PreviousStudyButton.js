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

class PreviousStudyButton extends Component {
  handleClick = async () => {
    if (this.props.studyIndex > 0) {
      const previousIndex = this.props.studyIndex - 1;
      const previousStudy = this.props.selectedWorkingListStudies[
        previousIndex
      ];

      // TODO Sinan: Try to lock study we just loaded. If we can't, that means we should lock the viewer.
      try {
        await this.props.updateWorkingListStudy(
          this.props.selectedWorkingList,
          previousStudy.study_instance_uid,
          previousStudy.status,
          this.props.userGoogleID,
          this.props.userGoogleID
        );

        previousStudy.locked_by = this.props.userGoogleID;
        // this.props.setDisableViewer(false);
      } catch (e) {
        console.log(`Can't unlock study ${previousStudy.study_instance_uid}`);
        console.log(e);
      }

      this.props.setStudyIndex(previousIndex);
      await this.props.selectStudy(previousStudy);
      const path = `/viewer/${previousStudy.study_instance_uid}`;
      this.props.history.push(path);
    }
  };

  render() {
    const iconStyle = {
      width: '1rem',
      height: '1rem',
      color: this.props.studyIndex === 0 ? 'gray' : 'white',
    };
    const buttonStyle = {
      background: 'transparent',
      border: 'none',
      cursor: this.props.studyIndex === 0 ? 'default' : 'pointer',
      margin: '0.25rem',
      marginTop: '1rem',
    };

    return (
      <button
        type="button"
        style={buttonStyle}
        disabled={this.props.studyIndex === 0}
        onClick={this.handleClick}
      >
        <Icon name="step-backward" style={iconStyle} />
      </button>
    );
  }
}

PreviousStudyButton.propTypes = {
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
    { setStudyIndex, selectStudy, updateWorkingListStudy, setDisableViewer }
  )(PreviousStudyButton)
);
