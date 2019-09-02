import { observable, computed, action, reaction, toJS } from "mobx";
import { persist } from "mobx-persist";
import * as SystemService from "services/SystemService";
import { message } from "antd";

/** 系统配置 */
class ConfigStore {
  constructor() {}
  /** 系统平台环境 pc || mobile ||　web */
  osPlatform = document.body.clientWidth < 1200 ? "mobile" : "web";
  /** node 开发环境 */
  env = process.env.NODE_ENV;
  /** 是否为开发环境 */
  isDev = process.env.NODE_ENV === "development";
  /** 系统api接口地址 */
  @observable rootApiUrl = process.env.ROOT_API_URL; // "http://localhost:7001",
  /** 页面标题 */
  @observable pageTitle = "后台系统";
  /** 页面关键字 */
  @observable pageKeywords = "网站关键字";
  /** 后台系统Logo */
  @observable systemPageLogo = "";

  /** 初始化 */
  @action
  init = async () => {
    try {
      const resp = await SystemService.getSystemConfig({ noShowErrorMessage: true });
      console.log("获取系统配置", resp);
      this.changePageTitle(resp.baseConfig.pageTitle);
      this.pageKeywords = resp.baseConfig.pageKeywords;
      this.systemPageLogo = resp.baseConfig.systemPageLogo || this.systemPageLogo;
    } catch (error) {
      message.error("获取系统配置失败");
    }
  };

  @action
  changePageTitle(pageTitle: string) {
    this.pageTitle = pageTitle;
    document.title = this.pageTitle;
  }
}

const configStore = new ConfigStore();
// configStore.init();

export default configStore;
