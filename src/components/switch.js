/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLabel = styled.div`
  label{
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
    input { 
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e0e0e0;
      border: 1px solid #000000;
      -webkit-transition: .4s;
      transition: .4s;
      &::before {
        position: absolute;
        content: "";
        height: 21px;
        width: 21px;
        left: 1px;
        bottom: 1px;
        background-color: #000000;
        -webkit-transition: .4s;
        transition: .4s;
      }
    }
  }

  input:checked + .slider {
    &::before {
      background-color: #000000;
    }
  }

  input:focus + .slider {
    /* box-shadow: 0 0 1px #2196F3; */
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`

class Checkbox extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  }

  _onChange = (e) => {
    const { field, form, onChange } = this.props

    if (field && form) form.setFieldValue(field.name, e.target.checked)
    if (onChange) onChange(e)
  }

  render() {
    const { field, form, checked, className, ...props } = this.props

    return (
      <StyledLabel className={`check-box ${className}`}>
        <label className="switch">
          <input
            {...props}
            type="checkbox"
            checked={field?.value || checked}
            onChange={this._onChange}
          />
          <span className="slider round" />
        </label>
      </StyledLabel>
    )
  }
}

export default Checkbox
