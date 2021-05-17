import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

const StyledDiv = styled.div`
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.7;
  }
  
  &.disabled {
    cursor: auto;
    opacity: 0.5;
  }
`

const Clickable = ({ children, disabled, className, onClick }) => (
  <StyledDiv
    className={classnames({ disabled }, className)}
    onClick={disabled ? () => null : onClick}
  >
    {children}
  </StyledDiv>
)
Clickable.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default Clickable
