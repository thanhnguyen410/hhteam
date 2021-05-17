import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import lodash from 'lodash'
import { observer } from 'mobx-react'
import { Select as AntdSelect } from 'antd'
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons'

import Input from '@/components/input'
import Media from '@/utils/media'

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16
    }}
  />
)

const StyledSelect = styled(AntdSelect)`
  width: 100%;
  .ant-select-dropdown {
    background: red;
  }
  &.ant-select-single {
    .ant-select-selector {
      font-size: 16px;
      height: 48px;
      border-radius: 6px;
      outline: none;
      //box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2)!important;
      transition: border-color 0.2s;
      border: solid 1px #e0e0e0;
      color: #9e9e9e;
      
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
`

const BoxSearch = styled.div`
  border-radius: 8px;
  .ant-input {
    border-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  ${Media.lessThan(Media.SIZE.MD)} {
    .input {
      border-radius: 8px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
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

  state = {
    name: ''
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

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
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
        dropdownStyle={{ padding: '0', borderRadius: '8px' }}
        dropdownRender={(menu) => (
          <BoxSearch className="dropdown-select-search">
            <Input
              prefix={suffix}
              placeholder="検索スタッフ"
              value={this.state.name}
              onChange={this.onNameChange}
            />
            {menu}
          </BoxSearch>
        )}
      >
        {options.map(this._renderOption)}
      </StyledSelect>
    )
  }
}

export default Select
