import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import LayoutHeaderBaseAntd from 'components/LayoutHeaderBaseAntd'
import LayoutMenuBaseAntd from 'components/LayoutMenuBaseAntd'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface Props extends RouteComponentProps {}
interface State {
    collapsed: boolean;
    collapsible: boolean;
    drawerVisible: boolean;
    menuOpenKeys: string[];
    menuSelectedKeys: string[];
}

export default class home extends Component<Props, State> {
    readonly state: State = {
        collapsed: false,
        collapsible: true,
        drawerVisible: false,
        menuOpenKeys: [],
        menuSelectedKeys: [],
    };

    constructor(props: Props) {
        super(props);
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <LayoutMenuBaseAntd></LayoutMenuBaseAntd>
                </Sider>
                <Layout>
                    <LayoutHeaderBaseAntd></LayoutHeaderBaseAntd>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}
