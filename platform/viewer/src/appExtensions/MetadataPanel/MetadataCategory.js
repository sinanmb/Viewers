import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MetadataPanel.styl';

class MetadataCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
    };
  }

  handleClick = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const metadata_row = [];
    let key = 0;

    for (let [i, report] of this.props.metadata[
      this.props.category
    ].entries()) {
      for (let pathology of report.pathologies) {
        // Determine color
        let color = 'white';
        if (pathology.gt_severity + pathology.pred_severity > 0) {
          if (pathology.gt_severity == pathology.pred_severity) {
            color = 'green';
          } else {
            color = 'red';
          }
        }

        const order = i + 2;
        metadata_row.push(
          <React.Fragment key={key}>
            <div style={{ order: order, color: color }} className="Rtable-cell">
              <h3>{report.label}</h3>
            </div>
            <div style={{ order: order, color: color }} className="Rtable-cell">
              <h3>{pathology.label}</h3>
            </div>
            <div style={{ order: order, color: color }} className="Rtable-cell">
              <h3>{pathology.gt_severity}</h3>
            </div>
            <div style={{ order: order, color: color }} className="Rtable-cell">
              <h3>{pathology.pred_severity}</h3>
            </div>
          </React.Fragment>
        );
        key++;
      }
    }

    const metadataElement = (
      <div className="Rtable Rtable--4cols">
        <div style={{ order: '1' }} className="Rtable-cell">
          <h3>Disc</h3>
        </div>
        <div style={{ order: '1' }} className="Rtable-cell">
          <h3>Pathology</h3>
        </div>
        <div style={{ order: '1' }} className="Rtable-cell">
          <h3>Severity</h3>
        </div>
        <div style={{ order: '1' }} className="Rtable-cell">
          <h3>Prediction</h3>
        </div>
        {metadata_row}
      </div>
    );

    return (
      <div>
        <h4 className="sectionTitle" onClick={this.handleClick}>
          {this.props.title}
        </h4>
        {this.state.isOpen ? metadataElement : null}
      </div>
    );
  }
}

MetadataCategory.propTypes = {
  title: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};

export default MetadataCategory;
