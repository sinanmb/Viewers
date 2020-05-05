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
        <h4>Severe central canal stenosis </h4>
        <label>
          <input
            type="radio"
            name="severeCentralCanalStenosis"
            value={false}
            checked={this.props.data.severeCentralCanalStenosis === false}
            onChange={this.onChange}
          />
          No
        </label>
        <label>
          <input
            type="radio"
            name="severeCentralCanalStenosis"
            value={true}
            checked={this.props.data.severeCentralCanalStenosis === true}
            onChange={this.onChange}
          />
          Yes
        </label>
      </>
    );
  }

  onChange = e => {
    // Need to convert to boolean first
    const value = e.target.value == 'true' ? true : false;
    this.props.onChange(value);
  };
}
