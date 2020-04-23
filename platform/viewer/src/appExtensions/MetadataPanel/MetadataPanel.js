import React, { Component } from 'react';
import MetadataCategory from './MetadataCategory';
import MetadataInfo from './MetadataInfo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../utils/api';

class MetadataPanel extends Component {
  state = {
    metadata: {},
  };

  componentDidMount() {
    const { pathname } = this.props.location;
    const studyInstanceUID = pathname.substring(pathname.lastIndexOf('/') + 1);

    api.get(`/studies/${studyInstanceUID}/metadata`).then(response => {
      const metadata = response.data;
      this.setState({ metadata });
    });
  }

  render() {
    if (Object.keys(this.state.metadata).length === 0)
      return (
        <>
          <div className="metadata">
            <div className="metadataHeader">
              <h1 className="metadataHeaderTitle">Metadata</h1>
            </div>
          </div>
          <div className="metadata-info-content">
            There is no metadata for this study
          </div>
        </>
      );

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
            title="Automated Report Assessment"
            metadata={this.state.metadata}
            category="structured_report"
          />
          <MetadataCategory
            title="Automated Imaging Assessment"
            metadata={this.state.metadata}
            category="qa_findings"
          />
          <MetadataCategory
            title="Urg QA"
            metadata={this.state.metadata}
            category="urg_pick_list"
          />
          <MetadataCategory
            title="Automated QA"
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
