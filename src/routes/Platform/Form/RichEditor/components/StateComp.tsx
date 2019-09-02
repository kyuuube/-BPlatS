import React, { Component } from "react";
import { observer } from "mobx-react";
import BraftEditor, { EditorState } from "braft-editor";
import "braft-editor/dist/index.css";
import { Alert, Button } from "antd";
import { hot } from "react-hot-loader";

interface Props {}
interface State {
  editorState: EditorState;
}

/**
 * @desc 正常state
 */
@hot(module)
@observer
export default class StateComp extends Component<Props, State> {
  readonly state: State = {
    editorState: BraftEditor.createEditorState(null)
  };

  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
      editorState: BraftEditor.createEditorState("21342134")
    });
  }

  submit = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    console.log(htmlContent);
  };

  handleEditorChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Alert message="图片url会默认转为base64字符串" style={{ marginBottom: 20 }} />
        <Alert
          message={
            <a href="https://braft.margox.cn/demos/custom" target="_blank">
              https://braft.margox.cn/demos/custom
            </a>
          }
          style={{ marginBottom: 20 }}
        />
        <Button onClick={this.submit} type="primary" style={{ marginBottom: 20 }}>
          输出
        </Button>
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submit}
          media={{
            accepts: {
              video: false,
              audio: false
            }
          }}
        />
      </div>
    );
  }
}
