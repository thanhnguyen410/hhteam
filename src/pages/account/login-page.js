import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Request from '@/utils/request'
import Storage from '@/utils/storage'
import { Images, Colors } from '@/theme'
import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Field from '@/components/field'

import VALIDATE_MESSAGES from '@/constants/validation-messages'
import Media from '@/utils/media'
import ERROR_MESSAGES from '@/constants/error-messages'
import Configs from '@/configs'

const Styled = styled.div`

  .wrap-login {
    width: 100%;
    max-width: 418px;
    margin: 0 auto;
    margin-top: 120px;
    border-radius: 12px;
    border: 1px solid ${Colors.PRIMARY};
    padding: 15px;

    .logo {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }

    .form {
      .action-box {
        display: flex;
        justify-content: center;
        margin-top: 15px;
      }
    }
  }
  ${Media.lessThan(Media.SIZE.LG)} {}
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
    authStore: PropTypes.object
  }

  state = {
    loading: false,
    messageErrorAPI: ''
  }

  componentDidMount() {}

  // eslint-disable-next-line consistent-return
  _onSubmit = async (values) => {
    const { authStore, history } = this.props

    this.setState({
      loading: true
    })

    if (values) {
      history.push('/')
    }

    const { success, data: { accessToken, message } } = await authStore.shopLogin(values)
    if (success) {
      Storage.set('ACCESS_TOKEN', accessToken)
      Request.setAccessToken(accessToken)
      window.location.href = '/'
    } else if (message) {
      this.setState({
        messageErrorAPI: message || 'ERROR_SERVER',
        loading: false
      })
    }

    this.setState({ loading: false })
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
            label="Email"
            component={Input}
            placeholder="Email"
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
            placeholder="**********"
            label="Mật khẩu"
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
            Đăng nhập
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

    return (
      <Page background={Colors.COLORED_BLACKGROUND}>
        <Styled>
          <div className="wrap-login">
            <div className="logo">
              <img src={Images.LOGO_SMALL_2} alt="logo-shop" />
            </div>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this._onSubmit}
              component={this._renderForm}
            />
            {/* <div className="go-back-meet">
              <Clickable>
                Điều khoản dịch
              </Clickable>
            </div> */}
          </div>
        </Styled>
      </Page>
    )
  }
}

export default LoginPage
