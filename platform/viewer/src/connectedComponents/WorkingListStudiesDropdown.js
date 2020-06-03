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

class WorkingListStudiesDropdown extends Component {
  change = async event => {
    const selectedStudyInstanceUID = event.target.value;

    const studyIndex = this.props.selectedWorkingListStudies.findIndex(
      study => study.study_instance_uid === selectedStudyInstanceUID
    );

    const newStudy = this.props.selectedWorkingListStudies[studyIndex];

    // Lock study we just loaded
    try {
      await this.props.updateWorkingListStudy(
        this.props.selectedWorkingList,
        newStudy.study_instance_uid,
        newStudy.status,
        this.props.userGoogleID,
        this.props.userGoogleID
      );
      newStudy.locked_by = this.props.userGoogleID;
    } catch (e) {
      console.log(`Can't unlock study ${newStudy.study_instance_uid}`);
      console.log(e);
    }

    this.props.setStudyIndex(studyIndex);
    await this.props.selectStudy(newStudy);

    // Update route params to refresh Viewer component
    const path = `/viewer/${newStudy.study_instance_uid}`;
    this.props.history.push(path);
  };

  render() {
    const workingListsStudiesOptionElements = this.props
      .selectedWorkingListStudies
      ? this.props.selectedWorkingListStudies.map(study => (
          <option
            value={study.study_instance_uid}
            key={study.study_instance_uid}
          >
            {study.study_id}
          </option>
        ))
      : [];

    const style = {
      marginLeft: 0,
      width: '17rem',
    };

    return (
      <div>
        <select
          id="working-list-studies"
          onChange={this.change}
          value={this.props.selectedStudy.study_instance_uid}
          style={style}
        >
          {workingListsStudiesOptionElements}
        </select>
      </div>
    );
  }
}

WorkingListStudiesDropdown.propTypes = {
  selectedWorkingListStudies: PropTypes.array.isRequired,
  setStudyIndex: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  selectStudy: PropTypes.func.isRequired,
  selectedStudy: PropTypes.object.isRequired,
  updateWorkingListStudy: PropTypes.func.isRequired,
  selectedWorkingList: PropTypes.string.isRequired,
  userGoogleID: PropTypes.string.isRequired,
  setDisableViewer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
  studyIndex: state.workingLists.studyIndex,
  selectedStudy: state.workingLists.selectedStudy,
  selectedWorkingList: state.workingLists.selectedWorkingList,
  userGoogleID: state.oidc.user.profile.email,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setStudyIndex, selectStudy, updateWorkingListStudy, setDisableViewer }
  )(WorkingListStudiesDropdown)
);
