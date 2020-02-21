import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setReviewStatus } from '../actions/workingListActions';

class ReviewStatusComponent extends Component {
  handleRejectlick = () => this.setReviewStatus(false);
  handleReviewClick = () => this.setReviewStatus(true);

  setReviewStatus(status) {
    this.props.setReviewStatus(
      this.props.selectedWorkingList,
      this.props.selectedStudy.study_instance_uid,
      status
    );
  }

  render() {
    const pStyle = {
      color: 'white',
    };

    let status = 'Waiting for review';

    if (this.props.selectedStudy.status === true) {
      status = 'Reviewed';
      pStyle.color = 'green';
    } else if (this.props.selectedStudy.status === false) {
      status = 'Rejected';
      pStyle.color = 'red';
    }

    const rejectButton =
      this.props.selectedStudy.status !== false ? (
        <button id="" type="button" onClick={this.handleRejectlick}>
          Reject
        </button>
      ) : null;

    const reviewButton =
      this.props.selectedStudy.status !== true ? (
        <button type="button" onClick={this.handleReviewClick}>
          Review
        </button>
      ) : null;

    return (
      <div>
        <p style={pStyle}>{status}</p>
        {rejectButton}
        {reviewButton}
      </div>
    );
  }
}

ReviewStatusComponent.propTypes = {
  selectedStudy: PropTypes.object.isRequired,
  selectedWorkingList: PropTypes.string.isRequired,
  setReviewStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedStudy: state.workingLists.selectedStudy,
  selectedWorkingList: state.workingLists.selectedWorkingList,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setReviewStatus }
  )(ReviewStatusComponent)
);
