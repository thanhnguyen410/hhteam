import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { Menu } from 'antd'
import Clickable from '@/components/clickable'
import { Colors, Images } from '@/theme'
import { NAVIGATIONS } from '@/constants/common'

const Box = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: ${Colors.PRIMARY};
  height: 100%;
  width: 125px;
  z-index: 999;
  transition: all 300ms ease-out;

  &.open {
    width: 245px;
    transition: all 200ms ease-out;
    z-index: 999999999;
    .ant-menu {
      .nav-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 10px;
        width: 168px;
        border-radius: 12px;
        transition: all 300ms ease-in;
        span {
          display: block !important;
          font-weight: bold;
        }
        img {
          margin-right: 5px;
        }
        &:hover {
          width: 168px !important;
          background-color: #ffffff29;
          justify-content: flex-start !important;
          /* opacity: 0.8; */
          /* img {
            filter: brightness(1) !important;
          } */
          span {
            color: #fff;
          }
        }
      }
      .is-active {
        .nav-item {
          width: 168px !important;
          background-color: ${Colors.WHITE1};
          justify-content: flex-start !important;
          img {
            filter: brightness(1) !important;
          }
          span {
            color: ${Colors.PRIMARY};
          }
        }
      }
    }
  }

  .ant-menu {
    margin-right: 0;
    width: 100%;
    .ant-menu-item {
      min-width: 100%;
      background: ${Colors.PRIMARY};
      padding: 10px 0 !important;
      margin: 0;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:after {
        content: none;
      }
      .nav-item {
        transition: all 300ms ease-out;
        img {
          filter: brightness(0) invert(1);
        }
        span {
          color: white;
          display: none;
        }
        &:hover {
          background: #ffffff29;
          width: 60px;
          height: 60px;
          text-align: center;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          /* transition: all 2000ms ease-in; */
          /* img { */
            /* width: 27px; */
            /* filter: brightness(1) !important; */
          /* } */
        }
      }

      .staff-icon {
        width: 26px;
        height: 26px;
      }
      .record-icon {
        margin-left: -2px;
      }
    }

    .is-active {
      .nav-item {
        background-color: ${Colors.WHITE1};
        width: 60px;
        height: 60px;
        text-align: center;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          filter: brightness(1) !important;
        }
        span {
          color: ${Colors.PRIMARY};
        }
      }
    }
  }

  .ant-menu-vertical {
    border-right: none !important;
  }

  .bar-control {
    padding: 10px 0 10px 30px;
    .control {
      width: 60px;
      height: 60px;
      padding-left: 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #ffffff29;
        text-align: center;
        border-radius: 12px;
        transition: all 300ms ease-out;
        img {
          filter: brightness(1) !important;
        }
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  .bar-control-open {
    .control {
      transition: all 300ms ease-in;
    }
  }

  .over-page {
    background: ${Colors.PRIMARY};
    opacity: 0.2;
    position: fixed;
    top: 0;
    left: 245px;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  /* .logo-bottom-sidebar {
    display: flex;
    justify-content: center;
    .img-1 {
      width: 70px;
    }
    .img-2 {
      width: 185px;
    }
  } */
`

@withRouter
class MenuBar extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      collapsed: true
    }

    this.wrapperRef = React.createRef()
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('mousedown', this._handleClickOutSideBarMenu)
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('mousedown', this._handleClickOutSideBarMenu)
  }

  _handleClickOutSideBarMenu = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        collapsed: true
      })
    }
  }

  toggleCollapsed = () => {
    this.setState((state) => ({
      collapsed: !state.collapsed
    }))
  }

  render() {
    const { collapsed } = this.state
    const { history } = this.props

    return (
      <Box className={classnames({ open: !collapsed })}>
        <div
          className={`bar-control ${!collapsed ? 'bar-control-open' : ''}`}
          onClick={this.toggleCollapsed}
          role="presentation"
        >
          <div
            className="control"
            ref={this.wrapperRef}
          >
            {collapsed ? <img src={Images.MENU_WHITE_ICON} alt="" /> : <img src={Images.CLOSE_WHITE_ICON} alt="" />}
          </div>
        </div>
        <span className={collapsed ? '' : 'over-page'} />
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
        >
          {NAVIGATIONS.map((item) => (
            <Menu.Item key={item.id} className={history.location.pathname === item.path ? 'is-active' : ''}>
              <Clickable className="nav-item" onClick={() => this.props.history.push(item.path)}>
                <img src={Images[item.icon]} alt="" className={item.class} />
                <span>{item.name}</span>
              </Clickable>
            </Menu.Item>
          ))}
        </Menu>
        {/* <Clickable className="logo-bottom-sidebar">
          <img src={Images.LOGO_SHOP_FULL} alt="" className="img-1" />
        </Clickable> */}
      </Box>
    )
  }
}

export default MenuBar
