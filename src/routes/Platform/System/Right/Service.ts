/**
 * 权限管理相关api
 */
import { interceptorAjax, PageParam } from "services/commonFn";

/** 获取权限列表 */
export async function getRows(params: PageParam) {
  // return {"list":[{"id":"1001","name":"查看","code":"read","remark":"首页-查看","menuId":"1","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-20T14:40:23.000Z","menu":{"name":"首页"}}],"pageNo":1,"pageSize":10,"totalCount":23,"hasNextPage":true}
  return await interceptorAjax<any>("get", "/api/system/right", params);
}

/** 获取权限详情 */
export async function getRowDetail(id: string) {
  // return {"id":"1001","name":"查看","code":"read","remark":"首页-查看","menuId":"1","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-20T14:40:23.000Z","interfaces":[{"id":"1001001","name":"查看","remark":"首页-查看","controllerName":"home","method":"GET","url":"/","authType":1,"createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"}]}
  return await interceptorAjax<any>("get", `/api/system/right/${id}`);
}

/** 修改权限详情 */
export async function updateRow(data: any) {
  return await interceptorAjax<any>("put", `/api/system/right/${data.id}`, data);
}

/** 新增权限 */
export async function addRow(data: any) {
  return await interceptorAjax<any>("post", "/api/system/right", data);
}

/** 删除权限 */
export async function deleteRow(id: string) {
  return await interceptorAjax<any>("delete", `/api/system/right/${id}`);
}

/** 更新权限绑定的接口s */
export async function updateBindInterfaces(rightId: string, interfaceIds: string[]) {
  return await interceptorAjax<any>("post", `/api/system/right/updateBindInterfaces`, { rightId, interfaceIds });
}
