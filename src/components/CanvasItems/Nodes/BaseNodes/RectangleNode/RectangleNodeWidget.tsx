import * as React from "react"
import * as _ from "lodash"
import {BaseWidget, BaseWidgetProps, DefaultPortLabel} from "storm-react-diagrams"
import {RectangleNodeModel} from "./RectangleNodeModel"
import {SingleConnectionPort} from "../../../Ports/SingleConnectionPort/SingleConnectionPort"
import styles from "./RectangleNode.module.css"

export interface RectangleNodeWidgetProps extends BaseWidgetProps {
    node: RectangleNodeModel;
}

export interface RectangleNodeWidgetState {
}

export class RectangleNodeWidget extends BaseWidget<RectangleNodeWidgetProps, RectangleNodeWidgetState> {
    constructor(props: RectangleNodeWidgetProps) {
        super("srd-default-node", props)
        this.state = {}
    }

    generatePort(port: SingleConnectionPort) {
        return <DefaultPortLabel model={port} key={port.id}/>
    }

    render() {
        return (
            <div {...this.getProps()} style={{background: this.props.node.color}}>
                <div className={styles.rectangleNodeTitle}>
                    <div className={styles.rectangleNodeName}>{this.props.node.name}</div>
                </div>
                <div className={styles.rectangleNodePorts}>
                    <div className={styles.rectangleNodeIn}>
                        {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                    </div>
                    <div className={styles.rectangleNodeOut}>
                        {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                    </div>
                </div>
            </div>
        )
    }
}
