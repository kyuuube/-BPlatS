import { observable, computed, observe, action, transaction, toJS } from "mobx";
import history from "routes/history";
import * as UserService from "services/UserService";
import { persist } from "mobx-persist";
import { message } from "antd";
import rightStore from "./rightStore";
// const message = {};

const initialData = {
    id: "",
    username: "peng",
    email: "",
    phone: "",
    avatar: "",
    alias: "",
    realName: "",
    signature: "",
    status: true,
    lastActivedAt: "",
    roles: [] as {
        id: string;
        name: string;
        remark: string;
        type: "superAdmin" | "admin" | "user";
    }[]
};

class UserStore {
    constructor() {}
    @persist @observable token = "";
    /** 是否已登录 */
    @persist @observable logined = false;
    /**用户资料 */
    @persist("object") @observable data = initialData;

    /** 初始化 */
    @action
    init = async () => {
        if (this.logined) {
            try {
                await this.loginSuccess(this.token);
            } catch (error) {
                this.logoutSuccess();
                return;
            }
        }
    };

    /** 获取用户资料 */
    @action
    getUserData = async () => {
        const data: any = await UserService.getUserDetailData();
        this.data = data;
    };

    /** 账号密码登录 */
    @action
    login = async (username: string, password: string, imageCodeId: string, imageCode: string) => {
        try {
            // const { token } = await UserService.login(username, password, imageCodeId, imageCode);
            // await this.loginSuccess(token);
            // message.destroy();
            history.replace("/");
            message.success("登录成功");
        } catch (error) {
            message.destroy();
            message.error(error.message);
        }
    };

    /** 手机验证码登录 */
    @action
    loginByPhoneCode = async (phone: string, phoneCode: string) => {
        try {
            const { token } = await UserService.loginByPhoneCode(phone, phoneCode);
            await this.loginSuccess(token);
            message.destroy();
            history.replace("/");
            message.success("登录成功");
        } catch (error) {
            message.destroy();
            message.error(error.message);
        }
    };

    /** 登录成功 */
    @action
    logout = async () => {
        try {
            await UserService.logout();
            this.logoutSuccess();
        } catch (error) {
            this.logoutSuccess();
        }
        message.success("退出成功");
    };

    /** 登录成功 */
    @action
    loginSuccess = async (token: string) => {
        this.logined = true;
        this.token = token;
        await this.getUserData();
        await rightStore.init();
    };

    /** 注销成功 */
    @action
    logoutSuccess = () => {
        this.logined = false;
        this.token = "";
        this.data = initialData;
        history.replace("/login");
    };

    /** 注册账号 */
    @action
    regis = async (username: string, password: string) => {
        try {
            await UserService.regis(username, password);
            message.success("注册成功");
            history.replace("/login");
        } catch (error) {
            message.destroy();
            message.error(error.message);
        }
    };
}

const userStore = new UserStore();

export default userStore;
