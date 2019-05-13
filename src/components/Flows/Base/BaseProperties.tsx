import React, {Component} from "react"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export interface BasePropertiesProps {
    onDataChanged: (data: BasePropertiesState) => void,
    errorMessage?: string,
    errorField?: string,
    node?: BaseFlowNode
}

export interface BasePropertiesState {
    [index: string]: any
}

export abstract class BaseProperties<T extends BasePropertiesProps = BasePropertiesProps, U extends BasePropertiesState = BasePropertiesState> extends Component<T, U> {

    handleStringChange = (key: string, callback?: (value: string) => void) => (event: any) => {
        const value = event.target.value
        this.setState({[key]: value}, () => {
            this.props.onDataChanged(this.state)
            if (callback) {
                callback(value)
            }
        })
    }

    handleBooleanChange = (key: string, callback?: (value: boolean) => void) => (event: any) => {
        const value = event.target.checked
        this.setState({[key]: value}, () => {
            this.props.onDataChanged(this.state)
            if (callback)
                callback(value)
        })
    }
}
