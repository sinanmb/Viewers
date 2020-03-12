import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StenosisComponent extends Component {
  static propTypes = {
    data: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="data"
              value={false}
              checked={this.props.data === false}
              onChange={this.onChange}
            />
            No
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="data"
              value={true}
              checked={this.props.data === true}
              onChange={this.onChange}
            />
            Yes
          </label>
        </div>
      </>
    );
  }

  onChange = e => {
    // Need to convert to boolean first
    const value = e.target.value == 'true' ? true : false;
    this.props.onChange(value);
  };
}
