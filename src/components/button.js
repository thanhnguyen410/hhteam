import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'
import Misc from '@/utils/misc'

const StyledButton = styled.button
  .attrs((props) => ({ as: props.href && Misc.IS_MOBILE ? 'a' : 'button' }))`
  overflow: hidden;
  position: relative;
  background-color: ${(props) => props.color};
  font-size: 16px;
  padding: 13px 26px;
  background-color: ${(props) => props.color || Colors.GRAY_COLOR_2};
  height: 50px;
  transition: opacity 0.2s;
  box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2);
  border: solid 1px #e0e0e0;
  outline: none;
  color: ${(props) => (props.textColor || 'white')} !important;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 300;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &.loading {
    &::after, &::before {
      display: flex;
    }
  }

  &.isButtonGray {
    background: ${Colors.GRAY_COLOR_2} !important;
  }

  &:disabled {
    opacity: 0.5;
  }

  &.medium {
    height: 30px;
    font-size: 12px;
  }
  
  &.large {
    height: 48px;
    font-size: 18px;
  }
  
  &.big {
    height: 62px;
    font-size: 18px;
    padding-left: 40px;
    padding-right: 40px;
  }
  
  .button-icon {
    position: absolute;
    left: 21px;
    top: 12px;
  }
  
  &::before {
    background-color: ${(props) => props.color};
    content: '';
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
  
  &::after {
    animation: rotation 0.7s infinite linear;
    content: '';
    border: 2px solid white;
    width: 20px;
    height: 20px;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    border-radius: 50%;
    position: absolute;
    border-bottom-color: transparent;
    border-top-color: transparent;
  }
  
  &::after, &::before {
    position: absolute;
    display: none;
  }
`

const Button = ({
  children,
  size,
  className,
  loading,
  isButtonGray,
  onClick,
  color,
  textColor,
  icon,
  ...props
}) => (
  <StyledButton
    {...props}
    color={color}
    textcolor={textColor}
    className={classnames(size, {
      loading,
      isButtonGray
    }, 'button', className)}
    onClick={loading ? null : onClick}
  >
    {icon && <img src={icon} alt="" className="button-icon" />}
    {children}
  </StyledButton>
)
Button.propTypes = {
  size: PropTypes.oneOf(['large', 'big', 'medium']),
  loading: PropTypes.bool,
  color: PropTypes.string,
  textColor: PropTypes.string,
  isButtonGray: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.string
}
Button.defaultProps = {
  color: Colors.PRIMARY
}

export default Button
