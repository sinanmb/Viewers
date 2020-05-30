import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PreviousStudyButton from './PreviousStudyButton';
import NextStudyButton from './NextStudyButton';
import WorkingListStudiesDropdown from './WorkingListStudiesDropdown';
import ReviewStatusComponent from './ReviewStatusComponent';
import StudyLockedByComponent from './StudyLockedByComponent';

class ToolbarWorkingListGroup extends Component {
  render() {
    const component = this.props.selectedWorkingList ? (
      <React.Fragment>
        <StudyLockedByComponent />
        <PreviousStudyButton />
        <WorkingListStudiesDropdown />
        <NextStudyButton />
        <ReviewStatusComponent />
      </React.Fragment>
    ) : null;

    return component;
  }
}

ToolbarWorkingListGroup.propTypes = {
  selectedWorkingList: PropTypes.string,
};

const mapStateToProps = state => ({
  selectedWorkingList: state.workingLists.selectedWorkingList,
});

export default connect(
  mapStateToProps,
  {}
)(ToolbarWorkingListGroup);
