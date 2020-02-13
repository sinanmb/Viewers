import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getWorkingLists,
  selectWorkingList,
  getWorkingListStudies,
  setStudyIndex,
} from '../actions/workingListActions';

class WorkingListDropdown extends Component {
  componentDidMount() {
    this._mounted = true;
    this.props.getWorkingLists();
  }
  // TODO: Verify if I still need to do that
  componentWillUnmount() {
    this._mounted = false;
  }

  componentDidUpdate(prevProps) {
    // When we select a working list
    if (
      this.props.selectedWorkingListStudies !==
      prevProps.selectedWorkingListStudies
    ) {
      // Call callback to display the study view
      const studyIndex = 1;
      this.props.setStudyIndex(studyIndex);
      this.props.onSelectItem(this.props.selectedWorkingListStudies[1]);
    }
  }

  change = event => {
    this.props.selectWorkingList(event.target.value);
    this.props.getWorkingListStudies(event.target.value);

    // TODO: Find out if we will have StudyInstanceUIDs in postgres, or if we need to find a way to retrieve them based on the studyIDs
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
          value={this.props.selectedWorkingList}
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
};

const mapStateToProps = state => ({
  workingLists: state.workingLists.workingLists,
  selectedWorkingList: state.workingLists.selectedWorkingList,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
});

export default connect(
  mapStateToProps,
  { getWorkingLists, selectWorkingList, getWorkingListStudies, setStudyIndex }
)(WorkingListDropdown);
