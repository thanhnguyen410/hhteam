import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'
import Media from '@/utils/media'
import Typography from '@/components/typography'

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 48px;
  align-items: flex-end;
  
  .label-box {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;
    margin-right: 30px;
  }
  
  /* Hide the browser's default radio button */
  .label-box input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  
  /* Create a custom radio button */
  .checkmark {
    margin-right: 10px;
    height: 20px;
    width: 20px;
    min-width: 20px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid ${Colors.PRIMARY};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* On mouse-over, add a grey background color */
  .label-box:hover input ~ .checkmark {
    opacity: 0.8;
  }
  
  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    opacity: 0;
  }
  
  /* Show the indicator (dot/circle) when checked */
  .label-box input:checked ~ .checkmark:after {
    opacity: 1;
  }

  /* Style the indicator (dot/circle) */
  .label-box .checkmark:after {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${Colors.PRIMARY};
    transition: opacity 0.2s;
  }
  
  &.vertical {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    
    .label-box {
      margin-bottom: 14px;
    }
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    .checkmark {
      height: 18px;
      width: 18px;
      min-width: 18px;
    }
    
    .label-box .checkmark:after {
      width: 10px;
      height: 10px;
    }
  }
`

class Radios extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    options: PropTypes.array,
    value: PropTypes.any,
    name: PropTypes.string,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
    optionBinding: PropTypes.object
  }

  static defaultProps = {
    options: []
  }

  _onChecked = (option) => {
    const { field, form, onChange } = this.props
    if (form && field) form.setFieldValue(field.name, option.value)
    if (onChange) onChange(option)
  }

  _renderOption = (option) => {
    const { field, name, value, optionBinding } = this.props
    if (optionBinding) {
      return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="label-box" key={option[optionBinding.value]}>
          <input
            type="radio"
            checked={(field?.value ?? value) === option[optionBinding.value]}
            onChange={() => this._onChecked(option)}
            name={field?.name || name}
          />
          <span className="checkmark" />
          <Typography>{option[optionBinding.name]}</Typography>
        </label>
      )
    }
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className="label-box" key={option.value}>
        <input
          type="radio"
          checked={(field?.value ?? value) === option.value}
          onChange={() => this._onChecked(option)}
          name={field?.name || name}
        />
        <span className="checkmark" />
        <Typography>{option.name}</Typography>
      </label>
    )
  }

  render() {
    const { className, options, vertical } = this.props

    return (
      <StyledDiv className={classnames({ vertical }, 'radios', className)}>
        {options.map(this._renderOption)}
      </StyledDiv>
    )
  }
}

export default Radios
