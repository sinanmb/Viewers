import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StenosisComponent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        <h4>Severe central canal stenosis</h4>
        <div>
          <label>
            <input
              type="radio"
              name="severeCentralCanalStenosis"
              value="Cross-sectional area"
              checked={
                this.props.data.severeCentralCanalStenosis ===
                'Cross-sectional area'
              }
              onChange={this.onChange}
            />
            Cross-sectional area
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="severeCentralCanalStenosis"
              value="Shiraz criteria"
              checked={
                this.props.data.severeCentralCanalStenosis === 'Shiraz criteria'
              }
              onChange={this.onChange}
            />
            Shiraz criteria
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="severeCentralCanalStenosis"
              value="No"
              checked={this.props.data.severeCentralCanalStenosis === 'No'}
              onChange={this.onChange}
            />
            No
          </label>
        </div>
      </>
    );
  }

  onChange = e => this.props.onChange(e.target.value);
}
