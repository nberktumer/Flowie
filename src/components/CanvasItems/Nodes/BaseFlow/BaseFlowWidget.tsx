import * as React from "react"
import * as _ from "lodash"
import {BaseWidget, BaseWidgetProps} from "nberktumer-react-diagrams"
import {BaseFlowModel} from "./BaseFlowModel"
import styles from "./BaseFlow.module.css"
import {DefaultPortLabel, DefaultPortLocation, DefaultPortModel, DefaultPortType} from "../../Ports/DefaultPort"

export interface RectangleNodeWidgetProps extends BaseWidgetProps {
    node: BaseFlowModel;
}

export interface RectangleNodeWidgetState {
}

export class BaseFlowWidget extends BaseWidget<RectangleNodeWidgetProps, RectangleNodeWidgetState> {
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
