import * as React from "react"
import {TriangleNodeModel} from "./TriangleNodeModel"
import {PortWidget} from "storm-react-diagrams"

export interface ITriangleNodeWidgetProps {
    node: TriangleNodeModel;
    size: number;
}

export interface ITriangleNodeWidgetState {
}

export class TriangleNodeWidget extends React.Component<ITriangleNodeWidgetProps, ITriangleNodeWidgetState> {

    constructor(props: ITriangleNodeWidgetProps) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div
                className={"triangle-node"}
                style={{
                    position: "relative",
                    width: this.props.size,
                    height: this.props.size
                }}>
                <svg
                    width={this.props.size}
                    height={this.props.size}
                    dangerouslySetInnerHTML={{
                        __html: `<g id="Layer_1" />
                                <g id="Layer_2">
                                    <polygon 
                                        fill="purple" 
                                        stroke="#000000" 
                                        stroke-width="2" 
                                        stroke-miterlimit="10" 
                                        points="10,` + this.props.size / 2
                            + ` ` + this.props.size + `,10 `
                            + ` ` + this.props.size + `,` + (this.props.size - 10) + ` "/>
                                </g>`
                    }}
                />
                <div style={{
                    position: "absolute",
                    zIndex: 10,
                    top: this.props.size / 2 - 8,
                    left: -8
                }}>
                    <PortWidget name="left" node={this.props.node}/>
                </div>
                <div style={{
                    position: "absolute",
                    zIndex: 10,
                    left: this.props.size - 8,
                    top: -8
                }}>
                    <PortWidget name="top" node={this.props.node}/>
                </div>
                <div style={{
                    position: "absolute",
                    zIndex: 10,
                    left: this.props.size - 8,
                    top: this.props.size - 8
                }}>
                    <PortWidget name="bottom" node={this.props.node}/>
                </div>
            </div>
        )
    }
}
