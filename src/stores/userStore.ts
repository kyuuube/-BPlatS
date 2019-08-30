import { observable, computed, observe, action, transaction, toJS } from "mobx";
// import history from "routes/history";
// import * as UserService from "services/UserService";
import { persist } from "mobx-persist";
import { message } from "antd";
// import rightStore from "./rightStore";
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
                console.log('kira~!')
                // await this.loginSuccess(this.token);
            } catch (error) {
                console.log('kira~')
                // this.logoutSuccess();
                return;
            }
        }
    };

}

const userStore = new UserStore();

export default userStore;
