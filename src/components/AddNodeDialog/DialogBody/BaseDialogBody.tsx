import React, {Component} from "react"

export interface BaseDialogBodyProps {
    onDataChanged: (data: BaseDialogBodyState) => void
}

export interface BaseDialogBodyState {
    [index: string]: string
}

export class BaseDialogBody extends Component<BaseDialogBodyProps, BaseDialogBodyState> {

    handleChange = (key: string) => (event: any) => {
        this.setState({[key]: event.target.value}, () => {
            this.props.onDataChanged(this.state)
        })
    }
}
