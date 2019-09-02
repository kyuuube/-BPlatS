import React, { Component } from "react";
import "./style.less";
import { Modal, Spin } from "antd";

interface Props {
  visible: boolean;
}
interface State {}
export default class SpinModal extends Component<Props, State> {
  static defaultProps = {
    visible: false
  };
  constructor(props: Props) {
    super(props);
  }
  shouldComponentUpdate(nextProps: Props) {
    return this.props.visible != nextProps.visible;
  }
  render() {
    return (
      <Modal
        visible={this.props.visible}
        wrapClassName="SpinModal"
        maskClosable={false}
        closable={false}
        footer={null}
      >
        <Spin size="large" />
      </Modal>
    );
  }
}
