import React from "react"
import styles from "./ShapePanel.module.css"
import {Card, CardHeader} from "@material-ui/core"

export interface IShapeItemProps {
    model: any;
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
            <Card draggable={true}
                  onDragStart={(event) => {
                      event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model))
                  }}
                  className={styles.trayItem}>
                <CardHeader titleTypographyProps={{variant: "subtitle1"}} style={{paddingLeft: 8, paddingRight: 8, paddingTop: 0, paddingBottom: 0}} title={this.props.name}/>
            </Card>
        )
    }
}
