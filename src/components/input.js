import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { Input as AntInput } from 'antd'
import lodash from 'lodash'

import { Colors } from '@/theme'

const StyledInput = styled(AntInput)`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 12px;
  outline: none;
  padding: 15px;
  border: solid 1px ${Colors.GRAY_COLOR_2};
  box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2);
  transition: border-color 0.2s;
  background-color: ${Colors.GRAY3};
  -webkit-appearance: none;
  
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
  
  &[type=number] {
    -moz-appearance: textfield;
  }
  
  &.small {
    height: 40px;
    box-shadow: none!important;
  }
`

class Input extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'normal']),
    value: PropTypes.any,
    error: PropTypes.bool,
    inputMask: PropTypes.oneOf(['number'])
  }

  _onChange = (e) => {
    const { field, form, onChange, inputMask } = this.props

    let { value } = e.target

    if (inputMask === 'number') {
      value = value.replace(/[^0-9]/g, '')
    }

    if (onChange) onChange(e)

    if (field && form) form.setFieldValue(field.name, value)
  }

  render() {
    const { field, form, value, className, size, error, inputMask, ...props } = this.props

    return (
      <StyledInput
        {...field}
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        value={field?.value || value || ''}
        className={classnames({ error: error || lodash.get(form, `errors.${field?.name}`) }, size, className, 'input')}
        onChange={this._onChange}
      />
    )
  }
}

export default Input
