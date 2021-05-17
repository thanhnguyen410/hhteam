// eslint-disable-next-line max-len
import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Page from '@/components/page'
import Container from '@/components/container'
import Footer from '@/components/footer'

const Content = styled.div`
  .container {
    padding-bottom: 88px;
    max-width: 100%;
    width: 100%;
  }
`

@inject((stores) => ({}))
@observer
class Top extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    // schedulerData.getMinuteStepsInHour()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Page>
          <Content>
            <Container>
              WELL COME TO THE HOME PAGE
            </Container>
          </Content>
        <Footer />
      </Page>
    )
  }
}

export default Top
