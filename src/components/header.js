import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import { Colors } from '@/theme'

const { Header } = Layout

const HeaderStyle = styled(Header)`
  background-color: ${Colors.WHITE1};
  border-bottom: 1px solid ${Colors.GRAY_COLOR_1};
  box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2);
`
@withRouter
class HeaderPage extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <HeaderStyle className="site-layout-background" style={{ padding: 0 }} />
    )
  }
}

export default HeaderPage
