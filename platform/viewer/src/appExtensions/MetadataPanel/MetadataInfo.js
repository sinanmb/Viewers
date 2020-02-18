import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MetadataPanel.styl';

class MetadataInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
    };
  }

  handleClick = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const metadataElement = (
      <div className="metadata-info-content">
        <h4>Name: {this.props.metadata.Name}</h4>
        <h4>Creation Date: {this.props.metadata.CreationDate}</h4>
        <h4>Version: {this.props.metadata.Version}</h4>
        <h4>Body Part: {this.props.metadata.body_part}</h4>
        <h4>
          Practice Friendly ID: {this.props.metadata.practice_friendly_id}
        </h4>
        <h4>Study ID: {this.props.metadata.study_id}</h4>
        <h4>
          Radiologist Assessment: {this.props.metadata.radiologist_assessment}
        </h4>
      </div>
    );

    return (
      <div>
        <h4 className="sectionTitle" onClick={this.handleClick}>
          Info
        </h4>
        {this.state.isOpen ? metadataElement : null}
      </div>
    );
  }
}

MetadataInfo.propTypes = {
  metadata: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
};

export default MetadataInfo;
