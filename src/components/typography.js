import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'

const StyledP = styled.p`
  text-align: ${(props) => props.align || 'left'};
  font-weight: ${(props) => (props.bold ? '700' : props.medium ? '500' : '400')};
  font-size: 14px;
  
  &.tiny {
    font-size: 10px;
  }
  
  &.small {
    font-size: 12px;
  }
  
  &.large {
    font-size: 16px;
  }
  
  &.big {
    font-size: 18px;
  }
  
  &.huge {
    font-size: 20px;
  }
  
  &.giant {
    font-size: 30px;
  }
  
  &.enormous {
    font-size: 40px;
  }
  
  &.link {
    cursor: pointer;
    user-select: none;
  }
  
  &.primary {
    color: ${Colors.PRIMARY};
  }
  
  &.warning {
    color: ${Colors.WARNING};
  }

  &.gray {
    color: ${Colors.GRAY_COLOR_2};
  }
  
  &.lightGray {
    color: ${Colors.GRAY_COLOR_1};
  }
  
  &.description {
    color: #75838a;
  }
  
  &.center {
    text-align: center;
  }
`

const Typography = ({
  className,
  children,
  link,
  primary,
  warning,
  gray,
  lightGray,
  description,
  center,
  size,
  ...props
}) => (
  <StyledP
    className={classnames(size || '', {
      link,
      primary,
      center,
      warning,
      gray,
      lightGray,
      description
    }, 'typography', className)}
    {...props}
  >
    {children}
  </StyledP>
)
Typography.propTypes = {
  size: PropTypes.string,
  link: PropTypes.bool,
  primary: PropTypes.bool,
  warning: PropTypes.bool,
  bold: PropTypes.bool,
  medium: PropTypes.bool,
  gray: PropTypes.bool,
  lightGray: PropTypes.bool,
  description: PropTypes.bool,
  center: PropTypes.bool
}

export default Typography
