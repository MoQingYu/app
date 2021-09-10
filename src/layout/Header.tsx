import React from "react";
import { 
  Layout, 
  Avatar, 
  Dropdown,
  Menu,
  Breadcrumb 
} from "antd";
import { useHistory } from "react-router-dom"
import { connect } from "react-redux";
import { UserModel } from "@models/user";
import { PoweroffOutlined } from "@ant-design/icons";
import "./layout.less";

const { Header } = Layout;

type HeaderPropsModel = {
  user?: UserModel
}

const BasicHeader: React.FC<HeaderPropsModel> = (props) => {
  const history = useHistory();
  const { user } = props;
  
  const _handleClick = ({key}) => {
    switch (key) {
      case "logout":
        history.push("/login")
        break;
    }
  }

  const menu = (
    <Menu onClick={_handleClick}>
      <Menu.Item 
        key="logout"
        icon={<PoweroffOutlined />}
      >
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="layout-header">
      <div className='header-left'>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application Center</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="header-right">
        <Dropdown 
          overlay={menu} 
        >
          <div className="header-avatar">
            <Avatar src="https://fyh2016cjcj.oss-cn-hangzhou.aliyuncs.com/mall/1630909539878.jpeg" />
            <span className="header-name">{user?.nickname}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.info
})

export default connect(mapStateToProps)(BasicHeader);