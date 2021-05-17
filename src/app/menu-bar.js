import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Images, Colors } from '@/theme'

const { Sider } = Layout

const { SubMenu } = Menu

const LayoutStyle = styled(Layout)`
  background-color: #eee;
  .ant-layout-sider {
    border-right: 1px solid #eee;
    .ant-menu-item-selected {
      background-color: ${Colors.PRIMARY};
      color: white;
      &:after {
        border-right: 3px solid ${Colors.PRIMARY};
      }
    }
  }
  .logo {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    img {
      width: 150px;
    }
  }
`

@withRouter
class MenuBar extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <LayoutStyle style={{ minHeight: '100vh' }}>
        <Sider theme="light" trigger={null} collapsible collapsed={false}>
          <div className="logo">
            <img src={Images.LOGO_SMALL_2} alt="logo-shop" />
          </div>
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
          >
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.ItemGroup key="g1" title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </LayoutStyle>
    )
  }
}

export default MenuBar
