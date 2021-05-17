import React, { Component } from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

import { Images, Colors } from '@/theme'
import Clickable from '@/components/clickable'
import Typography from '@/components/typography'
import Button from '@/components/button'
import Media from '@/utils/media'

const StyledModal = styled(Modal)`
  width: 500px!important;

  .ant-modal-content {
    border-radius: 6px;
    background-color: ${Colors.WHITE2};    
  
    .ant-modal-close {
      display: none;
    }
  
    .ant-modal-body {
      padding: 10px;
    
      .modal-content {
        .header {
          display: flex;
          justify-content: flex-end;

          .close-button {
            img {
              width: 37px;
            }
          }
        }
        
        .body {
          padding: 0 41px 34px;
          text-align: center;

          img {
            width: 202px;
            margin: 0 auto;
            margin-bottom: 22px;
          }

          .title-text {
            font-size: 24px;
            color: ${Colors.PRIMARY};
            text-align: center;
            margin-bottom: 22px;
          }
          
          .content-text {
            line-height: 2.19;
            word-break: break-all;
            text-align: center;
            margin-bottom: 22px;
          }
          
          .action-box {
            display: flex;
            justify-content: center;
            align-items: center;

            button {
              min-width: 200px;
              font-weight: bold;
            }
            
            .action-button {
              padding: 0 15px;
              height: 52px;
              margin-right: 15px;
              
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    
    .text-center {
      text-align: center;
    }
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    width: 300px!important;
  
    .ant-modal-content {
      .ant-modal-body {
        .modal-content {
          .header {
            padding: 8px;
            padding-bottom: 0;
            
            .close-button {
              img {
                width: 30px;
              }
            }
          }
          
          .body {
            padding: 0 35px 40px;
            
            .content-text {
              line-height: 2.14;
              font-size: 14px;
            }
            
            .action-box {
              padding-top: 20px;
              
              .action-button {
                padding: 0 39px;
                height: 36px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
`

let instance

class Confirmable extends Component {
  static propTypes = {}

  state = {
    title: null,
    visible: false,
    content: null,
    acceptButtonText: null,
    hideCancelButton: false
  }

  static setInstance = (ref) => {
    instance = ref
  }

  static open = (...params) => {
    if (instance) {
      return instance.open(...params)
    }

    return null
  }

  open = ({ title, content, acceptButtonText, hideCancelButton }) => new Promise((resolve) => {
    this._resolve = resolve

    this.setState({
      title,
      visible: true,
      content,
      acceptButtonText,
      hideCancelButton
    })
  })

  _onClose = () => {
    this.setState({
      visible: false
    })
  }

  _onCancel = () => {
    this._resolve(false)

    this._onClose()
  }

  _onAccept = () => {
    this._onClose()

    setTimeout(() => {
      this._resolve(true)
    }, 300)
  }

  render() {
    const { title, visible, content, acceptButtonText, hideCancelButton } = this.state

    return (
      <StyledModal
        visible={visible}
        centered
        onCancel={this._onCancel}
        footer={null}
      >
        <div className="modal-content">
          <div className="header">
            <Clickable
              className="close-button"
              onClick={this._onCancel}
            >
              <img
                src={Images.GRAY_CLOSE_ICON}
                alt=""
              />
            </Clickable>
          </div>
          <div className="body">
            <img src={Images.LOGO_SHOP_FULL} alt="" />
            {title && (
            <Typography
              size="large"
              className="title-text"
            >
              {title}
            </Typography>
            )}
            {content && (
            <Typography
              size="large"
              className="content-text"
            >
              {content}
            </Typography>
            )}
            <div className="action-box">
              {!hideCancelButton && (
                <Button
                  color="#d0d0d0"
                  textColor="white"
                  onClick={this._onCancel}
                  className="action-button"
                >
                  キャンセル
                </Button>
              )}
              <Button
                size="large"
                onClick={this._onAccept}
                className="action-button"
              >
                {acceptButtonText || '閉じる'}
              </Button>
            </div>
          </div>
        </div>
      </StyledModal>
    )
  }
}

export default Confirmable
