import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Layout, Breadcrumb, Alert, Card } from "antd";
import AsynLoadable from "components/AsynLoadable";
const Content = Layout.Content;
interface Props {}
interface State {}

/**
 * @name 异步拆包组件
 */
@observer
export default class AsyncLoadPage extends Component<Props, State> {
  readonly state: State = {};
  Swiper: any;
  echarts: typeof import(/* webpackChunkName: "echarts" */ "echarts") | undefined;
  refChart: HTMLDivElement | undefined;

  importSwiper = () => {
    return import("./components/Swiper").then(Swiper => {
      this.Swiper = Swiper.default;
    });
  };

  initChart = () => {
    const myChart = this.echarts!.init(this.refChart!);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  };

  getComponentEchart = () => {
    return import(/* webpackChunkName: "echarts" */ "echarts").then(echarts => {
      this.echarts = echarts;
    });
  };

  async componentDidMount() {
    await this.importSwiper();
    const swiper = new this.Swiper(".swiper-container", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

    await this.getComponentEchart();
    this.initChart();
  }

  render() {
    return (
      <Layout className="page AsyncLoadPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>异步拆包组件</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Card title="swiper import原生" style={{ marginBottom: 20 }}>
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">Slide 1</div>
                <div className="swiper-slide">Slide 2</div>
                <div className="swiper-slide">Slide 3</div>
                <div className="swiper-slide">Slide 4</div>
                <div className="swiper-slide">Slide 5</div>
                <div className="swiper-slide">Slide 6</div>
                <div className="swiper-slide">Slide 7</div>
                <div className="swiper-slide">Slide 8</div>
                <div className="swiper-slide">Slide 9</div>
                <div className="swiper-slide">Slide 10</div>
              </div>
              <div className="swiper-button-next" />
              <div className="swiper-button-prev" />
            </div>
          </Card>

          <Card title="echarts asyncLoad组件" style={{ marginBottom: 20 }}>
            <div className="chartComponent" ref={(ref: any) => (this.refChart = ref)} style={{ height: 300 }} />
          </Card>
        </Content>
      </Layout>
    );
  }
}
