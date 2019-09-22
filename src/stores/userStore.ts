import { observable, computed, observe, action, transaction, toJS } from "mobx";
import history from "routes/history";
import * as UserService from "services/userService";
import {create, persist} from "mobx-persist";
import { message } from "antd";

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

    /** 账号密码登录 */
    @action
    login = async (username: string, password: string) => {
        try {
            const { data } = await UserService.login({username, password});
            await this.loginSuccess(data.token);
            message.destroy();
            history.push("/");
            message.success("登录成功");
        } catch (error) {
            message.destroy();
            message.error(error.message);
        }
    };

    /** 登录成功 */
    @action
    loginSuccess = async (token: string) => {
        this.logined = true;
        this.token = token;
        // await this.getUserData();
        // await rightStore.init();
    };

    /** 注销成功 */
    @action
    logoutSuccess = () => {
        this.logined = false;
        this.token = "";
        this.data = initialData;
        history.replace("/login");
    };
}


const userStore = new UserStore();
export default userStore;

