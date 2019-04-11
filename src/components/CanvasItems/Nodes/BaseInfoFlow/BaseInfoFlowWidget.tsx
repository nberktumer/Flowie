import * as React from "react"
import * as _ from "lodash"
import {BaseWidget, BaseWidgetProps} from "nberktumer-react-diagrams"
import styles from "../BaseFlow/BaseFlow.module.css"
import {BaseInfoFlowModel} from "./BaseInfoFlowModel"
import {DefaultPortLabel, DefaultPortLocation, DefaultPortModel} from "../../Ports/DefaultPort"

export interface RectangleNodeWithInfoWidgetProps extends BaseWidgetProps {
    node: BaseInfoFlowModel;
}

export interface RectangleNodeWithInfoWidgetState {
}

export class BaseInfoFlowWidget extends BaseWidget<RectangleNodeWithInfoWidgetProps, RectangleNodeWithInfoWidgetState> {
    constructor(props: RectangleNodeWithInfoWidgetProps) {
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
                <div className={styles.rectangleNodeInfo}>
                    <div className={styles.rectangleNodeName}>{this.props.node.info}</div>
                </div>
                <div className={styles.rectangleNodePorts}>
                    <div className={styles.rectangleNodeIn}>
                        {_.map(this.props.node.getPortListByLocation(DefaultPortLocation.LEFT), this.generatePort.bind(this))}
                    </div>
                    <div className={styles.rectangleNodeOut}>
                        {_.map(this.props.node.getPortListByLocation(DefaultPortLocation.RIGHT), this.generatePort.bind(this))}
                    </div>
                </div>
            </div>
        )
    }
}
