import {Layout, Icon, Row, Col, Avatar, Menu, Dropdown} from 'antd';
import React, {Component} from "react";
import "components/LayoutHeaderBaseAntd/index.less"

const {Header} = Layout;
const {SubMenu} = Menu;

interface Props {
}

interface State {
    collapsed: boolean;
}

export default class LayoutHeader extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    // onCollapse = collapsed => {
    //     console.log(collapsed);
    //     this.setState({ collapsed });
    // };

    render() {
        const menuHeaderDropdown = (
            <Menu>
                <Menu.Item key="center">
                    <Icon type="user"/>
                </Menu.Item>
                <Menu.Item key="settings">
                    <Icon type="setting"/>
                </Menu.Item>
                <Menu.Item key="logout">
                    <Icon type="logout"/>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className="header-layout">
                <Row>
                    <Col className="header-layout-left" span={12}><Icon type="menu-fold"/></Col>
                    <Col className="header-layout-right" span={12}>
                        <span className="action account">
                            <Icon className="header-layout-global" type="question-circle" />
                        </span>
                        <span className="action account">
                            <Icon className="header-layout-global" type="bell" />
                        </span>
                        <Dropdown overlay={menuHeaderDropdown}>
                            <span className="action account">
                                <Avatar size="small" className="avatar" icon="user"/>
                                <span className="name">用户名</span>
                            </span>
                        </Dropdown>
                        <Dropdown overlay={menuHeaderDropdown}>
                            <Icon className="header-layout-global" type="global" />
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        );
    }
}
