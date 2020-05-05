import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setReviewStatus } from '../actions/workingListActions';
import { Icon } from '@ohif/ui';

class ReviewButtonComponent extends Component {
  setReviewStatus(action) {
    const status = action === 'review' ? true : false;

    this.props.setReviewStatus(
      this.props.selectedWorkingList,
      this.props.selectedStudy.study_instance_uid,
      status
    );
  }

  render() {
    const { action } = this.props;
    const iconName = action == 'review' ? 'check' : 'times';

    const buttonStyle = {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
    };

    const iconStyle = {
      width: '1rem',
      height: '1rem',
      color: 'white',
    };

    const button = (
      <button
        id=""
        type="button"
        className="btn btn-default"
        style={buttonStyle}
        onClick={() => this.setReviewStatus(action)}
      >
        <Icon name={iconName} style={iconStyle} />
      </button>
    );

    return <>{button}</>;
  }
}

ReviewButtonComponent.propTypes = {
  selectedStudy: PropTypes.object.isRequired,
  selectedWorkingList: PropTypes.string.isRequired,
  setReviewStatus: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  selectedStudy: state.workingLists.selectedStudy,
  selectedWorkingList: state.workingLists.selectedWorkingList,
});

export default withRouter(
  connect(mapStateToProps, { setReviewStatus })(ReviewButtonComponent)
);
