import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReviewButtonComponent from './ReviewButtonComponent';

class ReviewStatusComponent extends Component {
  render() {
    const pStyle = {
      color: 'white',
      textAlign: 'center',
    };

    const reviewButtonsStyle = {
      marginTop: '-0.75rem',
    };

    let status = 'Status';

    if (this.props.selectedStudy.status === true) {
      status = 'Reviewed';
      pStyle.color = 'green';
    } else if (this.props.selectedStudy.status === false) {
      status = 'Rejected';
      pStyle.color = 'red';
    }

    return (
      <div>
        <p style={pStyle}>{status}</p>
        <div style={reviewButtonsStyle}>
          <ReviewButtonComponent action="reject" />
          <ReviewButtonComponent action="review" />
        </div>
      </div>
    );
  }
}

ReviewStatusComponent.propTypes = {
  selectedStudy: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  selectedStudy: state.workingLists.selectedStudy,
});

export default connect(mapStateToProps, {})(ReviewStatusComponent);
