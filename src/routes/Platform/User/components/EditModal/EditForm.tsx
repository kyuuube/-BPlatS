import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { Form, Input, message, Upload, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Mode } from "./index";
import { UploadProps, UploadChangeParam } from "antd/lib/upload";
import * as FileService from "services/FileService";
import configStore from "stores/configStore";
const FormItem = Form.Item;

interface Props extends FormComponentProps {
  mode: Mode;
}
interface State {
  loading: boolean;
}
export class EditForm extends Component<Props, State> {
  static defaultProps = {};
  readonly state: State = {
    loading: false
  };

  render() {
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const fileList: any = [];
    const url = getFieldValue("avatar");
    if (url) {
      fileList.push({ url, name: url, uid: 1 });
    }

    console.log("url", url);
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
        setFieldsValue({ avatar: url });
      },
      beforeUpload: (file: any) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          message.error("只能上传jpg或png文件");
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error("文件大小不能超过2m");
        }
        return isJpgOrPng && isLt2M;
      }
    };
    return (
      <Form>
        <FormItem {...formItemLayout} label="头像">
          <Upload
            accept="image/*"
            fileList={fileList}
            name="url"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            {...uploadProps}
          >
            {url ? (
              <img src={url} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">上传</div>
              </div>
            )}
          </Upload>
          {getFieldDecorator("avatar", {
            rules: [
              {
                required: true
              }
            ]
          })(<span />)}
        </FormItem>
        <FormItem label="用户名" {...formItemLayout}>
          {getFieldDecorator("username", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="手机号码" {...formItemLayout}>
          {getFieldDecorator("phone", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="邮箱" {...formItemLayout}>
          {getFieldDecorator("email", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="别名" {...formItemLayout}>
          {getFieldDecorator("alias", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="真实姓名" {...formItemLayout}>
          {getFieldDecorator("realName", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="个性签名" {...formItemLayout}>
          {getFieldDecorator("signature", {
            rules: []
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);
