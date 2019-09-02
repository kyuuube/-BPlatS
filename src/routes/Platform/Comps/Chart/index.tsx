import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Layout, Breadcrumb, Alert } from "antd";
import LazyLoad from "react-lazyload";
import echarts from "echarts";
const Content = Layout.Content;

interface Props {}
interface State {}

/**
 * @name echart图表
 */
@observer
export default class ChartPage extends Component<Props, State> {
  // echarts: typeof import(/* webpackChunkName: "echarts" */ "echarts") | undefined;
  echarts: typeof echarts | undefined;
  refChart: HTMLDivElement | undefined;
  readonly state: State = {};

  async componentDidMount() {
    // await this.getComponentEchart();
    this.initChart();
  }

  getComponentEchart = () => {
    // return import(/* webpackChunkName: "echarts" */ "echarts").then(echarts => {
    //   this.echarts = echarts;
    // });
  };

  initChart = () => {
    const myChart = echarts!.init(this.refChart!);
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

  render() {
    return (
      <Layout className="page ChartPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>echart图表</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Alert
            message={
              <a href="http://echarts.baidu.com/examples/" target="_blank">
                官网案例
              </a>
            }
            style={{ marginBottom: 20 }}
          />
          <Alert
            message={
              <a href="http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts" target="_blank">
                官网引用例子
              </a>
            }
            style={{ marginBottom: 20 }}
          />
          <Alert
            message={
              `单独的打包一个文件 import(/* webpackChunkName: "echarts" */ "echarts").then` +
              "\n" +
              `用不用都可以，因为页面都是异步加载的了`
            }
            style={{ marginBottom: 20 }}
          />
          <div className="chartComponent" ref={(ref: any) => (this.refChart = ref)} style={{ height: 300 }} />
        </Content>
      </Layout>
    );
  }
}
