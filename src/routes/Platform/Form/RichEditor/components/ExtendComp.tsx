import React, { Component } from "react";
import { observer } from "mobx-react";
import BraftEditor, { EditorState, ControlType, ExtendControlType } from "braft-editor";
import "braft-editor/dist/index.css";
import { Alert, Button, Modal } from "antd";

interface Props {}
interface State {
  editorState: EditorState;
}

/**
 * @desc 自定义按钮
 */
export default class ExtendComp extends Component<Props, State> {
  readonly state: State = {
    editorState: BraftEditor.createEditorState(null)
  };

  handleChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  insertHello = () => {
    let htmlContent = this.state.editorState.toHTML();
    htmlContent += "<p>你好啊！</p>";
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    });
  };

  render() {
    const { editorState } = this.state;
    const controls: ControlType[] = ["bold", "italic", "underline", "separator"];
    const extendControls: ExtendControlType[] = [
      {
        key: "custom-button",
        type: "button",
        text: "按钮",
        onClick: this.insertHello
      },
      {
        key: "custom-dropdown",
        type: "dropdown",
        text: "下拉组件",
        component: <div style={{ color: "#fff", padding: 10 }}>你好啊！</div>
      },
      {
        key: "custom-modal",
        type: "modal",
        text: "模态框",
        modal: {
          id: "my-moda-1",
          title: "你好啊",
          children: (
            <div style={{ width: 400, padding: "0 10px" }}>
              <img
                src="https://margox.cn/wp-content/uploads/2016/10/FA157E13E8B77E6E11290E9DF4C5ED7D-480x359.jpg"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )
        }
      },
      {
        key: "Btn",
        type: "component",
        component: <Button type="primary">233</Button>
      }
    ];

    return (
      <div className="editor-wrapper">
        <BraftEditor
          value={editorState}
          onChange={this.handleChange}
          controls={controls}
          extendControls={extendControls}
          contentStyle={{ height: 200 }}
        />
      </div>
    );
  }
}
