import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class WorkingListDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedWorkingList: this.props.selectedWorkingList | '' };
  }

  componentDidMount() {
    this._mounted = true;
    const workingListsEndpoint = 'https://api.myjson.com/bins/wom5g';

    axios.get(workingListsEndpoint).then(response => {
      if (this._mounted) {
        const workingLists = response.data;
        this.setState({ workingLists });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getWorkingListStudyIds(workingListId) {
    const workingListStudiesEndpoint = '';

    axios.get(workingListStudiesEndpoint).then(response => {
      if (this._mounted) {
        const studies = response.data;
        this.setState({ studies });
        // TODO: Store the studies in redux so we can access them from the study view
      }
    });
  }

  change = event => {
    // TODO: Set the state in redux
    this.setState({ selectedWorkingList: event.target.value });

    // TODO: Find out if we will have StudyInstanceUIDs in postgres, or if we need to find a way to retrieve them based on the studyIDs

    // Call callback to display the study view
    const dummyStudyCaseInstanceUID =
      '1.2.826.0.13854362241694438965858641723883466450351448';
    this.props.onSelectItem(dummyStudyCaseInstanceUID, this.state.studies);
  };

  render() {
    const workingListsOptionElements = this.state.workingLists
      ? this.state.workingLists.map(workingList => (
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
          value={this.state.selectedWorkingList}
        >
          <option value="">Choose a working list:</option>
          {workingListsOptionElements}
        </select>
        <p></p>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

WorkingListDropdown.propTypes = {
  selectedWorkingList: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired,
};

export default WorkingListDropdown;
