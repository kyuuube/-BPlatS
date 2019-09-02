import React, { Component } from "react";
import "./style.less";
import { Modal, Spin, Form, Input, Upload, Button, Avatar, message } from "antd";
import { withRouter } from "react-router";
import { FormComponentProps } from "antd/es/form";
import errorCapture from "utils/errorCapture";
import userStore from "stores/userStore";
import { observer } from "mobx-react";
import { UploadProps, UploadChangeParam } from "antd/lib/upload";
import * as FileService from "services/FileService";
import * as UserService from "services/UserService";
const FormItem = Form.Item;

interface Props extends FormComponentProps {}
interface State {
  loading: boolean;
}

@observer
class BaseView extends Component<Props, State> {
  view: HTMLDivElement | undefined = undefined;
  readonly state: State = {
    loading: false
  };
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    await userStore.getUserData();
    const { alias, signature, realName } = userStore.data;
    this.props.form.setFieldsValue({
      alias,
      signature,
      realName
    });
  };

  submit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.updateMyInfo(fieldsValue);
    });
  };

  updateMyInfo = async (data: any) => {
    this.setState({ loading: true });
    const [error, resp] = await errorCapture(UserService.updateMyInfo(data));
    this.setState({ loading: false });
    userStore.getUserData();
    if (error) {
      return;
    }
    message.success("修改成功");
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const fileList: any = [];
    const url = userStore.data.avatar;
    if (url) {
      fileList.push({ url, name: url, uid: 1 });
    }
    const uploadProps: UploadProps = {
      customRequest: async ({ file, onSuccess, onError }: any) => {
        console.log("option", { file, onSuccess, onError });
        try {
          const { url } = await FileService.uploadFile({ file });
          onSuccess(url, file);
        } catch (error) {
          onError(error);
        }
      },
      onSuccess: (url: any, file: any) => {
        console.log("onSuccess", url, file);
        this.updateMyInfo({ avatar: url });
      },
      beforeUpload: (file: any) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          message.error("只能上传jpg或png文件");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error("文件大小不能超过2m");
        }
        return isJpgOrPng && isLt2M;
      }
    };
    return (
      <div className="baseView" ref={(ref: any) => (this.view = ref)}>
        <div className="left">
          <Form layout="vertical" hideRequiredMark>
            <FormItem label="昵称">
              {getFieldDecorator("alias", {
                rules: [
                  {
                    required: true,
                    message: "请输入昵称"
                  }
                ]
              })(<Input placeholder="昵称" />)}
            </FormItem>
            <FormItem label="个人简介">
              {getFieldDecorator("signature", {
                rules: []
              })(<Input.TextArea placeholder="个人简介" rows={4} />)}
            </FormItem>
            <FormItem label="真实姓名">
              {getFieldDecorator("realName", {
                rules: []
              })(<Input placeholder="真实姓名" />)}
            </FormItem>
            <Button type="primary" onClick={this.submit} loading={this.state.loading}>
              更新基本信息
            </Button>
          </Form>
        </div>
        <div className="right">
          <>
            <div className="avatar_title">头像</div>
            <Avatar className="avatar" src={userStore.data.avatar} />
            <Upload accept="image/*" fileList={fileList} name="url" showUploadList={false} {...uploadProps}>
              <div className="button_view">
                <Button icon="upload">更换头像</Button>
              </div>
            </Upload>
          </>
        </div>
      </div>
    );
  }
}

export default Form.create<Props>()(BaseView);
