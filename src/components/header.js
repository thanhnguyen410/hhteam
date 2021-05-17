import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import { Colors } from '@/theme'

const Div = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  background: ${Colors.GRAY_BACKGROUND};
  border-bottom: 2px solid ${Colors.PRIMARY};
  padding: 0 20px;
  display: flex;
  align-content: center;
`

const Header = ({ children, className }) => {
  className = classNames(className, 'header-page')

  return (
    <Div className={className}>{ children }</Div>
  )
}
Header.propTypes = {}

export default Header
