import { Layout } from 'antd';
import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import LayoutHeaderBaseAntd from 'components/LayoutHeaderBaseAntd'
import LayoutMenuBaseAntd from 'components/LayoutMenuBaseAntd'
import {MenuRoute} from './menuRoute'
import "./index.less"
import {hot} from "react-hot-loader";
const { Content, Footer, Sider } = Layout;

interface Props extends RouteComponentProps {}
interface State {
    collapsed: boolean;
    collapsible: boolean;
    drawerVisible: boolean;
    menuOpenKeys: string[];
    menuSelectedKeys: string[];
}
@hot(module)
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
        const {history, location, match} = this.props
        return (
            <Layout className="main-layout">
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <LayoutMenuBaseAntd history={history} location={location} match={match}></LayoutMenuBaseAntd>
                </Sider>
                <Layout>
                    <LayoutHeaderBaseAntd></LayoutHeaderBaseAntd>
                    <Content style={{ margin: '0 16px' }}>
                        <MenuRoute />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>QB  ©2019</Footer>
                </Layout>
            </Layout>
        );
    }
}
