/**
 * 系统api
 */
import { interceptorAjax, Options } from "services/commonFn";

/** 获取 菜单树列表 */
export async function getMenuTree() {
  // return {"list":[{"id":"1","name":"首页","fullName":null,"code":"home","parentId":"0","sequence":1,"url":"/","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-19T07:16:12.000Z"},{"id":"2","name":"用户管理","fullName":null,"code":"user","parentId":"0","sequence":2,"url":"/user","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-19T07:16:12.000Z"},{"id":"3","name":"系统管理","fullName":null,"code":"system","parentId":"0","sequence":3,"url":"/system","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-19T07:16:11.000Z","children":[{"id":"4","name":"菜单管理","fullName":null,"code":"menu","parentId":"3","sequence":1,"url":"/system/menu","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"5","name":"接口管理","fullName":null,"code":"interface","parentId":"3","sequence":2,"url":"/system/interface","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"6","name":"角色管理","fullName":null,"code":"role","parentId":"3","sequence":3,"url":"/system/role","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"7","name":"权限管理","fullName":null,"code":"right","parentId":"3","sequence":4,"url":"/system/right","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"}]}]}
  return await interceptorAjax<any>("get", "/api/system/menu", { hasRight: false });
}

/** 获取 登录用户的全部权限列表 */
export async function getUserRights() {
  // return {"list":[{"id":"1001","name":"查看","code":"read","remark":"首页-查看","menuId":"1","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-20T14:40:23.000Z","menu":{"name":"首页"}}],"pageNo":1,"pageSize":10,"totalCount":23,"hasNextPage":true}
  return await interceptorAjax<any>("get", "/api/user/getUserRights");
}

export interface SystemConfig {
  [key: string]: any;
  baseConfig: {
    [key: string]: any;
    /** 网站开关 */
    isClosed: boolean;
    /** 网站标题 */
    pageTitle: string;
    /** 网站关键字 */
    pageKeywords: string;
    /** 系统后台网站Logo */
    systemPageLogo: string;
    /** 后台系统域名 */
    domainName: string;
  };
}
/** 获取 系统配置 */
export async function getSystemConfig(options?: Options): Promise<SystemConfig> {
  // return {"baseConfig":{"isClosed":false,"pageTitle":"egg-start初始化","pageKeywords":"egg","domainName":"http://127.0.0.1:7001","systemPageLogo":""}
  return await interceptorAjax<any>("get", "/api/system/config", options);
}

/**
 * @name 发送手机验证码
 * @param type 手机号码类型，1 绑定手机 2 修改密码 3 短信验证码登录 4 验证手机是否可用
 */
export async function sendPhoneCode(phone: string, type: 1 | 2 | 3 | 4) {
  return await interceptorAjax<any>("post", "/api/tools/sendPhoneCode", { phone, type });
}

/**
 * @name 发送邮箱验证码
 * @param type 邮箱验证码类型，1 绑定邮箱 2 验证邮箱是否可用 3 解绑邮箱
 */
export async function sendEmailCode(email: string, type: 1 | 2 | 3) {
  return await interceptorAjax<any>("post", "/api/tools/sendEmailCode", { email, type });
}

/**
 * @name 获取验证码图片
 */
export async function createImageCode(): Promise<{
  imageCodeId: string;
  imageUrl: string;
  /** 非prod环境才返回 */
  imageCode: string;
}> {
  return await interceptorAjax<any>("get", "/api/tools/createImageCode");
}
