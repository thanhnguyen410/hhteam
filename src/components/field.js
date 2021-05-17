import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import { FastField as FormikFastField, Field as FormikField, ErrorMessage } from 'formik'

import { Images } from '@/theme'
import Typography from '@/components/typography'
import Media from '@/utils/media'

const Box = styled.div`
  position: relative;

  .label {
    margin-bottom: 6px;
    color: #849095;
  }

  img.img-icon {
    position: absolute;
    top: 16px;
    left: 10px;
    z-index: 9;
  }
`
const Group = styled.div`
  display: flex;
  
  ${Media.lessThan(Media.SIZE.MD)} {
    flex-direction: column;
    align-items: initial;
  }
`
const Wraper = styled.div`
  flex: 1;
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    margin-right: 0;
    margin-top: 13px;
    
    &:first-child {
      margin-top: 0;
    }
  }
`
const Label = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;

  >.__name {
    color: #849095;
  }
  
  .__require {
    margin-left: 15px;
    color: red;
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    >.__name {
      font-size: 12px;
    }
    
    .__require {
      margin-left: 7px;
      font-size: 10px;
    }
  }
`
const Inner = styled.div`
  display: flex;
  > * {
    flex: 1;
    margin-right: 12px;
    
    &:last-child {
      margin-right: 0;
    }
  }

  .select-full-date {
    .ant-select-single {
      min-width: auto !important;
      width: auto !important;
    }
  }

  .ant-select-single {
    min-width: 49%;
    width: 100%;
  }
`
const Blank = styled.div`
  flex: 1;
  
  ${Media.lessThan(Media.SIZE.MD)} {
    display: none;
  }
`
const Divider = styled.div`
  padding: 0 4px;
  flex: none;
  display: flex;
  align-items: center;
  margin-right: 0;
  margin-left: -12px;
  color: #707070;
`
const ErrorBox = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  
  img {
    margin-right: 3px;
    width: 15px;
  }
  
  .error-message {
    margin-top: 2px;
    color: #ff0000;
  }
`
const ViewOnly = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
`

class Field extends Component {
  static propTypes = {
    component: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    showError: PropTypes.bool,
    required: PropTypes.bool,
    blockUnnecessaryRerender: PropTypes.bool,
    frontIcon: PropTypes.string
  }

  static ViewOnly = ({ content }) => (
    <ViewOnly className="view-only">
      {content || '-'}
    </ViewOnly>
  )

  static defaultProps = {
    blockUnnecessaryRerender: true
  }

  static Group = Group

  static Wraper = Wraper

  static Blank = Blank

  static Divider = () => (
    <Divider>-</Divider>
  )

  static Label = ({ children, required, className }) => (
    <Label className={className}>
      <Typography bold className="__name">{children || <>&nbsp;</>}</Typography>
      {required && (
        <Typography className="__require" size="small">※必須</Typography>
      )}
    </Label>
  )

  static Inner = Inner

  static Error = ({ message, className }) => (
    <ErrorBox className={classNames(className, '__field-error-box')}>
      <img src={Images.RED_WARNING_ICON} alt="" />
      <Typography size="small" className="error-message">{message}</Typography>
    </ErrorBox>
  )

  render() {
    const {
      component: InputComponent,
      className,
      name,
      label,
      showError,
      blockUnnecessaryRerender,
      required,
      frontIcon,
      ...props
    } = this.props
    const FieldComponent = blockUnnecessaryRerender ? FormikFastField : FormikField

    return (
      <Box className={classNames(className, 'field')}>
        {label && (
          <Field.Label required={required}>
            {label}
          </Field.Label>
        )}
        <div>
          {frontIcon && <img src={frontIcon} alt="" className="img-icon" />}
          <FieldComponent {...props} name={name} component={InputComponent} />
          {showError && (
            <ErrorMessage name={name}>
              {(message) => message && (
                <Field.Error message={message} />
              )}
            </ErrorMessage>
          )}
        </div>
      </Box>
    )
  }
}

export default Field
