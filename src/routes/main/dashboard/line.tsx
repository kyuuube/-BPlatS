import React, {Component} from "react";
import G2 from "@antv/g2";
import { Card, Skeleton } from "antd"

const uuidv1 = require('uuid/v1');

import "./index.less"

interface Props {
    loading: boolean,
}

interface State {
    id: string,
}

export default class Line extends Component<Props, State> {
    state: State = {
        id: '1'
    };

    componentWillMount() {
        const uuid = uuidv1()
        console.log(this.props.loading)
        this.setState({id: uuid})
    }

    componentDidMount() {

        const chart = new G2.Chart({
            container: this.state.id,
            width: 600,
            height: 300,
            data: [
                {x: 'a', y: 1},
                {x: 'b', y: 2},
            ]
        });

        chart.line().position('x*y');

        chart.render();
    }

    render() {
        return (
                <Card className="graph" title="Card title" bordered={false}>
                    <div id={this.state.id}/>
                </Card>
        );
    }
}
