import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'

import { Images } from '@/theme'

const Image = styled.div`
  display: block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-position: center;
  background-size: cover;
  background-color: lightgray;
  border-radius: 12px;
  
  &.rounded {
    border-radius: 50%!important;
  }
`

const Thumbnail = ({ url, size, style, placeholderUrl, rounded, className, ...props }) => (
  <Image
    style={{ backgroundImage: `url(${url || placeholderUrl || Images.NO_IMAGE})`, ...style }}
    {...props}
    className={classNames(className, { rounded })}
    size={size || 40}
    alt=""
  />
)
Thumbnail.propTypes = {
  url: PropTypes.string,
  placeholderUrl: PropTypes.string,
  size: PropTypes.number,
  rounded: PropTypes.bool
}

export default Thumbnail
