import { Layout, Icon, Row, Col, Avatar } from 'antd';
import React, { Component } from "react";
import "components/LayoutHeaderBaseAntd/index.less"

const { Header } = Layout;

interface Props {
}
interface State {
    collapsed: boolean;
}

export default class home extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    // onCollapse = collapsed => {
    //     console.log(collapsed);
    //     this.setState({ collapsed });
    // };

    render() {
        return (
            <Header className="header-layout">
                <Row>
                    <Col className="header-layout-left" span={12} ><Icon type="menu-fold" /></Col>
                    <Col className="header-layout-right" span={12}>
                        <Avatar size="small" className="header-layout-avatar" icon="user" />
                        <Icon className="header-layout-global" type="global" />
                    </Col>
                </Row>
            </Header>
        );
    }
}
