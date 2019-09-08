import { Menu, Icon } from 'antd';
import React, {Component} from "react";
// import history from "routes/history";
import defaultMenuList, {MenuItem} from "./defaultMenuList"
import { RouteComponentProps } from "react-router";
const { SubMenu } = Menu;


interface Props extends RouteComponentProps {}
interface State {}

export default class LayoutMenu extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { history } = this.props;
        const renderMenuIte = (menuItems: MenuItem[]) => {
            return menuItems.map(menu => {
                if(menu.children && menu.children.length > 0) {
                    return (
                        <SubMenu
                            key={menu.id}
                            title={<span><
                                Icon type={menu.icon} />
                                <span>{menu.name}</span></span>}>
                            {renderMenuIte(menu.children)}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item
                            onClick={() => {
                                history.push(menu.route);
                            }} key={menu.id}>{menu.name}</Menu.Item>
                    )
                }
            })
        }
        return (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {renderMenuIte(defaultMenuList)}
            </Menu>
        )
    }
}
