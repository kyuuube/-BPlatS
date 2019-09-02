import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import userStore from "../../stores/userStore";
import rightStore from "../../stores/rightStore";
import { Layout, Menu, Breadcrumb, Icon, Drawer } from "antd";
import UserBox from "./components/UserBox";
import LanguageBox from "./components/LanguageBox";
import defaultMenus, { MenuItem, MenuRoute, getSelectedMenus } from "./menu";
import history from "../history";
import { RouteComponentProps } from "react-router";
import { hot } from "react-hot-loader";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface Props extends RouteComponentProps {}
interface State {
  collapsed: boolean;
  collapsible: boolean;
  drawerVisible: boolean;
  menuOpenKeys: string[];
  menuSelectedKeys: string[];
  menus: MenuItem[];
}

/**
 * @description 前端获取全部菜单列表，根据sequence来排序，然后根据rightStore来判断是否显示菜单子选项
 */
@hot(module)
export default class Platform extends Component<Props, State> {
  readonly state: State = {
    collapsed: false,
    collapsible: true,
    drawerVisible: false,
    menuOpenKeys: [],
    menuSelectedKeys: [],
    menus: []
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.setUserMenus();
    this.onWindowRezie();
    window.addEventListener("resize", this.onWindowRezie);
    this.onHistoryChange();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowRezie);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { menuSelectedKeys } = getSelectedMenus(prevState.menus, nextProps.location.pathname);
    return {
      menuSelectedKeys
    };
    return null;
  }

  /** 设置用户的菜单列表 */
  setUserMenus = () => {
    /**
     * @param menuTrees 后端传的树列表
     * @param defaultMenuTrees 默认的树列表
     * @param isReplaceAttr 是否替换为后端listItem的url和name
     * @param isAddRestMenus 是否加上后端没登记的默认listItem
     */
    function transTree(menuTrees: any[], defaultMenuTrees: any[], isReplaceAttr = true, isAddRestMenus = true) {
      const menus: any[] = [];
      const restMenus: any[] = defaultMenuTrees.reduce((list, next) => {
        if (!menuTrees.find(v => v.code === next.code)) {
          list.push(next);
        }
        return list;
      }, []);
      menuTrees.forEach(menuTree => {
        const defaultMenuTree = defaultMenuTrees.find(v => v.code === menuTree.code);
        if (defaultMenuTree) {
          defaultMenuTree.id = menuTree.id;
          if (isReplaceAttr) {
            defaultMenuTree.url = menuTree.url;
            defaultMenuTree.name = menuTree.name;
          }
          if (defaultMenuTree.children) {
            defaultMenuTree.children = transTree(menuTree.children || [], defaultMenuTree.children, isReplaceAttr, isAddRestMenus);
          }
          // 还要判断有无 right read
          menus.push(defaultMenuTree);
        } else {
          // ...后端存在，前端不在
        }
        // 前端在，后端不在
      });
      return isAddRestMenus ? menus.concat(restMenus) : menus;
    }
    const { menuTrees } = rightStore;
    const defaultMenuTrees = defaultMenus;
    this.setState(
      {
        menus: transTree(menuTrees, defaultMenuTrees)
      },
      () => {
        console.log("转换menu", this.state.menus);
        // 刷新页面后的展开对应菜单
        this.setState({
          menuOpenKeys: getSelectedMenus(this.state.menus, history.location.pathname).menuOpenKeys
        });
      }
    );
  };

  onWindowRezie = () => {
    if (window.innerWidth < 600) {
      this.setState({ collapsed: false, collapsible: false });
    } else if (window.innerWidth < 1000) {
      this.setState({ collapsed: true, collapsible: true });
    } else {
      this.setState({ collapsed: false, collapsible: true });
    }
  };

  onHistoryChange = () => {
    const { menuOpenKeys, menuSelectedKeys } = getSelectedMenus(this.state.menus, this.props.location.pathname);
    this.setState({ menuOpenKeys, menuSelectedKeys });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  onOpenChange = (menuOpenKeys: string[]) => {
    this.setState({ menuOpenKeys });
  };

  handleClick = (e: any) => {
    // console.log("click ", e);
  };

  render() {
    const { collapsed, collapsible } = this.state;

    const renderMenuItems = (menuItems: MenuItem[]) => {
      return menuItems.map(v => {
        // 判断有无权限: 后端有添加配置菜单 && 无权限
        if (v.id && !rightStore.hasRight(v.code, "read")) {
          return null;
        }
        // 判断显示是否有子页面
        if (v.children && v.children.length) {
          return (
            <SubMenu
              key={v.code}
              title={
                <span>
                  {v.icon}
                  <span>{v.name}</span>
                </span>
              }
              // onTitleClick={() => history.push(v.url)}
            >
              {renderMenuItems(v.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item
              key={v.code}
              onClick={() => {
                history.push(v.url);
                if (!this.state.collapsible) {
                  // 手机端布局，缩回菜单
                  this.toggle();
                }
              }}
            >
              {v.icon}
              <span>{v.name}</span>
            </Menu.Item>
          );
        }
      });
    };
    const menu = (
      <Menu
        className="platform-menu"
        mode="inline"
        theme="dark"
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        onClick={this.handleClick}
        onOpenChange={this.onOpenChange}
        openKeys={this.state.menuOpenKeys}
        selectedKeys={this.state.menuSelectedKeys}
      >
        {renderMenuItems(this.state.menus)}
      </Menu>
    );
    return (
      <Layout className="Platform">
        <Header className="header">
          <div className="logo" />
          {!collapsible && <Icon className="trigger" type={collapsed ? "menu-unfold" : "menu-fold"} onClick={this.toggle} />}
          <div className="header-right">
            <UserBox />
            <LanguageBox />
          </div>
        </Header>
        <Layout>
          {!collapsible ? (
            <Drawer className="menuDrawer" placement="left" closable={false} onClose={this.toggle} visible={collapsed}>
              <div className="logo" />
              {menu}
            </Drawer>
          ) : (
            <Sider collapsible={collapsible} collapsed={collapsed} onCollapse={this.onCollapse} style={{ zIndex: 2 }}>
              {menu}
            </Sider>
          )}
          <MenuRoute />
        </Layout>
      </Layout>
    );
  }
}
