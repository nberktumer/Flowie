import * as React from "react"
import {BaseWidget, BaseWidgetProps, PortWidget} from "storm-react-diagrams"
import {DefaultPortModel} from "./DefaultPortModel"
import {DefaultPortType} from "./DefaultPortType"

export interface DefaultPortLabelProps extends BaseWidgetProps {
    model: DefaultPortModel;
}

export interface DefaultPortLabelState {
}

/**
 * @author Dylan Vorster
 */
export class DefaultPortLabel extends BaseWidget<DefaultPortLabelProps, DefaultPortLabelState> {
    constructor(props: DefaultPortLabelProps) {
        super("srd-default-port", props)
    }

    getClassName() {
        return super.getClassName() + (this.props.model.portType === DefaultPortType.IN ? this.bem("--in") : this.bem("--out"))
    }

    render() {
        const port = <PortWidget node={this.props.model.getParent()} name={this.props.model.name}/>
        const label = <div className="name">{this.props.model.label}</div>

        return (
            <div {...this.getProps()}>
                {this.props.model.portType === DefaultPortType.IN ? port : label}
                {this.props.model.portType === DefaultPortType.IN ? label : port}
            </div>
        )
    }
}
