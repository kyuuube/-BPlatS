import React, {Component} from "react";
import {RouteComponentProps} from "react-router";
import {Breadcrumb, Skeleton, Row, Col, Avatar, Typography} from 'antd';
import Line from "./line"

const {Title, Text} = Typography;
import "./index.less"

interface Props extends RouteComponentProps {
}

interface State {
    loading: boolean
}

export default class Dashboard extends Component<Props, State> {
    state: State = {
        loading: true,
    };

    componentDidMount() {
        this.fakeLoading()
    }

    fakeLoading() {
        window.setTimeout(() => {
            this.setState({loading: false})
        }, 5000)
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            dashboard
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="user-info">
                        <Skeleton loading={this.state.loading} avatar active paragraph={{rows: 2}}>
                            <Row type="flex">
                                <Avatar size={70} src="https://i.loli.net/2019/09/14/yXAVUtHlu6oOjFk.jpg"/>
                                <div className="user-info-left">
                                    <Title className="user-info-left-title" level={4}>早安，傻鸭。我什么也不知道。</Title>
                                    <Text type="secondary">这是个新挖的坑，慢慢填坑中</Text>
                                </div>
                            </Row>
                        </Skeleton>
                    </div>
                </div>

                <div className="dashboard-main">
                    <Row gutter={20}>
                        <Col span={12}>
                            <div className="graph">
                                <Skeleton  loading={this.state.loading} avatar active paragraph={{rows: 6}}>
                                    <Line loading={this.state.loading}/>
                                </Skeleton>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="graph">
                                <Skeleton  loading={this.state.loading} avatar active paragraph={{rows: 6}}>
                                    <Line loading={this.state.loading}/>
                                </Skeleton>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
}


