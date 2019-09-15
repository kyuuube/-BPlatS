import {Menu, Icon} from 'antd';
import React, {Component} from "react";
// import history from "routes/history";
import defaultMenuList, {MenuItem} from "./defaultMenuList"
import {RouteComponentProps} from "react-router";

const {SubMenu} = Menu;


interface Props extends RouteComponentProps {
}

interface State {
    openKeys: string[],
    selectedKeys: string[],
    flatList: any[]
}

export default class LayoutMenu extends Component<Props, State> {
    state: State = {
        openKeys: [],
        selectedKeys: [],
        flatList: []
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.onHistoryChange();
    }

    onClick = ({key}) => {
        this.setState({selectedKeys: [`${key}`]});
    }

    onOpenChange = (openKeys: string[]) => {
        this.setState({openKeys});
    };

    onHistoryChange = () => {
        const {openKeys, selectedKeys} = this.getSelectedMenus(defaultMenuList, this.props.location.pathname);
        this.setState({openKeys, selectedKeys});
    };

    getSelectedMenus = (tree: MenuItem[], pathName: string) => {
        // 树转普通数组
        let list: any[] = []
        this.treeToFlatArray(tree, list)
        const item = list.find(i => i.route === pathName)

        return {
            openKeys: [`${item.pid}`],
            selectedKeys: [`${item.id}`]
        }
    }

    treeToFlatArray(tree: any[], list: any[], pid?: number) {
        tree.forEach(t => {
            if (pid) {
                t.pid = pid
            }
            const tmp: Object = {}
            for (let i in t) {
                if (i !== "children") {
                    tmp[i] = t[i]
                }
            }
            list.push(tmp)
            if (t.children && t.children.length > 0) {
                this.treeToFlatArray(t.children, list, t.id)
            }
        })
    }

    render() {
        const {history} = this.props;
        const renderMenuIte = (menuItems: MenuItem[]) => {
            return menuItems.map(menu => {
                if (menu.children && menu.children.length > 0) {
                    return (
                        <SubMenu
                            key={menu.id}
                            title={<span><
                                Icon type={menu.icon}/>
                                <span>{menu.name}</span></span>}>
                            {renderMenuIte(menu.children)}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item
                            onClick={() => {
                                history.push(menu.route);
                            }} key={menu.id}>
                            <Icon type={menu.icon}/><span>{menu.name}</span></Menu.Item>
                    )
                }
            })
        }
        return (
            <Menu theme="dark"
                  mode="inline"
                  onClick={this.onClick}
                  onOpenChange={this.onOpenChange}
                  selectedKeys={this.state.selectedKeys}
                  openKeys={this.state.openKeys}>
                {renderMenuIte(defaultMenuList)}
            </Menu>
        )
    }
}
