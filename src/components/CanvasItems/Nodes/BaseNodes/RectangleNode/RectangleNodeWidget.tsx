import * as React from "react"
import * as _ from "lodash"
import {BaseWidget, BaseWidgetProps} from "nberktumer-react-diagrams"
import {RectangleNodeModel} from "./RectangleNodeModel"
import styles from "./RectangleNode.module.css"
import {DefaultPortLabel, DefaultPortModel} from "../../../Ports/DefaultPort"

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

    generatePort(port: DefaultPortModel) {
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
