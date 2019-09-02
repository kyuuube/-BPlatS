/**
 * 配置管理相关api
 */
import { interceptorAjax, PageParam } from "services/commonFn";

/** 获取全部配置列表-list */
export async function getRows(): Promise<{ list: any[] }> {
  // return {"list":[{"id":"1cb098d7403b45048c48541a9707cbed","configName":"baseConfig","code":"pageKeywords","value":"egg","defaultValue":"网站关键字","description":"网站关键字","status":1,"createdAt":"2019-08-24T07:20:21.000Z","updatedAt":"2019-08-24T07:20:21.000Z"},{"id":"35d27a9fb9e84782811f34a3a4cecb18","configName":"baseConfig","code":"domainName","value":"http://127.0.0.1:7001","defaultValue":"http://127.0.0.1:7001","description":"后台系统域名","status":1,"createdAt":"2019-08-24T07:20:21.000Z","updatedAt":"2019-08-24T07:20:21.000Z"},{"id":"92f8ed6b5b7343b1815bdabcd815a9ec","configName":"baseConfig","code":"isClosed","value":"0","defaultValue":"0","description":"关闭网站","status":1,"createdAt":"2019-08-24T07:20:21.000Z","updatedAt":"2019-08-24T07:20:21.000Z"},{"id":"cc81aefdbfb74e348e6d413d0ce38f6c","configName":"baseConfig","code":"pageTitle","value":"egg-start初始化","defaultValue":"网站标题","description":"网站标题","status":1,"createdAt":"2019-08-24T07:20:21.000Z","updatedAt":"2019-08-24T07:20:21.000Z"}]}
  return await interceptorAjax<any>("get", "/api/system/config/getConfigs");
}

/** 获取配置byCode */
export async function getConfigByCode(code: string) {
  // return {"id":"35d27a9fb9e84782811f34a3a4cecb18","configName":"baseConfig","code":"domainName","value":"http://127.0.0.1:7001","defaultValue":"http://127.0.0.1:7001","description":"后台系统域名","status":1,"createdAt":"2019-08-24T07:20:21.000Z","updatedAt":"2019-08-24T07:20:21.000Z"}
  return await interceptorAjax<any>("get", "/api/system/config/getConfigByCode", { code });
}

/** 更新某配置value */
export async function updateConfigValue(code: string, value: string) {
  return await interceptorAjax<any>("post", "/api/system/config/updateConfigValue", { code, value });
}

/** 更新某配置value */
export async function resetConfigDefaultValue(code: string) {
  return await interceptorAjax<any>("post", "/api/system/config/resetConfigDefaultValue", { code });
}
