import React, { Component } from "react";
import { observer } from "mobx-react";
import "braft-editor/dist/index.css";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import BraftEditor, { EditorState, ControlType } from "braft-editor";
const FormItem = Form.Item;

interface Props extends FormComponentProps {}
interface State {}

/**
 * @desc form内用
 * - 编辑器组件的数据格式为ediorState，为此在调用setFieldsValue时和在提交之前，需要进行相应的转换
 * - 进行空值校验的话，需要自定义validator，并通过value.isEmpty()来校验，value就是一个editorState
 * - 编辑器组件的验证时机需要改成onBlur，以避免不期望的验证提示和不必要的性能开销
 */
class FormComp extends Component<Props, State> {
  readonly state: State = {};

  componentDidMount() {
    // 异步设置编辑器内容
    setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState("<p>Hello <b>World!</b></p>")
      });
    }, 1000);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log("values", values);
        const submitData = {
          title: values.title,
          content: values.content.toHTML() // or values.content.toRAW()
        };
        console.log(submitData);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const controls: ControlType[] = ["bold", "italic", "underline", "text-color", "separator", "link", "separator", "media"];
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    return (
      <div className="demo-container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="文章标题">
            {getFieldDecorator("title", {})(<Input size="large" placeholder="请输入标题" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="文章正文">
            {getFieldDecorator("content", {
              validateTrigger: "onBlur",
              rules: [
                {
                  required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      callback("请输入正文内容");
                    } else {
                      callback();
                    }
                  }
                }
              ]
            })(<BraftEditor className="my-editor" controls={controls} placeholder="请输入正文内容" />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button size="large" type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create<Props>()(FormComp);
