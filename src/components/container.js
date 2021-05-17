import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'

import Media from '@/utils/media'

const Div = styled.div`
  /* max-width: 983px; */
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  
  ${Media.lessThan(Media.SIZE.XL)} {
    max-width: 960px;
  }
  
  ${Media.lessThan(Media.SIZE.LG)} {
    max-width: 720px;
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    max-width: 540px;
  }
  
  ${Media.lessThan(Media.SIZE.SM)} {
    max-width: initial;
  }
  
  &.deepPadding {
    padding: 0 20px;
  }
`

const Container = ({ children, deepPadding, className }) => {
  className = classNames(className, { deepPadding }, 'container')

  return (
    <Div className={className}>{ children }</Div>
  )
}
Container.propTypes = {
  deepPadding: PropTypes.bool
}

export default Container
