import React, { Component } from 'react';
import MetadataCategory from './MetadataCategory';
import MetadataInfo from './MetadataInfo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../utils/api';

// import './metadatapanel.css';
// import './MetadataPanel.styl';

class MetadataPanel extends Component {
  state = {
    metadata: {},
  };

  componentDidMount() {
    const { pathname } = this.props.location;
    const studyInstanceUid = pathname.substring(pathname.lastIndexOf('/') + 1);

    api.get(`/metadata/${studyInstanceUid}`).then(response => {
      const metadata = response.data;
      this.setState({ metadata });

      // for (let key in metadata.structured_report) {
      //   if (!metadata.structured_report.hasOwnProperty(key)) continue;
      // }
    });
  }

  render() {
    if (Object.keys(this.state.metadata).length === 0) return null;

    return (
      <div className="metadataScrollArea">
        <div className="metadataScroll">
          <div className="metadata">
            <div className="metadataHeader">
              <h1 className="metadataHeaderTitle">Metadata</h1>
            </div>
          </div>
          <MetadataInfo metadata={this.state.metadata} isOpen={true} />
          <MetadataCategory
            title="Structured Report"
            metadata={this.state.metadata}
            category="structured_report"
          />
          <MetadataCategory
            title="QA Findings"
            metadata={this.state.metadata}
            category="qa_findings"
          />
          <MetadataCategory
            title="Urg Pick List"
            metadata={this.state.metadata}
            category="urg_pick_list"
          />
          <MetadataCategory
            title="Automated Pick List"
            metadata={this.state.metadata}
            category="automated_pick_list"
          />
        </div>
      </div>
    );
  }
}

MetadataPanel.propTypes = {
  location: PropTypes.object,
};

export default withRouter(MetadataPanel);