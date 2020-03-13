import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NerveComponent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onPositionChange: PropTypes.func.isRequired,
    onLocationSideChange: PropTypes.func.isRequired,
    onLocationLocationChange: PropTypes.func.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onCauseChange: PropTypes.func.isRequired,
  };

  render() {
    const intrathecalDisplayOnlyClasses =
      this.props.data.position === 'Intrathecal' ? 'group' : 'hidden';

    console.log('render nerve');
    console.log(this.props.data);
    console.log(intrathecalDisplayOnlyClasses);

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
        <div className={intrathecalDisplayOnlyClasses}>
          <h4>Location</h4>
          <label>
            <input
              type="radio"
              name="locationSide"
              value="Left"
              checked={this.props.data.location.side === 'Left'}
              onChange={this.onLocationSideChange}
            />
            Left
          </label>
          <label>
            <input
              type="radio"
              name="locationSide"
              value="Right"
              checked={this.props.data.location.side === 'Right'}
              onChange={this.onLocationSideChange}
            />
            Right
          </label>
        </div>
        {/* Location dropdown */}
        {/* Type of Nerve invovlment checkboxes*/}
        <div className={intrathecalDisplayOnlyClasses}>
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

          <div>
            <select
              onChange={this.onLocationLocationChange}
              value={this.props.data.study_instance_uid}
            >
              <option value="">Choose a location:</option>
              <option value="Central/paracentral">Central/paracentral</option>
              <option value="Lateral recess">Lateral recess</option>
              <option value="Neural foramen">Neural foramen</option>
              <option value="Extraforaminal">Extraforaminal</option>
            </select>
          </div>
        </div>
        {/* Cause Radiobuttons */}
        <div className={intrathecalDisplayOnlyClasses}>
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

  onLocationSideChange = e => {
    const value = e.target.value;
    this.props.onLocationSideChange(value);
  };

  onLocationLocationChange = e => {
    const value = e.target.value || null;
    this.props.onLocationLocationChange(value);
  };

  onTypeChange = e => {
    // TODO Sinan check if I need to convert to boolean for the value
    const name = e.target.name;
    const value = e.target.checked;
    this.props.onTypeChange(name, value);
  };

  onCauseChange = e => {
    const value = e.target.value;
    this.props.onCauseChange(value);
  };
}
