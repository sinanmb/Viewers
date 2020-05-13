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
    const { report_html, study_id: studyId } = this.props.metadata.info;

    const metadataElement = (
      <div className="metadata-info-content">
        <h4>Study ID: {studyId}</h4>
        <h4>
          Radiologist Assessment:
          <div
            className="radiologist-assessment"
            dangerouslySetInnerHTML={{ __html: report_html }}
          />
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
