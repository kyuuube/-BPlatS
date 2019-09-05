import { Menu, Icon } from 'antd';
import React, {Component} from "react";
const { SubMenu } = Menu;

interface Props {}
interface State {}

export default class LayoutMenu extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
                    }
                >
                    <Menu.Item key="3">Toom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Al7ex</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}
