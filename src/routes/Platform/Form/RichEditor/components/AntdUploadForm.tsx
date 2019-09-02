import React, { Component } from "react";
import { observer } from "mobx-react";
import BraftEditor, { EditorState, ControlType, ExtendControlType } from "braft-editor";
import { ContentUtils } from "braft-utils";
import "braft-editor/dist/index.css";
import { Alert, Button, Upload, Icon } from "antd";
import { hot } from "react-hot-loader";

interface Props {}
interface State {
  editorState: EditorState;
}

/**
 * @desc antd上传图片
 */
@hot(module)
@observer
export default class AntdUploadForm extends Component<Props, State> {
  readonly state: State = {
    editorState: BraftEditor.createEditorState(null)
  };

  handleChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  uploadHandler = (param: any) => {
    if (!param.file) {
      return false;
    }

    console.log(param);

    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [
        {
          type: "IMAGE",
          url: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
        }
      ])
    });
  };

  render() {
    const controls: ControlType[] = ["bold", "italic", "underline", "text-color", "separator", "link", "separator"];
    const extendControls: ExtendControlType[] = [
      {
        key: "antd-uploader",
        type: "component",
        component: (
          <Upload accept="image/*" showUploadList={false} customRequest={this.uploadHandler}>
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        )
      }
    ];

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor value={this.state.editorState} onChange={this.handleChange} controls={controls} extendControls={extendControls} />
        </div>
      </div>
    );
  }
}
