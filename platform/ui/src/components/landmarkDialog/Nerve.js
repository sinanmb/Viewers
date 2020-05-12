import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NerveComponent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onPositionChange: PropTypes.func.isRequired,
    onLocationChange: PropTypes.func.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onCauseChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        {/* Position */}
        <div className="group">
          <h4>Position</h4>
          <label>
            <input
              type="radio"
              name="position"
              value="Intrathecal"
              checked={this.props.data.position === 'Intrathecal'}
              onChange={this.onPositionChange}
            />
            Intrathecal
          </label>
          <label>
            <input
              type="radio"
              name="position"
              value="Extrathecal"
              checked={this.props.data.position === 'Extrathecal'}
              onChange={this.onPositionChange}
            />
            Extrathecal
          </label>
        </div>
        {/* Location side*/}
        <div className="group">
          <h4>Location</h4>
          {/* Location dropdown */}
          <div>
            <select
              onChange={this.onLocationChange}
              value={this.props.data.location || ''}
            >
              <option value="">Choose a location:</option>
              <option value="Central/paracentral">Central/paracentral</option>
              <option value="Lateral recess">Lateral recess</option>
              <option value="Neural foramen">Neural foramen</option>
              <option value="Extraforaminal">Extraforaminal</option>
            </select>
          </div>
        </div>

        {/* Type of Nerve invovlment checkboxes*/}
        <div className="group">
          <h4>Type</h4>
          <div>
            <label>
              <input
                name="displace"
                type="checkbox"
                checked={this.props.data.type.displace === true}
                onChange={this.onTypeChange}
              />
              Displace
            </label>

            <label>
              <input
                name="compress"
                type="checkbox"
                checked={this.props.data.type.compress === true}
                onChange={this.onTypeChange}
              />
              Compress
            </label>
          </div>
        </div>
        {/* Cause Radiobuttons */}
        <div className="group">
          <h4>Cause</h4>
          <label>
            <input
              type="radio"
              name="cause"
              value="Disc"
              checked={this.props.data.cause === 'Disc'}
              onChange={this.onCauseChange}
            />
            Disc
          </label>
          <label>
            <input
              type="radio"
              name="cause"
              value="Osteophyte"
              checked={this.props.data.cause === 'Osteophyte'}
              onChange={this.onCauseChange}
            />
            Osteophyte
          </label>
          <label>
            <input
              type="radio"
              name="cause"
              value="Stenosis"
              checked={this.props.data.cause === 'Stenosis'}
              onChange={this.onCauseChange}
            />
            Stenosis
          </label>
        </div>
      </>
    );
  }

  onPositionChange = e => {
    const value = e.target.value;
    this.props.onPositionChange(value);
  };

  onLocationChange = e => {
    const value = e.target.value || null;
    this.props.onLocationChange(value);
  };

  onTypeChange = e => {
    const name = e.target.name;
    const value = e.target.checked;
    this.props.onTypeChange(name, value);
  };

  onCauseChange = e => {
    const value = e.target.value;
    this.props.onCauseChange(value);
  };
}
