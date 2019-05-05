import React, {Component} from "react"
import styles from "./ShapePanel.module.css"

export interface ShapePanelProps {
}

export interface ShapePanelState {
}

export class ShapePanel extends Component<ShapePanelProps, ShapePanelState> {
    static defaultProps: ShapePanelProps = {}

    constructor(props: ShapePanelProps) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className={styles.tray}>{this.props.children}</div>
    }
}
