import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { DatePicker } from 'antd'
import moment from 'moment'
import lodash from 'lodash'
import locale from 'antd/es/date-picker/locale/ja_JP'

import Media from '@/utils/media'
import { Colors, Images } from '@/theme'

const StyledDiv = styled.div`
   position: relative;

  .ant-picker {
    width: 100%;
    height: 50px;
    font-size: 16px;
    border-radius: 12px;
    outline: none;
    padding: 15px;
    border: solid 1px #e0e0e0;
    /* box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2); */
    transition: border-color 0.2s;
    
    &.ant-picker-focused {
      border: solid 1px ${Colors.BLUE1};
    }
    
    .ant-picker-input {
      input {
        font-size: 16px;
        
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
      }
    }
    
    .ant-picker-suffix {
      img {
        width: 15px;
        height: 15px;
      }
    }
  }

  .calendar-icon {
    position: absolute;
    right: 15px;
    top: 13px;
    width: 20px;
  }

  &.error {
    .ant-picker {
      border: solid 1px red;
    }
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    .ant-picker {
      height: 40px;
      padding: 0 10px;

      .ant-picker-input {
        input {
          font-size: 14px;
        }
      }
    }
  }
`

class AdvanceDatePicker extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    inputOutputFormat: PropTypes.string,
    inputReadOnly: PropTypes.bool
  }

  static defaultProps = {
    inputReadOnly: true
  }

  _onChange = (date) => {
    const { field, form, onChange, inputOutputFormat } = this.props

    date = inputOutputFormat ? date?.format(inputOutputFormat) : date

    if (form && field) form.setFieldValue(field.name, date || null)
    if (onChange) onChange(date || null)
  }

  render() {
    const { field, form, className, inputOutputFormat, ...props } = this.props
    let { value } = this.props

    value = field?.value || value
    value = value && moment(value, inputOutputFormat)

    return (
      <StyledDiv
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, className)}
        {...(field && { id: `formik-field-${field.name}` })}
      >
        <DatePicker
          {...props}
          locale={locale}
          onChange={this._onChange}
          suffixIcon={<img src={Images.GRAY_CALENDAR_ICON} alt="" />}
          value={value}
        />
      </StyledDiv>
    )
  }
}

export default AdvanceDatePicker
