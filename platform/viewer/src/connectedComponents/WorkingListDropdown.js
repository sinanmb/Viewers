import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getWorkingLists,
  selectWorkingList,
  getWorkingListStudies,
  setStudyIndex,
  selectStudy,
} from '../actions/workingListActions';

class WorkingListDropdown extends Component {
  componentDidMount() {
    this.props.getWorkingLists();
  }

  change = event => {
    const selectedWorkingList = event.target.value || null;

    this.props.selectWorkingList(selectedWorkingList);
    this.props.getWorkingListStudies(selectedWorkingList);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedWorkingListStudies !==
      this.props.selectedWorkingListStudies
    ) {
      const studyIndex = 0;
      this.props.setStudyIndex(studyIndex);
      this.props.selectStudy(this.props.selectedWorkingListStudies[studyIndex]);
      this.props.onSelectItem(
        this.props.selectedWorkingListStudies[studyIndex].study_instance_uid
      );
    }
  }

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
};

const mapStateToProps = state => ({
  workingLists: state.workingLists.workingLists,
  selectedWorkingList: state.workingLists.selectedWorkingList,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
});

export default connect(
  mapStateToProps,
  {
    getWorkingLists,
    selectWorkingList,
    getWorkingListStudies,
    setStudyIndex,
    selectStudy,
  }
)(WorkingListDropdown);
