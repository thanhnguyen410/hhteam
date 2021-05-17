import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { Input } from 'antd'
import lodash from 'lodash'

import { Colors } from '@/theme'
import Media from '@/utils/media'

const { TextArea: AntTextArea } = Input

const StyledTextArea = styled(AntTextArea)`
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 6px;
  outline: none;
  padding: 12px;
  border: solid 1px #e0e0e0;
  /* box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2)!important; */
  transition: border-color 0.2s;
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
  
  ${Media.lessThan(Media.SIZE.MD)} {
    font-size: 14px;
    padding: 10px;
  }
`

class TextArea extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  _onChange = (e) => {
    const { field, form, onChange } = this.props

    if (onChange) onChange(e)

    if (field && form) form.setFieldValue(field.name, e.target.value)
  }

  render() {
    const { field, form, value, className, ...props } = this.props

    return (
      <StyledTextArea
        {...field}
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        value={field?.value || value}
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, className, 'text-area')}
        onChange={this._onChange}
      />
    )
  }
}

export default TextArea
