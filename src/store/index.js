import React from 'react'
import { Provider } from 'mobx-react'
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'

import auth from './auth'
import assets from './assets'
import ui from './ui'

const browserHistory = createBrowserHistory()
export const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)

const stores = {
  routing: routingStore,
  auth,
  assets,
  ui
}

export default ({ children }) => (
  <Provider {...stores}>
    <Router history={history}>
      {children}
    </Router>
  </Provider>
)
