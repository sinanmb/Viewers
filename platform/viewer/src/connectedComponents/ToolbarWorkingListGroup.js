import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PreviousStudyButton from './PreviousStudyButton';
import NextStudyButton from './NextStudyButton';
import WorkingListStudiesDropdown from './WorkingListStudiesDropdown';

class ToolbarWorkingListGroup extends Component {
  render() {
    const component = this.props.selectedWorkingList ? (
      <React.Fragment>
        <PreviousStudyButton />
        <WorkingListStudiesDropdown />
        <NextStudyButton />
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
