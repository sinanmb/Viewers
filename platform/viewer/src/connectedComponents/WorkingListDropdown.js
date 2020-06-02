import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getWorkingLists,
  selectWorkingList,
  getWorkingListStudies,
  setStudyIndex,
  selectStudy,
  updateWorkingListStudy,
  setDisableViewer,
} from '../actions/workingListActions';

class WorkingListDropdown extends Component {
  componentDidMount() {
    this.props.getWorkingLists();
  }

  change = async event => {
    const selectedWorkingList = event.target.value || null;

    this.props.selectWorkingList(selectedWorkingList);
    await this.props.getWorkingListStudies(selectedWorkingList);

    const studyIndex = 0;
    const selectedStudy = this.props.selectedWorkingListStudies[studyIndex];
    try {
      await this.props.updateWorkingListStudy(
        selectedWorkingList,
        selectedStudy.study_instance_uid,
        selectedStudy.status, //
        this.props.userGoogleID, // Locking current study if possible
        this.props.userGoogleID
      );
      selectedStudy.locked_by = this.props.userGoogleID;
      this.props.setStudyIndex(studyIndex);
      this.props.selectStudy(selectedStudy);
      this.props.onSelectItem(selectedStudy.study_instance_uid);
    } catch (e) {
      // Can't lock study. Disable UI.
      if (e.response && e.response.status === 403) {
        // this.props.setDisableViewer(true);
        this.props.setStudyIndex(studyIndex);
        this.props.selectStudy(selectedStudy);
        this.props.onSelectItem(selectedStudy.study_instance_uid);
      } else {
        alert('There is a problem with the working list studies');

        this.props.selectWorkingList(null);
        this.props.setStudyIndex(null);
        this.props.selectStudy(null);
      }
    }
  };

  render() {
    const workingListsOptionElements = this.props.workingLists
      ? this.props.workingLists.map(workingList => (
          <option value={workingList.id} key={workingList.id}>
            {workingList.name}
          </option>
        ))
      : [];

    return (
      <div>
        <select
          id="working-list"
          onChange={this.change}
          value={this.props.selectedWorkingList | ''}
        >
          <option value="">Choose a working list:</option>
          {workingListsOptionElements}
        </select>
        <p></p>
      </div>
    );
  }
}

WorkingListDropdown.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
  getWorkingLists: PropTypes.func.isRequired,
  workingLists: PropTypes.array.isRequired,
  selectWorkingList: PropTypes.func.isRequired,
  selectedWorkingList: PropTypes.string,
  getWorkingListStudies: PropTypes.func.isRequired,
  selectedWorkingListStudies: PropTypes.array.isRequired,
  setStudyIndex: PropTypes.func.isRequired,
  selectStudy: PropTypes.func.isRequired,
  userGoogleID: PropTypes.string.isRequired,
  updateWorkingListStudy: PropTypes.func.isRequired,
  setDisableViewer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  workingLists: state.workingLists.workingLists,
  selectedWorkingList: state.workingLists.selectedWorkingList,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
  userGoogleID: state.oidc.user && state.oidc.user.profile.sub,
});

export default connect(
  mapStateToProps,
  {
    getWorkingLists,
    selectWorkingList,
    getWorkingListStudies,
    setStudyIndex,
    selectStudy,
    updateWorkingListStudy,
    setDisableViewer,
  }
)(WorkingListDropdown);
