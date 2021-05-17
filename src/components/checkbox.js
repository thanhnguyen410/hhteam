import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Colors } from '@/theme'
import Typography from '@/components/typography'
import Media from '@/utils/media'

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    position: relative;
    height: 22px;
    width: 22px;
    border: solid 1px #e0e0e0;
    border-radius: 2px;
    transition: background-color 0.2s;
    margin-right: 12px;
    background-color: white;
  }
  
  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
    background-color: #f8f8f8;
  }
  
  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: ${Colors.PRIMARY};
    border: solid 1px ${Colors.PRIMARY};
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 8px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    .checkmark {
      height: 17px;
      width: 17px;
    }
    
    .checkmark:after {
      top: 1px;
      left: 5px;
      width: 5px;
      height: 10px;
      border-width: 0 2px 2px 0;
    }
  }
`

class Checkbox extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  }

  _onChange = (e) => {
    const { field, form, onChange } = this.props

    if (field && form) form.setFieldValue(field.name, e.target.checked)
    if (onChange) onChange(e)
  }

  render() {
    const { field, form, checked, label, children, className, ...props } = this.props

    return (
      <StyledLabel
        className="check-box"
        {...(field && { id: `formik-field-${field.name}` })}
      >
        <input
          {...props}
          type="checkbox"
          checked={field?.value || checked}
          onChange={this._onChange}
        />
        <span className="checkmark" />
        {(label || children) && (
          <Typography>{label || children}</Typography>
        )}
      </StyledLabel>
    )
  }
}

export default Checkbox
