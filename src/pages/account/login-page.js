import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
// import lodash from 'lodash'
import { Typography } from 'antd'

import Request from '@/utils/request'
import Storage from '@/utils/storage'
import { Images, Colors } from '@/theme'
import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Field from '@/components/field'
import Clickable from '@/components/clickable'
import VALIDATE_MESSAGES from '@/constants/validation-messages'
import Media from '@/utils/media'
import ModalControl from '@/components/modal'
import ERROR_MESSAGES from '@/constants/error-messages'
import Configs from '@/configs'

const Styled = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
  .left {
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    overflow: auto;
    .wrap-login {
      padding-top: 191px;
      .logo {
        margin-bottom: 64px;
        text-align: center;
        img {
          width: 418px;
        }
      }
      .form {
        width: 418px;
        input {
          /* margin-bottom: 20px;  */
        }
        .field-group-password {
          margin-top: 8px;
        }
        .field-group {
          .__name {
            font-size: 12px;
            color: #828282;
            padding-left: 20px;
          }

          input {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
        button {
          width: 100%;
          margin-bottom: 10px;
        }

        .action-box {
          margin-top: 30px;
        }
      }

      .go-back-meet {
        margin-top: 30px;
        display: flex;
        justify-content: left;
        div {
          font-weight: normal;
          font-size: 16px;
          text-decoration-line: underline;
          text-transform: uppercase;
          color: #D06C96;
          text-align: left;
        }
      }
    }

    .list-options {
      padding-left: 0;
      width: 418px;
      li {
        list-style-type: none;
        text-transform: uppercase;
        margin-bottom: 20px;
        line-height: 20px;
        font-size: 16px;
        color: ${Colors.PRIMARY};
        text-decoration: underline;
      }
    }
    .wrap-policy-and-term {
      padding-left: 0;
      width: 418px;
    }
  }
  
  .right {
    background-image: url(${Images.BG_LOGIN});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    width: 50%;
    height: 100%;
  }

  .to-user {
    margin-top: 43px;
    color: ${Colors.PRIMARY};
    display: inline-block;
    font-weight: bold;
  }

  ${Media.lessThan(Media.SIZE.LG)} {
    .left {
      width: 100%;
    }
    
    .right {
      display: none;
    }
  }
`

const StyleModalControl = styled(ModalControl)`
  .ant-modal-content {
    padding: 26px 41px 39px;
    background: #fff;
    .ant-modal-body {
      .header-control {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        img.logo {
          width: 90px;
          margin-bottom: 6px;
        }
        .hl-text {
          font-size: 18px;
          font-weight: bold;
          color: ${Colors.RED1};
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          img {
            width: 15px;
          }
        }
        .message {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
    .body-control {
      .btn-control {
        display: flex;
        flex-flow: column nowrap;
        button {
          font-weight: 600;
          width: 100%;
          &:first-child {
            margin-bottom: 20px;
          } 
        }
      }

      .btn-control-register {
        .btn-control-cancel {
          background: ${Colors.GRAY5} !important;
          color: ${Colors.BALCK} !important;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
`

const validationSchema = object().shape({
  email: string().email(VALIDATE_MESSAGES.EMAIL_INVALID).required(VALIDATE_MESSAGES.EMAIL_REQUIRED),
  password: string().min(8, VALIDATE_MESSAGES.MIN_LENGTH_PASSWORD).required(VALIDATE_MESSAGES.PASSWORD_REQUIRED)
})

@inject((stores) => ({
  authStore: stores.auth,
  uiStore: stores.ui
}))
@observer
class LoginPage extends Component {
  static propTypes = {
    authStore: PropTypes.object,
    uiStore: PropTypes.object,
    location: PropTypes.object
  }

  state = {
    loading: false,
    isShop: false,
    visibleControl: false,
    messageErrorAPI: ''
  }

  componentDidMount() {
    const { location: { search = '' } } = this.props

    if (search.includes('isShop=1')) {
      this.setState({ isShop: true })
    }
  }

  // eslint-disable-next-line consistent-return
  _onSubmit = async (values) => {
    const { history, authStore, uiStore } = this.props

    this.setState({
      loading: true
    })

    const { success, data: { accessToken, message } } = await authStore.shopLogin(values)
    if (success) {
      Storage.set('ACCESS_TOKEN', accessToken)
      Request.setAccessToken(accessToken)

      const { data } = await authStore.getInitialData()

      const { shopId, approve, isShop } = data

      if (data?.success && shopId) {
        Storage.set('MY_SHOP_CURRENT', shopId)
      }

      if (!shopId) {
        uiStore.toggleSideBar(false)
        this.setState({
          visibleControl: true,
          loading: false
        })
        history.push('/')
      }

      if (isShop && !approve) {
        history.push('/waiting-approve')
      }

      uiStore.toggleSideBar(true)
      history.push('/')
    } else if (message) {
      this.setState({
        messageErrorAPI: message || 'ERROR_SERVER',
        loading: false
      })
    }

    this.setState({ loading: false })
  }

  _onRedirect = (routeName) => {
    const { history } = this.props
    if (routeName.includes('https://')) {
      window.location.href = routeName
    } else {
      history.push(routeName)
    }
  }

  _onToggleModalControl = () => {
    const { visibleControl } = this.state
    this.setState({
      visibleControl: !visibleControl
    })
  }

  _renderForm = ({ handleSubmit, isValid }) => {
    const { loading, isShop, messageErrorAPI } = this.state

    let ERRORS_SERVER = ''

    if (messageErrorAPI && isValid) {
      ERRORS_SERVER = ERROR_MESSAGES[messageErrorAPI]
    }

    return (
      <Form className="form">
        <div className="field-group">
          <Field
            showError
            className="user-id-field"
            name="email"
            type="email"
            label="メールアドレス"
            component={Input}
            placeholder="メールアドレス"
          />
        </div>
        {ERRORS_SERVER
        && (
          <div className="error-box error-box-email">
            <Field.Error message={ERRORS_SERVER} />
          </div>
        )}
        <div className="field-group field-group-password">
          <Field
            showError
            name="password"
            placeholder="パスワード"
            label="パスワード"
            type="password"
            component={Input}
          />
        </div>
        <div className="action-box">
          <Button
            size="large"
            type="submit"
            loading={loading}
            onClick={handleSubmit}
            className="submit-button"
          >
            ログイン
          </Button>
        </div>
        {isShop && <a href={`${Configs}/register/shop`} className="to-user">新しいアカウントに登録する</a>}
      </Form>
    )
  }

  render() {
    const initialValues = {
      email: '',
      password: ''
    }

    const { visibleControl } = this.state

    return (
      <Page background={Colors.COLORED_BLACKGROUND}>
        <Styled>
          <div className="left">
            <div className="wrap-login">
              <div className="logo">
                <img src={Images.LOGO_SHOP_FULL} alt="logo-shop" />
              </div>
              <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this._onSubmit}
                component={this._renderForm}
              />
              <StyleModalControl
                visible={visibleControl}
                onCancel={() => this._onToggleModalControl()}
              >
                <div className="header-control">
                  <img src={Images.LOGO_SHOP_BREAK} alt="" className="logo" />
                  <Typography className="hl-text"><img src={Images.RED_WARNING_ICON} alt="" />エラー</Typography>
                  <Typography className="message">このIDは予約にのみ使用されます。</Typography>
                </div>
                <div className="body-control">
                  <div className="btn-control btn-control-register">
                    <Button
                      color={Colors.GRAY2}
                      textColor={Colors.GRAY1}
                      className="btn-control-cancel"
                      bold
                      // eslint-disable-next-line no-return-assign
                      onClick={() => window.location.href = 'https://d90ukkw1lg27o.cloudfront.net'}
                    >ホームページへ
                    </Button>
                    <Button
                      bold
                      onClick={() => this.props.history.push('/pre-register')}
                    >新しいショップにサインアップ
                    </Button>
                  </div>
                </div>
              </StyleModalControl>
              <div className="go-back-meet">
                <Clickable
                  onClick={() => this._onRedirect(Configs.USER_PAGE_URL)}
                >
                  ミートのホームページに戻る
                </Clickable>
              </div>
            </div>
          </div>
          <div className="right" />
        </Styled>
      </Page>
    )
  }
}

export default LoginPage
