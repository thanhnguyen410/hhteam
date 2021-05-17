import React, { Component, Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Storage from '@/utils/storage'
import Loading from '@/components/loading'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import MenuBar from './menu-bar'

const Login = lazy(() => import('@/pages/account/login-page'))
const Home = lazy(() => import('@/pages/top'))

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const HorizontalBox = styled.div`
  display: flex;
  min-height: 0;
  position: relative;
`

const PrivateRoute = ({ condition, redirect, ...props }) => {
  condition = condition()

  if (condition) return <Route {...props} />
  return <Redirect to={redirect} />
}
PrivateRoute.propTypes = {
  condition: PropTypes.func,
  redirect: PropTypes.string
}

@inject((stores) => ({
  uiStore: stores.ui
}))
@observer
class Routes extends Component {
  static propTypes = {
    uiStore: PropTypes.object
  }

  componentDidMount() {}

  _renderLazyComponent = (LazyComponent, params) => (props) => <LazyComponent {...props} {...params} />

  _renderPrivateRoutes = () => (
    <HorizontalBox>
      <MenuBar />
      <VerticalBox>
        <Header />
        <Suspense fallback={<Page sidebar><Loading /></Page>}>
          <Switch>
            <Route exact path="/" component={this._renderLazyComponent(Home)} />
            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
        <Footer />
      </VerticalBox>
    </HorizontalBox>
  )

  render() {
    return (
      <VerticalBox>
        <Suspense fallback={<Page><Loading /></Page>}>
          <Switch>
            <Route path="/login" component={this._renderLazyComponent(Login)} />

            <PrivateRoute
              condition={() => Storage.has('ACCESS_TOKEN')}
              redirect="/login"
              path="/"
              component={this._renderPrivateRoutes}
            />
          </Switch>
        </Suspense>
      </VerticalBox>
    )
  }
}

export default Routes
