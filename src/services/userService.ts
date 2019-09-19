import {request} from "../utils/request"

export type LoginResponse = {
    userId: string;
    token: string;
    userInfo: any;
};

export const login = (data) => request.post<LoginResponse>("/login", data)
