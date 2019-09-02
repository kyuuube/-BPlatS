/**
 * 接口管理相关api
 */
import { interceptorAjax, PageParam } from "services/commonFn";

/** 获取接口列表 */
export async function getRows(params: PageParam) {
  // return {"list":[{"id":"1","name":"超级管理员","remark":"网站总管理员，满接口","type":"superAdmin","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"2","name":"管理员","remark":"普通管理员","type":"admin","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"},{"id":"3","name":"用户","remark":"普通用户","type":"user","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"}],"pageNo":1,"pageSize":10,"totalCount":3,"hasNextPage":false}
  return await interceptorAjax<any>("get", "/api/system/interface", params);
}

/** 获取接口详情 */
export async function getRowDetail(id: string) {
  // return {"id":"1","name":"超级管理员","remark":"网站总管理员，满接口","type":"superAdmin","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z","interfaces":[{"id":"1503","name":"新增","code":"add","remark":"接口管理-新增","menuId":"6","createdAt":"2019-08-18T19:16:18.000Z","updatedAt":"2019-08-18T19:16:18.000Z"}]}
  return await interceptorAjax<any>("get", `/api/system/interface/${id}`);
}

/** 修改接口详情 */
export async function updateRow(data: any) {
  return await interceptorAjax<any>("put", `/api/system/interface/${data.id}`, data);
}

/** 新增接口 */
export async function addRow(data: any) {
  return await interceptorAjax<any>("post", "/api/system/interface", data);
}

/** 删除接口 */
export async function deleteRow(id: string) {
  return await interceptorAjax<any>("delete", `/api/system/interface/${id}`);
}
