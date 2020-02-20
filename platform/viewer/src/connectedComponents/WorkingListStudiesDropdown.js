import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStudyIndex, selectStudy } from '../actions/workingListActions';
import { withRouter } from 'react-router-dom';

class WorkingListStudiesDropdown extends Component {
  change = event => {
    const selectedStudyInstanceUid = event.target.value;

    const studyIndex = this.props.selectedWorkingListStudies.findIndex(
      study => study.study_instance_uid === selectedStudyInstanceUid
    );

    this.props.setStudyIndex(studyIndex);
    this.props.selectStudy(selectedStudyInstanceUid);

    // Update route params to refresh Viewer component
    const path = `/viewer/${this.props.selectedWorkingListStudies[studyIndex].study_instance_uid}`;
    this.props.history.push(path);
  };

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.selectedStudy !==
  //     this.props.selectedStudy
  //   ) {
  //     const studyIndex = 0;
  //     this.props.setStudyIndex(studyIndex);
  //     this.props.selectStudy(
  //       this.props.selectedWorkingListStudies[studyIndex].study_instance_uid
  //     );
  //     this.props.onSelectItem(
  //       this.props.selectedWorkingListStudies[studyIndex].study_instance_uid
  //     );
  //   }

  render() {
    const workingListsStudiesOptionElements = this.props
      .selectedWorkingListStudies
      ? this.props.selectedWorkingListStudies.map(study => (
          <option
            value={study.study_instance_uid}
            key={study.study_instance_uid}
          >
            {/* TODO: This should be change to a short name that identifies the study */}
            {study.report_id}
          </option>
        ))
      : [];

    return (
      <div>
        <select
          id="working-list-studies"
          onChange={this.change}
          value={this.props.selectedStudy}
        >
          {workingListsStudiesOptionElements}
        </select>
        <p></p>
      </div>
    );
  }
}

WorkingListStudiesDropdown.propTypes = {
  selectedWorkingListStudies: PropTypes.array.isRequired,
  setStudyIndex: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  selectStudy: PropTypes.func.isRequired,
  selectedStudy: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
  studyIndex: state.workingLists.studyIndex,
  selectedStudy: state.workingLists.selectedStudy,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setStudyIndex, selectStudy }
  )(WorkingListStudiesDropdown)
);
