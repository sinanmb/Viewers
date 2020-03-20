import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelComponent extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        <div className="group">
          <h4>Label</h4>
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
    const value = e.target.value;
    this.props.onChange(value);
  };
}
