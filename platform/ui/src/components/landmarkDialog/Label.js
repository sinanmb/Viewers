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
          <div>
            <label>
              <input
                type="radio"
                name="label"
                value="Left Nerve"
                checked={this.props.label === 'Left Nerve'}
                onChange={this.onChange}
              />
              Left Nerve
            </label>
            <label>
              <input
                type="radio"
                name="label"
                value="Right Nerve"
                checked={this.props.label === 'Right Nerve'}
                onChange={this.onChange}
              />
              Right Nerve
            </label>
          </div>
          <div>
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
        </div>
      </>
    );
  }

  onChange = e => {
    const value = e.target.value;
    this.props.onChange(value);
  };
}
