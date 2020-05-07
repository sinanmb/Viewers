import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStudyIndex, selectStudy } from '../actions/workingListActions';
import { withRouter } from 'react-router-dom';
import { Icon } from '@ohif/ui';

class PreviousStudyButton extends Component {
  handleClick = async () => {
    if (this.props.studyIndex > 0) {
      const newIndex = this.props.studyIndex - 1;
      this.props.setStudyIndex(newIndex);
      await this.props.selectStudy(
        this.props.selectedWorkingListStudies[newIndex]
      );
      const path = `/viewer/${this.props.selectedWorkingListStudies[newIndex].study_instance_uid}`;
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
};

const mapStateToProps = state => ({
  studyIndex: state.workingLists.studyIndex,
  selectedWorkingListStudies: state.workingLists.selectedWorkingListStudies,
});

export default withRouter(
  connect(mapStateToProps, { setStudyIndex, selectStudy })(PreviousStudyButton)
);
