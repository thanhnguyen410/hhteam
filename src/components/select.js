import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import lodash from 'lodash'
import { observer } from 'mobx-react'
import { Select as AntdSelect } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

import Media from '@/utils/media'
import { Colors } from '@/theme'

const StyledSelect = styled(AntdSelect)`
  width: 100%;

  &.ant-select-single {
    .ant-select-selector {
      font-size: 16px;
      height: 48px;
      border-radius: 6px;
      outline: none;
      /* box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2)!important; */
      transition: border-color 0.2s;
      border: solid 1px #e0e0e0;
      color: #9e9e9e;
      background-color: ${Colors.GRAY3};
      
      .ant-select-selection-search {
        input {
          height: 48px;
        }
      }
      
      .ant-select-selection-placeholder, .ant-select-selection-item {
        line-height: 48px;
      }
      
      .ant-select-selection-placeholder {
        color: #b0b4b5;
      }
    }
  }
  
  &.error {
    &.ant-select-single {
      .ant-select-selector {
        border: solid 1px red;
      }
    }
  }
  
  &.ant-select-sm {
    &.ant-select-single {
      .ant-select-selector {
        height: 40px;
        box-shadow: none!important;
        
        .ant-select-selection-search {
          input {
            height: 40px;
          }
        }
        
        .ant-select-selection-placeholder, .ant-select-selection-item {
          line-height: 40px;
        }
      }
    }
  }
  
    
  ${Media.lessThan(Media.SIZE.MD)} {
    &.ant-select-single {
      .ant-select-selector {
        font-size: 14px;
        height: 40px;
        padding: 0 10px;
        
        .ant-select-selection-search {
          input {
            height: 40px;
          }
        }
        
        .ant-select-selection-placeholder, .ant-select-selection-item {
          line-height: 40px;
        }
      }
    }
  }
`

const { Option } = AntdSelect

@observer
class Select extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    options: PropTypes.array,
    optionBinding: PropTypes.object,
    value: PropTypes.any,
    size: PropTypes.oneOf(['small', 'middle']),
    onChange: PropTypes.func,
    error: PropTypes.bool
  }

  static defaultProps = {
    options: []
  }

  _onChange = (value) => {
    const { field, form, onChange } = this.props
    if (onChange) onChange(value || null)

    if (field && form) form.setFieldValue(field.name, value || null)
  }

  _renderSuffixIcon = () => (
    <CaretDownOutlined style={{ fontSize: '12px', color: '#75838a' }} />
  )

  _renderOption = (option) => {
    if (lodash.isString(option) || lodash.isNumber(option)) {
      return <Option key={option} value={option}>{option}</Option>
    }

    const { optionBinding } = this.props

    let value
    let name
    if (lodash.isEmpty(optionBinding)) {
      value = option.value
      name = option.name
    } else {
      value = option[optionBinding.value]
      name = option[optionBinding.name]
    }

    return (
      <Option key={value} value={value}>{name}</Option>
    )
  }

  render() {
    const {
      field,
      form,
      value,
      error,
      className,
      options,
      onChange,
      optionBinding,
      ...props
    } = this.props

    return (
      <StyledSelect
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        value={options.length === 0 ? undefined : (field?.value || value)}
        virtual={false}
        onChange={this._onChange}
        suffixIcon={this._renderSuffixIcon}
        className={classnames({
          error: lodash.get(form, `errors.${field?.name}`) || error
        }, 'select', className)}
      >
        {options.map(this._renderOption)}
      </StyledSelect>
    )
  }
}

export default Select
