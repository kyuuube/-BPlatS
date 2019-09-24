import React, {Component} from "react";
import {RouteComponentProps} from "react-router";
import {Table, Divider, Tag, Breadcrumb, Row, Select, Button, Form, Input, Typography} from 'antd';
import {FormComponentProps} from "antd/es/form";
import {UserItem} from "../../../stores/userStore";

const {Column} = Table;
const {Option} = Select;
const {Title} = Typography

import "./index.less"

interface Props extends RouteComponentProps, FormComponentProps {
}

interface State {
}

const data: UserItem[] = [];

class User extends Component<Props, State> {

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <div className="user">
                <div className="user-header">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            用户列表
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Title className="title-text" level={4}>用户列表</Title>
                </div>
                <div className="user-content">
                    <Row className="query">
                        <Form layout="inline">
                            <Form.Item label="关键字:">
                                {getFieldDecorator("keyword")(<Input placeholder="用户名、手机号、别名"/>)}
                            </Form.Item>
                            <Form.Item label="角色:">
                                {getFieldDecorator("role")(<Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="选择角色"
                                    optionFilterProp="children"
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>)}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" icon="search">搜 索</Button>
                            </Form.Item>
                        </Form>
                    </Row>
                    <Row>
                        <Button type="primary" icon="search">添加</Button>
                    </Row>
                    <Table dataSource={data} className="table-list">
                        <Column title="账号" dataIndex="firstName" key="firstName"/>
                        <Column title="状态" dataIndex="firstName" key="firstName"/>
                        <Column title="昵称" dataIndex="age" key="age"/>
                        <Column
                            title="角色"
                            dataIndex="tags"
                            key="tags"
                            render={tags => (
                                <span>{tags.map(tag => (<Tag color="blue" key={tag}>{tag}</Tag>))}</span>
                            )}
                        />
                        <Column title="加入时间" dataIndex="firstName" key="firstName"/>
                        <Column
                            title="操作"
                            key="action"
                            render={(text: any, record: any) => (
                                <span>
                                    <a>详情</a>
                                    <Divider type="vertical"/>
                                    <a>删除</a>
                                </span>
                            )}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}

export default Form.create<Props>()(User);
