import React, { Component } from "react";
import { observer } from "mobx-react";
import { Form, Input, Button, Upload, Card, message, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { UploadProps, UploadChangeParam } from "antd/lib/upload";
import * as FileService from "services/FileService";
import configStore from "stores/configStore";
const FormItem = Form.Item;

interface Props extends FormComponentProps {}
interface State {
  loading: boolean;
}

/**
 * @desc form内用
 */
class FormUpload extends Component<Props, State> {
  readonly state: State = {
    loading: false
  };

  componentDidMount() {
    this.props.form.setFieldsValue({
      url: "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=138126325,1485620701&fm=85&s=7FAB2EC3909A35D01E299C1A030010D2"
    });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log("values", values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const fileList: any = [];
    const url = getFieldValue("url");
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
        setFieldsValue({ url });
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
      <Card className="demo-container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="文章标题">
            {getFieldDecorator("title", {})(<Input size="large" placeholder="请输入标题" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="图片">
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
            {getFieldDecorator("url", {
              rules: [
                {
                  required: true
                }
              ]
            })(<span />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button size="large" type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create<Props>()(FormUpload);
