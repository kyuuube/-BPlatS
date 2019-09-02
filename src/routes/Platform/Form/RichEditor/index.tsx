import React, { Component } from "react";
import "./style.less";
import { observer } from "mobx-react";
import { Layout, Breadcrumb, Tabs, Button } from "antd";
import { Link } from "react-router-dom";
import StateComp from "./components/StateComp";
import FormComp from "./components/FormComp";
import ExtendComp from "./components/ExtendComp";
import AntdUploadForm from "./components/AntdUploadForm";
import CustomUploadForm from "./components/CustomUploadForm";
import { withRouter, RouteComponentProps } from "react-router";
import history from "routes/history";
import { parse } from "query-string";
import EditModal from "../../System/Menu/components/EditModal";
const { Content } = Layout;
const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}
interface State {
  defaultActiveKey: string;
}

/**
 * @desc BraftEditor编辑器
 * @see https://braft.margox.cn/demos/custom
 */
@observer
export default class RichEditorPage extends Component<Props, State> {
  editModal?: EditModal;
  readonly state: State = {
    defaultActiveKey: "1"
  };

  componentDidMount() {
    const query: any = parse(this.props.location.search);
    this.setState({
      defaultActiveKey: query.defaultActiveKey || "1"
    });
  }
  render() {
    return (
      <Layout className="page RichEditorPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>富文本编辑器</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Tabs
            defaultActiveKey={this.state.defaultActiveKey}
            onChange={key => history.replace("/form/richEditor?defaultActiveKey=" + key)}
          >
            <TabPane tab="正常state" key="1">
              <StateComp />
            </TabPane>
            <TabPane tab="form内用" key="2">
              <FormComp />
            </TabPane>
            <TabPane tab="antdUpload" key="3">
              <AntdUploadForm />
            </TabPane>
            <TabPane tab="配置上传" key="4">
              <CustomUploadForm />
            </TabPane>
            <TabPane tab="自定义按钮" key="5">
              <ExtendComp />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}
