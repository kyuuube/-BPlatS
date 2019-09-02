import React, { Component } from "react";
import { observable, computed, observe, action, transaction, toJS } from "mobx";
import { message } from "antd";
import * as SystemService from "services/SystemService";

/** 权限类型 */
export interface Right {
  id: string;
  name: string;
  code: string;
  remark: string;
  menuId: string;
  menu: {
    name: string;
  };
}

/** 菜单item类型 */
export interface MenuItem {
  id: string;
  name: string;
  fullName: string;
  code: string;
  parentId: string;
  sequence: number;
  url: string;
  children?: MenuItem[];
  rights: Right[];
}

/**
 * @name 权限store
 * @description 页面一般只需要用hasRight('user','read')判断权限
 * */
class RightStore {
  /** 权限列表 */
  @observable
  rights: Right[] = [];

  /** 菜单树列表 */
  @observable
  menuTrees: MenuItem[] = [];

  /** 菜单列表 */
  @observable
  menus: MenuItem[] = [];

  @action
  async init() {
    const [{ list: menuTrees }, { list: rights }] = await Promise.all([SystemService.getMenuTree(), SystemService.getUserRights()]);
    this.menuTrees = menuTrees;
    this.rights = rights;
    const menus: MenuItem[] = [];
    function translateTreeData(list: any[], level: number) {
      list.map((v, i) => {
        if (v.children && v.children.length) {
          v.children = translateTreeData(v.children, level + 1);
        } else {
          delete v.children;
        }
        menus.push(v);
        return v;
      });
      return list;
    }
    this.menuTrees = translateTreeData(menuTrees, 0);
    this.menus = menus.map(value => {
      value.rights = this.rights.filter(v => v.menuId === value.id);
      return value;
    });
    console.log("初始化权限和菜单", toJS(this));
  }

  /** 是否拥有某个权限,by pageCode, rightCode  */
  hasRight = (pageCode: string, rightCode: string) => {
    //如 "案件侦查","edit"
    const rights = this.getRightsByPageCode(pageCode);
    return !!rights.find(r => r.code === rightCode);
  };

  /** 获取某个页面的全部权限 by pageName */
  getRightsByPageName = (pageName: string) => {
    let rights: Right[] = [];
    for (const menu of this.menus) {
      if (menu.name === pageName) {
        rights = menu.rights;
        break;
      }
    }
    return rights;
  };

  /** 获取某个页面的全部权限 by pageId */
  getRightsByPageId = (pageId: string) => {
    let rights: Right[] = [];
    for (const menu of this.menus) {
      if (menu.id === pageId) {
        rights = menu.rights;
        break;
      }
    }
    return rights;
  };

  /** 获取某个页面的全部权限 by pageCode */
  getRightsByPageCode = (pageCode: string) => {
    let rights: Right[] = [];
    for (const menu of this.menus) {
      if (menu.code === pageCode) {
        rights = menu.rights;
        break;
      }
    }
    return rights;
  };
}

const rightStore = new RightStore();
export default rightStore;
