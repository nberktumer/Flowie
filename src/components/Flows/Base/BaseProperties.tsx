import React, {Component} from "react"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export interface BasePropertiesProps {
    onDataChanged: (data: BasePropertiesState) => void
    node?: BaseFlowNode
}

export interface BasePropertiesState {
    [index: string]: any
}

export abstract class BaseProperties<T extends BasePropertiesProps = BasePropertiesProps, U extends BasePropertiesState = BasePropertiesState> extends Component<T, U> {

    handleStringChange = (key: string, callback?: (value: string) => void) => (event: any) => {
        this.setState({[key]: event.target.value}, () => {
            this.props.onDataChanged(this.state)
            if (callback != null)
                callback(event.target.value)
        })
    }

    handleBooleanChange = (key: string, callback?: (value: boolean) => void) => (event: any) => {
        const val = event.target.checked
        this.setState({[key]: val}, () => {
            this.props.onDataChanged(this.state)
            if (callback != null)
                callback(val)
        })
    }
}
