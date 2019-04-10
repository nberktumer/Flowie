import React, {Component} from "react"

export interface BaseDialogBodyProps {
    onDataChanged: (data: BaseDialogBodyState) => void
}

export interface BaseDialogBodyState {
    [index: string]: any
}

export class BaseDialogBody<T extends BaseDialogBodyProps = BaseDialogBodyProps, U extends BaseDialogBodyState = BaseDialogBodyState> extends Component<T, U> {

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
