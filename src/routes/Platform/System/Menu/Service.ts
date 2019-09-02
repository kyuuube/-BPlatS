/**
 * 菜单管理相关api
 */
import { interceptorAjax, PageParam } from "services/commonFn";

/** 获取菜单列表 */
export async function getRows(hasRight?: boolean) {
  // return {"list":[{"id":"1","name":"首页","fullName":null,"code":"home","parentId":"0","sequence":1,"url":"/","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-19T07:16:12.000Z"},{"id":"2","name":"用户管理","fullName":null,"code":"user","parentId":"0","sequence":2,"url":"/user","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-19T07:16:12.000Z"},{"id":"3","name":"系统管理","fullName":null,"code":"system","parentId":"0","sequence":3,"url":"/system","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-19T07:16:11.000Z","children":[{"id":"4","name":"菜单管理","fullName":null,"code":"menu","parentId":"3","sequence":1,"url":"/system/menu","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"5","name":"接口管理","fullName":null,"code":"interface","parentId":"3","sequence":2,"url":"/system/interface","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"6","name":"角色管理","fullName":null,"code":"role","parentId":"3","sequence":3,"url":"/system/role","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"7","name":"权限管理","fullName":null,"code":"right","parentId":"3","sequence":4,"url":"/system/right","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"}]}]}
  return await interceptorAjax<any>("get", "/api/system/menu", { hasRight });
}

/** 获取菜单详情 */
export async function getRowDetail(id: string) {
  // return {"id":"1","name":"首页","fullName":null,"code":"home","parentId":"0","sequence":1,"url":"/","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-19T07:16:12.000Z"}
  return await interceptorAjax<any>("get", `/api/system/menu/${id}`);
}

/** 修改菜单详情 */
export async function updateRow(data: any) {
  return await interceptorAjax<any>("put", `/api/system/menu/${data.id}`, data);
}

/** 新增菜单 */
export async function addRow(data: any) {
  return await interceptorAjax<any>("post", "/api/system/menu", data);
}

/** 删除菜单 */
export async function deleteRow(id: string) {
  return await interceptorAjax<any>("delete", `/api/system/menu/${id}`);
}

/** 修改菜单排序*/
export async function updateMenuSequence(id: string, sequence: number) {
  return await interceptorAjax<any>("post", "/api/system/menu/updateMenuSequence", { id, sequence });
}
