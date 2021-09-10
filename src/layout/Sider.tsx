import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { MenuModel } from "@models/user"
import { connect } from "react-redux";
import "./layout.less";
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

type BasicSiderModal = {
  routes: MenuModel[];
}
const BasicSider: React.FC<BasicSiderModal> = (props) => {
  const { routes } = props;
  const [collapsed, setCollapsed] = useState(true);

  const _handleCollpse = () => {
    setCollapsed(!collapsed)
  }

  const _renderMenu = (list: MenuModel[]) => {
    if(list?.length) {
      let i = 0;
      const menuList = [];
      while(list[i]) {
        const item = list[i];
        if(item.hideInMenu) {
          i++;
          continue;
        } else {
          const children = _renderMenu(item.routes);
          const MenuNode = children ? SubMenu : Item;
          menuList.push(
            <MenuNode key={item.path} title={children ? item.menuName : null}>
              {children ? children : <Link to={item.path}>{item.menuName}</Link>}
            </MenuNode>
          )
          i++;
        }
      }
      return menuList.length ? menuList : null;
    }
    return null
  }

  const _nav = useMemo(()=>{
    return _renderMenu(routes);
  }, [routes])

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={_handleCollpse}
      collapsedWidth={48} 
    >
      <div className="logo-wrap">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <h1>Ant Design</h1>
      </div>
      <Menu theme="dark" mode="inline">
        {_nav}
      </Menu>
    </Sider>
  )
}

const mapStateToProps = (state) => ({
  routes: state.user.routes
})
export default connect(mapStateToProps)(BasicSider);