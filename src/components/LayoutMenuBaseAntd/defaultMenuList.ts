export interface MenuItem {
    id?: string | number,
    name: string,
    route: string,
    icon?: string,
    children?: MenuItem[]
}

const defaultMenuList:MenuItem[] = [
    {
        id: 0,
        name: "工作台",
        route: "/",
        icon: "dashboard"
    },
    {
        id: 1,
        name: "用户管理",
        route: "/user",
        icon: "user",
        children: [
            {
                id: 101,
                name: "用户列表",
                route: "/user/list",
                icon: "team"
            }
        ]
    },
    {
        id: 2,
        name: "系统管理",
        route: "/system",
        icon: "setting",
        children: [
            {
                id: 201,
                name: "权限管理",
                route: "/system/permission",
                icon: "lock"
            },
            {
                id: 202,
                name: "角色管理",
                route: "/system/role",
                icon: "flag"
            }
        ]
    }
]

export default defaultMenuList
