import React, {Component} from "react"
import styles from "./ShapePanel.module.css"

export interface IShapePanelProps {
}

export interface IShapePanelState {
}

export class ShapePanel extends Component<IShapePanelProps, IShapePanelState> {
    static defaultProps: IShapePanelProps = {}

    constructor(props: IShapePanelProps) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className={styles.tray}>{this.props.children}</div>
    }
}