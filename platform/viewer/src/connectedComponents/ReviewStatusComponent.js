import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setReviewStatus } from '../actions/workingListActions';
import { Icon } from '@ohif/ui';

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

    const buttonStyle = {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      margin: '0.25rem',
      marginTop: '-0.75rem',
    };

    const iconStyle = {
      width: '1rem',
      height: '1rem',
      color: 'white',
    };

    let status = 'Status';

    if (this.props.selectedStudy.status === true) {
      status = 'Reviewed';
      pStyle.color = 'green';
    } else if (this.props.selectedStudy.status === false) {
      status = 'Rejected';
      pStyle.color = 'red';
    }

    const rejectButton = (
      <button
        id=""
        type="button"
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.handleRejectlick}
      >
        <Icon name="times" style={iconStyle} />
      </button>
    );

    const reviewButton = (
      <button
        type="button"
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.handleReviewClick}
      >
        <Icon name="check" style={iconStyle} />
      </button>
    );

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
