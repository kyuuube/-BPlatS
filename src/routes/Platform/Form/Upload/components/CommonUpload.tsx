import React, { Component } from "react";
import { observer } from "mobx-react";
import { Upload, message, Button, Icon, Spin, Card, Modal } from "antd";
import { hot } from "react-hot-loader";
import { UploadProps, UploadChangeParam } from "antd/lib/upload";
import * as FileService from "services/FileService";
import configStore from "stores/configStore";

interface Props {}
interface State {
  loading: boolean;
  fileList: string[];
  previewVisible: boolean;
  previewImage: string;
  imageUrl: string;
}

/**
 * @desc 普通上传
 */
@hot(module)
@observer
export default class CommonUpload extends Component<Props, State> {
  readonly state: State = {
    loading: false,
    fileList: ["https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=138126325,1485620701&fm=85&s=7FAB2EC3909A35D01E299C1A030010D2"],
    previewVisible: false,
    previewImage: "",
    imageUrl: ""
  };

  render() {
    const props: UploadProps = {
      name: "file",
      fileList: this.state.fileList.map((v, i) => {
        return { name: v, uid: i, url: v } as any;
      }),
      // beforeUpload: async (file, fileList) => {
      //   console.log(file, fileList);
      //   const { url } = await FileService.uploadFile({ file });
      //   // return url;
      // },
      customRequest: async ({ file, onSuccess, onError }: any) => {
        console.log("option", { file, onSuccess, onError });
        try {
          const { url } = await FileService.uploadFile({ file });
          onSuccess(url, file);
        } catch (error) {
          onError(error);
        }
      },
      onChange: (info: any) => {
        console.log("onChange", info);
        if (info.file.status === "uploading") {
          this.setState({
            loading: true
          });
          return;
        }
        this.setState({
          fileList: info.fileList.map((v: any) => v.name)
        });
      },
      onSuccess: (url: any, file: any) => {
        console.log("onSuccess", url, file);
        this.setState({
          loading: false,
          fileList: this.state.fileList.concat(url)
        });
      }
    };

    return (
      <div>
        <Card style={{ marginBottom: 20 }}>
          <Upload
            {...props}
            accept="image/*"
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={file => {
              const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
              if (!isJpgOrPng) {
                message.error("只能上传jpg或png文件");
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error("文件大小不能超过2m");
              }
              return isJpgOrPng && isLt2M;
            }}
            onChange={info => {}}
            onSuccess={(imageUrl: string) => this.setState({ imageUrl })}
          >
            {this.state.imageUrl ? (
              <img src={this.state.imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">上传</div>
              </div>
            )}
          </Upload>
        </Card>

        <Card style={{ marginBottom: 20 }}>
          <Spin spinning={this.state.loading}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 上传
              </Button>
            </Upload>
          </Spin>
        </Card>

        <Card>
          <Spin spinning={this.state.loading}>
            <Upload
              {...props}
              listType="picture-card"
              onPreview={async (file: any) => {
                this.setState({
                  previewImage: file.url || file.preview,
                  previewVisible: true
                });
              }}
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
              </div>
            </Upload>
          </Spin>
          <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
            <img alt="example" style={{ width: "100%" }} src={this.state.previewImage} />
          </Modal>
        </Card>

        <Card>
          <Spin spinning={this.state.loading}>
            <Upload {...props} listType="picture">
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>
          </Spin>
        </Card>
      </div>
    );
  }
}
