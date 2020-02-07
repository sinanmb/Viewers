import React, { Component } from 'react';
import axios from 'axios';
import MetadataCategory from './MetadataCategory';
// import './metadatapanel.css';
// import './MetadataPanel.styl';

export default class MetadataPanel extends Component {
  state = {
    metadata: {},
  };

  componentDidMount() {
    // const json_metadata_original = 'https://api.myjson.com/bins/vdvw2';
    const json_metadata_modified = 'https://api.myjson.com/bins/hvuz6';

    axios.get(json_metadata_modified).then(response => {
      const metadata = response.data;
      this.setState({ metadata });

      for (let key in metadata.structured_report) {
        if (!metadata.structured_report.hasOwnProperty(key)) continue;
      }
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
            title="Urgent Pick List"
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
