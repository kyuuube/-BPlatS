import React, { Component } from "react";
import {RouteComponentProps} from "react-router";
import {FormComponentProps} from "antd/es/form";
import {Table, Divider, Tag, Breadcrumb, Row, Select, Button, Form, Input} from 'antd';
import {UserItem} from "../../../stores/userStore";

const {Column} = Table;
const {Option} = Select;

import "./role.less"

interface Props extends RouteComponentProps, FormComponentProps {
}
interface State {}

const data: UserItem[] = [];

class Role extends Component<Props, State> {
    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <div className="role">
                <div className="role-header">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">角色管理</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            角色列表
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="role-content">
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

export default Form.create<Props>()(Role);
