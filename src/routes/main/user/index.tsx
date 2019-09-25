import React, {Component, Fragment} from "react";
import {RouteComponentProps} from "react-router";
import {Table, Divider, Tag, Breadcrumb, Row, Select, Button, Form, Input, Typography, Alert, Col, Icon} from 'antd';
import {FormComponentProps} from "antd/es/form";
import {UserItem} from "../../../stores/userStore";

const {Column} = Table;
const {Option} = Select;
const {Title} = Typography
const FormItem = Form.Item;

import "./index.less"
import "../../../styles/form.less"

interface Props extends RouteComponentProps, FormComponentProps {
}

interface State {
}

const data: UserItem[] = [];

class User extends Component<Props, State> {

    renderSimpleForm() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="关键字">
                            {getFieldDecorator("keyword")(<Input placeholder="用户名、手机号、别名"/>)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator("role")(<Select
                                showSearch
                                placeholder="选择角色"
                                optionFilterProp="children"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
            <span className="submitButtons">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} >
                重置
              </Button>
            </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        return (
            <div className="user">
                <div className="user-header">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            用户管理
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            用户列表
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Title className="title-text" level={4}>用户列表</Title>
                </div>
                <div className="user-content">
                    <div className="query tableListForm">
                        {this.renderSimpleForm()}
                    </div>
                    <Row className="list-operator">
                        <Button type="primary" icon="plus">添 加</Button>
                    </Row>

                    <div className="list-operator">
                        <Alert
                            message={
                                <Fragment>
                                    已选择 <a style={{ fontWeight: 600 }}>1</a> 项
                                    <a style={{ marginLeft: 24 }}>
                                        清空
                                    </a>
                                </Fragment>
                            }
                            type="info"
                            showIcon
                        />
                    </div>

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
