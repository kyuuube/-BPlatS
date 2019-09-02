import React, { Component } from "react";
import "./style.less";
import classnames from "classnames";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  maxTime?: number;
  onSend: Function;
  disabled?: boolean;
}
interface State {
  disabled: boolean;
  time: number;
}
/**
 * @name 发送验证码按钮
 * ```tsx
 * <SendCodeButton
 *  disabled={commonRegexp.mobilePhone.test(phone)}
 *  onSend={() => {
 *  console.log("发送");
 *  }}
 * />
 * ```
 * */
export default class SendCodeButton extends Component<Props, State> {
  static defaultProps = {
    text: "发送验证码",
    maxTime: 60,
    disabled: false
  };
  readonly state: State = {
    disabled: false,
    time: 60
  };
  timer: any = null;

  componentDidMount() {
    this.setState({ time: this.props.maxTime! });
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  handleClick = () => {
    if (this.state.disabled || this.props.disabled) {
      return;
    }
    this.restart();
  };

  restart = () => {
    this.stop();
    this.props.onSend();
    this.setState(
      {
        disabled: true
      },
      () => {
        this.timer = setInterval(() => {
          if (this.state.time <= 0) {
            this.stop();
          } else {
            this.setState({
              time: this.state.time - 1
            });
          }
        }, 1000);
      }
    );
  };

  stop = () => {
    this.setState({
      disabled: false,
      time: this.props.maxTime!
    });
    this.timer && clearInterval(this.timer);
  };

  render() {
    const { disabled, time } = this.state;
    const { className, style, text } = this.props;
    return (
      <span className={classnames("SendCodeButton", className)} style={style} onClick={this.handleClick}>
        {disabled ? time : text}
      </span>
    );
  }
}
