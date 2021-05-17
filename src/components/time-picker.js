import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { TimePicker } from 'antd'
import lodash from 'lodash'

import { Colors } from '@/theme'

const StyledTimePicker = styled(TimePicker)`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  outline: none;
  padding: 15px;
  border: solid 1px #e0e0e0;
  /* box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2)!important; */
  transition: border-color 0.2s;
  -webkit-appearance: none;

  input {
    font-size: 16px;
  }
  
  &:focus {
    border: solid 1px ${Colors.BLUE1};
  }
  
  ::placeholder {
    color: #b0b4b5;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #b0b4b5;
  }

  ::-ms-input-placeholder {
    color: #b0b4b5;
  }
  
  &.error {
    border: solid 1px red;
  }
  
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

class TimePickerSelect extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.any,
    error: PropTypes.bool
  }

  _onChange = (time) => {
    const { field, form, onChange } = this.props

    if (onChange) onChange(time)

    if (field && form) form.setFieldValue(field.name, time)
  }

  render() {
    const { field, form, value, className, error, ...props } = this.props

    return (
      <StyledTimePicker
        {...field}
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        value={field?.value || value || ''}
        showNow={false}
        className={classnames({ error: error || lodash.get(form, `errors.${field?.name}`) }, className, 'input')}
        onChange={this._onChange}
      />
    )
  }
}

export default TimePickerSelect
