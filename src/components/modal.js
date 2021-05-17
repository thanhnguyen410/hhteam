import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal as AntModal } from 'antd'

import { Images } from '@/theme'
import Media from '@/utils/media'
import Button from './button'
import Clickable from './clickable'

const StyledModal = styled(AntModal)`
  .ant-modal-content {
    border-radius: 6px;
  
    .ant-modal-close {
      display: none;
    }
  
    .ant-modal-header {
      display: none;
    }
  
    .ant-modal-body {
      padding: 0;
    
      .modal-close-button {
        position: absolute;
        right: 8px;
        top: 8px;
        z-index: 1;
        
        img {
          width: 35px;
          height: 35px;
        }
      }
    
      .header {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        
        .close-button {
          img {
            width: 30px;
          }
        }
      }
      
      .body {
        padding: 33px 34px 25px;
      }
    }
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    width: 300px!important;
  }
`

class Modal extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
    footer: PropTypes.array
  }

  static Body = ({ children }) => (
    <div className="body">
      {children}
    </div>
  )

  static Footer = ({ buttons = [] }) => (
    <div className="footer">
      {buttons.map(({ text, hidden, ...button }, index) => (hidden ? null : (
        <Button {...button} key={index}>{text}</Button>
      )))}
    </div>
  )

  _onClose = () => {
    const { onCancel } = this.props

    if (onCancel) onCancel()
  }

  render() {
    const { children, ...props } = this.props

    return (
      <StyledModal
        {...props}
        centered
        footer={null}
      >
        <Clickable
          className="modal-close-button"
          onClick={this._onClose}
        >
          <img src={Images.GRAY_CLOSE_ICON} alt="" />
        </Clickable>
        {children}
      </StyledModal>
    )
  }
}

export default Modal
