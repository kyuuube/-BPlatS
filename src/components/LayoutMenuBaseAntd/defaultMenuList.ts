export interface MenuItem {
    id?: string | number,
    name: string,
    route: string,
    icon?: string,
    children?: MenuItem[]
}

const defaultMenuList:MenuItem[] = [
    {
        id: 1,
        name: "用户管理",
        route: "/user",
        icon: "user",
        children: [
            {
                id: 101,
                name: "用户列表",
                route: "/user/list"
            }
        ]
    },
    {
        id: 2,
        name: "系统管理",
        route: "/system",
        icon: "system"
    }
]

export default defaultMenuList
