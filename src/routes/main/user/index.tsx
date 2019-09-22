import React, {Component} from "react";
import {RouteComponentProps} from "react-router";
import {Table, Divider, Tag, Breadcrumb, Row, Select, Button, Form, Input} from 'antd';
import { FormComponentProps } from "antd/es/form";

const {Column, ColumnGroup} = Table;
const { Option } = Select;

import "./index.less"

interface Props extends RouteComponentProps, FormComponentProps {}

interface State {
}

const data: any = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 44,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

class User extends Component<Props, State> {

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
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
                </div>
                <div className="user-content">
                    <Row className="query">
                        <Form layout="inline">
                            <Form.Item label="关键字:">
                                {getFieldDecorator("keyword")(<Input placeholder="用户名、手机号、别名" />)}
                            </Form.Item>
                            <Form.Item label="角色:">
                                {getFieldDecorator("role")(<Select
                                    showSearch
                                    style={{ width: 200 }}
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
                    <Table dataSource={data}>
                        <ColumnGroup title="Name">
                            <Column title="First Name" dataIndex="firstName" key="firstName"/>
                            <Column title="Last Name" dataIndex="lastName" key="lastName"/>
                        </ColumnGroup>
                        <Column title="Age" dataIndex="age" key="age"/>
                        <Column title="Address" dataIndex="address" key="address"/>
                        <Column
                            title="Tags"
                            dataIndex="tags"
                            key="tags"
                            render={tags => (
                                <span>
          {tags.map(tag => (
              <Tag color="blue" key={tag}>
                  {tag}
              </Tag>
          ))}
        </span>
                            )}
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(text: any, record: any) => (
                                <span>
          <a>Invite {record.lastName}</a>
          <Divider type="vertical"/>
          <a>Delete</a>
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
