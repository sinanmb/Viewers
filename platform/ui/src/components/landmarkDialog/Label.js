import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelComponent extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    console.log('render');
    console.log(this.props.label);
    return (
      <>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="label"
              value="Nerve"
              checked={this.props.label === 'Nerve'}
              onChange={this.onChange}
            />
            Nerve
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="label"
              value="Stenosis"
              checked={this.props.label === 'Stenosis'}
              onChange={this.onChange}
            />
            Stenosis
          </label>
        </div>
      </>
    );
  }

  onChange = e => {
    // Need to convert to boolean first
    const value = e.target.value;
    this.props.onChange(value);
  };
}
