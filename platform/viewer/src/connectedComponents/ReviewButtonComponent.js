import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateWorkingListStudy } from '../actions/workingListActions';
import { Icon } from '@ohif/ui';

class ReviewButtonComponent extends Component {
  updateWorkingListStudy(action) {
    const status = action === 'approve' ? true : false;

    this.props.updateWorkingListStudy(
      this.props.selectedWorkingList,
      this.props.selectedStudy.study_instance_uid,
      status,
      this.props.userGoogleID,
      this.props.userGoogleID
    );
  }

  render() {
    const { action } = this.props;
    const iconName = action == 'approve' ? 'check' : 'times';

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
        onClick={() => this.updateWorkingListStudy(action)}
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
  updateWorkingListStudy: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  userGoogleID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  selectedStudy: state.workingLists.selectedStudy,
  selectedWorkingList: state.workingLists.selectedWorkingList,
  userGoogleID: state.oidc.user.profile.sub,
});

export default withRouter(
  connect(
    mapStateToProps,
    { updateWorkingListStudy }
  )(ReviewButtonComponent)
);
