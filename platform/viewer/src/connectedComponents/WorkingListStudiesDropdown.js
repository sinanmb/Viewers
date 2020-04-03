import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStudyIndex, selectStudy } from '../actions/workingListActions';
import { withRouter } from 'react-router-dom';

class WorkingListStudiesDropdown extends Component {
  change = event => {
    const selectedStudyInstanceUID = event.target.value;

    const studyIndex = this.props.selectedWorkingListStudies.findIndex(
      study => study.study_instance_uid === selectedStudyInstanceUID
    );

    this.props.setStudyIndex(studyIndex);
    this.props.selectStudy(this.props.selectedWorkingListStudies[studyIndex]);

    // Update route params to refresh Viewer component
    const path = `/viewer/${this.props.selectedWorkingListStudies[studyIndex].study_instance_uid}`;
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
};

const mapStateToProps = state => ({
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
  studyIndex: state.workingLists.studyIndex,
  selectedStudy: state.workingLists.selectedStudy,
});

export default withRouter(
  connect(mapStateToProps, { setStudyIndex, selectStudy })(
    WorkingListStudiesDropdown
  )
);
