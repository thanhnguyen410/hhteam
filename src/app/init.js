import { Component } from 'react'
import PropTypes from 'prop-types'
import setLocale from 'yup/lib/setLocale'
import moment from 'moment'
import { inject, observer } from 'mobx-react'
import 'moment/locale/ja'

import Request from '@/utils/request'
import Storage from '@/utils/storage'
// import { routingStore } from '@/store'

moment.locale('ja')
setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@inject((stores) => ({
  authStore: stores.auth
}))
@observer
class Init extends Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  state = {
    inited: false
  }

  async componentDidMount() {
    const { authStore } = this.props

    const token = Storage.get('ACCESS_TOKEN')

    if (!['/login'].includes(window.location.pathname)) {
      Request.setAccessToken(token)
    }

    if (token === 'preCheck') {
      await authStore.getInitialData()
    }

    this.setState({ inited: true })

    this._hidePreloading()
  }

  _hidePreloading() {
    const preloading = document.getElementsByClassName('preloading')[0]

    const fadeEffect = setInterval(() => {
      if (!preloading.style.opacity) {
        preloading.style.opacity = 1
      }
      if (preloading.style.opacity === '1') {
        preloading.style.opacity = 0
      } else {
        clearInterval(fadeEffect)
        preloading.style.display = 'none'
      }
    }, 500)
  }

  render() {
    const { children } = this.props
    const { inited } = this.state

    return inited ? children : null
  }
}

export default Init
