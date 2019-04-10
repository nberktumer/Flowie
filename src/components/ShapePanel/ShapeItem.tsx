import React from "react"
import styles from "./ShapePanel.module.css"

export interface IShapeItemProps {
    model: any;
    color?: string;
    name: string;
}

export interface IShapeItemState {
}

export class ShapeItem extends React.Component<IShapeItemProps, IShapeItemState> {
    constructor(props: IShapeItemProps) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div
                style={{borderColor: this.props.color}}
                draggable={true}
                onDragStart={(event) => {
                    event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model))
                }}
                className={styles.trayItem}>
                {this.props.name}
            </div>
        )
    }
}
