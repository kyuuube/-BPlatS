/**
 * 用户相关api
 */
import { interceptorAjax } from "services/commonFn";

export type LoginResponse = {
  userId: string;
  token: string;
  userInfo: any;
};

/** 账号密码登录 */
export async function login(username: string, password: string, imageCodeId: string, imageCode: string): Promise<LoginResponse> {
  // return {"userId":"1","token":"233","userInfo":{"id":"1","username":"admin","email":null,"phone":null,"avatar":null,"alias":"管理员","realName":null,"signature":null,"status":true,"lastActivedAt":null,"createdAt":"2019-08-12T18:17:17.000Z","updatedAt":"2019-08-12T18:17:17.000Z","roles":[{"id":"1","name":"总管理员","remark":"网站总管理员","createdAt":"2019-08-12T18:17:17.000Z","updatedAt":"2019-08-12T18:17:17.000Z"}]}}
  return await interceptorAjax<any>("post", "/api/user/loginByPassword", { username, password, imageCodeId, imageCode });
}

/** 手机验证码登录 */
export async function loginByPhoneCode(phone: string, phoneCode: string): Promise<LoginResponse> {
  // return {"userId":"1","token":"233","userInfo":{"id":"1","username":"admin","email":null,"phone":null,"avatar":null,"alias":"管理员","realName":null,"signature":null,"status":true,"lastActivedAt":null,"createdAt":"2019-08-12T18:17:17.000Z","updatedAt":"2019-08-12T18:17:17.000Z","roles":[{"id":"1","name":"总管理员","remark":"网站总管理员","createdAt":"2019-08-12T18:17:17.000Z","updatedAt":"2019-08-12T18:17:17.000Z"}]}}
  return await interceptorAjax<any>("post", "/api/user/loginByPhoneCode", { phone, phoneCode });
}

/** 账号注册 */
export async function regis(username: string, password: string): Promise<any> {
  return await interceptorAjax<any>("post", "/api/user/regis", { username, password });
}

/** 注销 */
export async function logout() {
  return await interceptorAjax<any>("post", "/api/user/logout");
}

/** 获取 用户基本资料 */
export async function getUserDetailData() {
  // return {"id":"1","username":"admin","email":null,"phone":null,"avatar":null,"alias":"管理员","realName":null,"signature":null,"status":true,"lastActivedAt":null,"createdAt":"2019-08-12T18:17:17.000Z","updatedAt":"2019-08-12T18:17:17.000Z","roles":[{"id":"1","name":"总管理员","remark":"网站总管理员","createdAt":"2019-08-12T18:17:17.000Z","updatedAt":"2019-08-12T18:17:17.000Z"}]}
  return await interceptorAjax<any>("get", "/api/user/getInfo");
}

/** 修改密码-旧密码验证 */
export async function changeUserPassword(oldPassword: string, newPassword: string) {
  return await interceptorAjax<any>("post", "/api/user/updatePasswordByOldPassord", { oldPassword, newPassword });
}

interface MyInfo {
  [key: string]: any;
  alias?: string;
  avatar?: string;
  realName?: string;
  signature?: string;
}
/** 修改自己个人资料 */
export async function updateMyInfo(data: MyInfo): Promise<any> {
  return await interceptorAjax<any>("put", "/api/user/updateMyInfo", data);
}

/** 查询当前用户是否有登录密码 */
export async function checkHasPassword(): Promise<{ hasPassword: boolean }> {
  return await interceptorAjax<any>("get", "/api/user/checkHasPassword");
}

/** 设置当前用户初始密码 */
export async function setUserInitailPassword(password: string) {
  return await interceptorAjax<any>("post", "/api/user/setUserInitailPassword", { password });
}

/** 绑定手机 */
export async function bindPhone(newPhone: string, newPhoneCode: string) {
  return await interceptorAjax<any>("post", "/api/user/bindPhone", { newPhone, newPhoneCode });
}

/** 修改手机号码-步骤1-验证旧手机，该步骤可忽略 */
export async function checkOldPhone(oldPhoneCode: string) {
  return await interceptorAjax<any>("post", "/api/user/checkOldPhone", { oldPhoneCode });
}

/** 修改手机号码-步骤2-验证新手机 */
export async function updatePhone(oldPhoneCode: string, newPhone: string, newPhoneCode: string) {
  return await interceptorAjax<any>("post", "/api/user/updatePhone", { oldPhoneCode, newPhone, newPhoneCode });
}

/** 解绑邮箱 */
export async function unBindEmail(emailCode: string) {
  return await interceptorAjax<any>("post", "/api/user/unBindEmail", { emailCode });
}

/** 绑定邮箱 */
export async function bindEmail(email: string, emailCode: string) {
  return await interceptorAjax<any>("post", "/api/user/bindEmail", { email, emailCode });
}
