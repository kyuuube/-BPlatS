import React, { Component } from "react";
import { observer } from "mobx-react";
import BraftEditor, { EditorState, ControlType, ExtendControlType, MediaType } from "braft-editor";
import { ContentUtils } from "braft-utils";
import "braft-editor/dist/index.css";
import { Alert, Button, Upload, Icon } from "antd";
import { hot } from "react-hot-loader";
import * as FileService from "services/FileService";
import configStore from "stores/configStore";

interface Props {}
interface State {
  editorState: EditorState;
}

/**
 * @desc 自定义上传
 */
@hot(module)
@observer
export default class CustomUploadForm extends Component<Props, State> {
  readonly state: State = {
    editorState: BraftEditor.createEditorState(null)
  };

  handleChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  uploadHandlerDemo: MediaType["uploadFn"] = param => {
    const serverURL = "http://upload-server";
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response: any) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: xhr.responseText,
        meta: {
          id: "xxx",
          title: "xxx",
          alt: "xxx",
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: "http://xxx/xx.png" // 指定视频播放器的封面
        }
      });
    };

    const progressFn = (event: any) => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = (response: any) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: "unable to upload."
      });
    };

    xhr.upload.addEventListener("progress", progressFn, false);
    xhr.addEventListener("load", successFn, false);
    xhr.addEventListener("error", errorFn, false);
    xhr.addEventListener("abort", errorFn, false);

    fd.append("file", param.file);
    xhr.open("POST", serverURL, true);
    xhr.send(fd);
  };

  uploadHandler: MediaType["uploadFn"] = async param => {
    try {
      const { url } = await FileService.uploadFile({ file: param.file });
      param.success({
        url: url,
        meta: {
          id: Math.random().toString(),
          title: param.file.name,
          alt: "",
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: url // 指定视频播放器的封面
        }
      });
    } catch (error) {
      param.error({
        msg: error.message
      });
    }
  };

  render() {
    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={this.state.editorState}
            onChange={this.handleChange}
            media={{
              uploadFn: this.uploadHandler
            }}
          />
        </div>
      </div>
    );
  }
}
