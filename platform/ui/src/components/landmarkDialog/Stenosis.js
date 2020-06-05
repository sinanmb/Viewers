import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StenosisComponent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { severeCentralCanalStenosis } = this.props.data;

    return (
      <>
        <h4>Severe central canal stenosis</h4>
        <div>
          <label>
            <input
              type="checkbox"
              name="crossSectionalArea"
              checked={severeCentralCanalStenosis.crossSectionalArea === true}
              onChange={this.onChange}
            />
            Cross-sectional area
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="shizasCriteria"
              checked={severeCentralCanalStenosis.shizasCriteria === true}
              onChange={this.onChange}
            />
            Schizas criteria
          </label>
        </div>
      </>
    );
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.checked;
    this.props.onChange(name, value);
  };
}
