import React from "react";
import { Icon } from "antd";
import AsynLoadable from "../../components/AsynLoadable";
import { Route, Switch, Redirect } from "react-router-dom";

const Home = AsynLoadable(() => import(/* webpackChunkName: "Menu" */ "./Home"));

const User = AsynLoadable(() => import(/* webpackChunkName: "User" */ "./User"));

const MenuPage = AsynLoadable(() => import(/* webpackChunkName: "Menu" */ "./System/Menu"));
const Role = AsynLoadable(() => import(/* webpackChunkName: "Role" */ "./System/Role"));
const RoleDetail = AsynLoadable(() => import(/* webpackChunkName: "Role" */ "./System/Role/Detail"));
const Interface = AsynLoadable(() => import(/* webpackChunkName: "Interface" */ "./System/Interface"));
const Right = AsynLoadable(() => import(/* webpackChunkName: "Right" */ "./System/Right"));
const Config = AsynLoadable(() => import(/* webpackChunkName: "Config" */ "./System/Config"));

const RichEditor = AsynLoadable(() => import(/* webpackChunkName: "RichEditor" */ "./Form/RichEditor"));
const Upload = AsynLoadable(() => import(/* webpackChunkName: "Upload" */ "./Form/Upload"));
const Lazyload = AsynLoadable(() => import(/* webpackChunkName: "Lazyload" */ "./Comps/Lazyload"));
const AsyncLoad = AsynLoadable(() => import(/* webpackChunkName: "AsyncLoad" */ "./Comps/AsyncLoad"));
const Chart = AsynLoadable(() => import(/* webpackChunkName: "Chart" */ "./Comps/Chart"));
const ProgressBar = AsynLoadable(() => import(/* webpackChunkName: "ProgressBar" */ "./Comps/ProgressBar"));
const Animate = AsynLoadable(() => import(/* webpackChunkName: "Animate" */ "./Comps/Animate"));
const PreviewImg = AsynLoadable(() => import(/* webpackChunkName: "PreviewImg" */ "./Comps/PreviewImg"));

const AccountSettings = AsynLoadable(() => import(/* webpackChunkName: "AccountSettings" */ "./Account/Settings"));

export const MenuRoute = () => {
  return (
    <Switch>
      <Route path={`/`} exact component={Home} />
      <Route path={`/user`} exact component={User} />
      <Route path={`/system/menu`} exact component={MenuPage} />
      <Route path={`/system/role`} exact component={Role} />
      <Route path={`/system/role/detail`} exact component={RoleDetail} />
      <Route path={`/system/interface`} exact component={Interface} />
      <Route path={`/system/right`} exact component={Right} />
      <Route path={`/system/Config`} exact component={Config} />

      <Route path={`/form/RichEditor`} exact component={RichEditor} />
      <Route path={`/form/Upload`} exact component={Upload} />

      <Route path={`/comps/Lazyload`} exact component={Lazyload} />
      <Route path={`/comps/AsyncLoad`} exact component={AsyncLoad} />
      <Route path={`/comps/Chart`} exact component={Chart} />
      <Route path={`/comps/ProgressBar`} exact component={ProgressBar} />
      <Route path={`/comps/Animate`} exact component={Animate} />
      <Route path={`/comps/PreviewImg`} exact component={PreviewImg} />

      <Route path={`/account/settings`} exact component={AccountSettings} />

      <Redirect path="*" to="/" />
    </Switch>
  );
};

export interface MenuItem {
  /** 如果没有id就是没有在后端配置 */
  id?: string;
  code: string;
  url: string;
  name: string;
  icon?: JSX.Element;
  children?: MenuItem[];
}

const defaultMenus: MenuItem[] = [
  {
    code: "home",
    url: "/",
    name: "首页",
    icon: <Icon type="user" />
  },
  {
    code: "user",
    url: "/user",
    name: "用户管理",
    icon: <Icon type="team" />
  },
  {
    code: "system",
    url: "/system",
    name: "系统管理",
    icon: <Icon type="setting" />,
    children: [
      {
        code: "menu",
        url: "/system/menu",
        name: "菜单管理",
        icon: <Icon type="menu" />
      },
      {
        code: "role",
        url: "/system/role",
        name: "角色管理",
        icon: <Icon type="contacts" />
      },
      {
        code: "right",
        url: "/system/right",
        name: "权限管理",
        icon: <Icon type="control" />
      },
      {
        code: "interface",
        url: "/system/interface",
        name: "接口管理",
        icon: <Icon type="gold" />
      },
      {
        code: "config",
        url: "/system/config",
        name: "配置管理",
        icon: <Icon type="sliders" />
      }
    ]
  },
  {
    code: "form",
    url: "/form",
    name: "表单",
    icon: <Icon type="form" />,
    children: [
      {
        code: "richEditor",
        url: "/form/richEditor",
        name: "富文本编辑器"
      },
      {
        code: "formUpload",
        url: "/form/upload",
        name: "上传"
      }
    ]
  },
  {
    code: "comps",
    url: "",
    name: "组件",
    icon: <Icon type="tag" />,
    children: [
      {
        code: "Lazyload",
        url: "/comps/Lazyload",
        name: "懒加载组件"
      },
      {
        code: "AsyncLoad",
        url: "/comps/AsyncLoad",
        name: "异步组件"
      },
      {
        code: "echart",
        url: "/comps/Chart",
        name: "echart图表"
      },
      {
        code: "progressBar",
        url: "/comps/progressBar",
        name: "顶部进度条"
      },
      {
        code: "Animate",
        url: "/comps/Animate",
        name: "动画"
      },
      {
        code: "PreviewImg",
        url: "/comps/PreviewImg",
        name: "图片全屏预览"
      }
    ]
  },
  {
    code: "account",
    url: "/account",
    name: "个人页",
    icon: <Icon type="user" />,
    children: [
      {
        code: "accountSettings",
        url: "/account/settings",
        name: "个人设置",
        icon: <Icon type="setting" />
      }
    ]
  }
];

export function findAllInTree(tree: MenuItem[], pathname: string): MenuItem[] {
  let items: MenuItem[] = [];
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].url === pathname) {
      items.push(tree[i]);
      break;
    }
    const children = tree[i].children;
    if (children && children.length) {
      const subItems = findAllInTree(children, pathname);
      if (subItems.length) {
        subItems.push(tree[i]);
        items = items.concat(subItems);
        break;
      }
    }
  }
  return items;
}

export function getSelectedMenus(tree: MenuItem[], pathname: string) {
  const menuItems = findAllInTree(tree, pathname);
  let menuOpenKeys: string[] = [];
  const pathnames: string[] = pathname.split("/").map(function(v, i, l) {
    return (i >= 1 ? (l[i - 1] ? "/" + l[i - 1] : "") : "") + ("/" + v);
  });
  pathnames.forEach(v => {
    const pItems = findAllInTree(tree, v);
    menuOpenKeys = menuOpenKeys.concat(pItems.map(p => p.code));
  });
  return {
    menuSelectedKeys: menuItems.filter(v => !v.children || (v.children && !v.children.length)).map(v => v.code),
    menuOpenKeys
  };
}

export default defaultMenus;
