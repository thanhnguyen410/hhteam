import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Div = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  flex: 1;
  min-width: 0;
  background-color: ${((props) => props.background || 'white')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default class extends Component {
  static propTypes = {
    background: PropTypes.string
  }

  scrollTop = () => {
    this._div.scrollTop = 0
  }

  render() {
    const { children, className, ...props } = this.props

    return (
      <>
        <Div
          {...props}
          id="scrollable-page"
          ref={(ref) => { this._div = ref }}
          className={className}
        >
          {children}
        </Div>
      </>
    )
  }
}
