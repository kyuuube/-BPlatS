/**
 * 用户管理相关api
 */
import { interceptorAjax, PageParam } from "services/commonFn";

/** 获取用户列表 */
export async function getRows(params: PageParam) {
  // return { list:[{ id: '1', username: "李杀神", phone: "15555555555" }, { id: '2', username: "赵日天", phone: "15555555555" }], totalCount:10}
  return await interceptorAjax<any>("get", "/api/users", params);
}

/** 获取用户详情 */
export async function getRowDetail(userId: string) {
  // return { id: '1', username: "李杀神", phone: "15555555555" }
  return await interceptorAjax<any>("get", "/api/user/getInfo", { userId });
}

/** 修改用户详情 */
export async function updateRow(data: any) {
  return await interceptorAjax<any>("put", "/api/user/update", data);
}

/** 新增用户 */
export async function addRow(username: string, password: string) {
  return await interceptorAjax<any>("post", "/api/user/createUser", { username, password });
}

/** 删除用户 */
export async function deleteRow(id: string) {
  return await interceptorAjax<any>("delete", `/api/user/${id}`);
}

/** 切换用户状态 */
export async function updateUserStatus(userId: string, status: boolean) {
  return await interceptorAjax<any>("post", "/api/user/updateUserStatus", { userId, status });
}

/** 修改用户角色 */
export async function updateUserRole(userId: string, roleIds: string[]) {
  return await interceptorAjax<any>("post", "/api/user/updateUserRole", { userId, roleIds });
}

/** 重置用户密码 */
export async function resetUserPassword(userId: string, password: string) {
  return await interceptorAjax<any>("post", "/api/user/resetUserPassword", { userId, password });
}
