import React, {Component} from "react"

export interface BaseDialogBodyProps {
    onDataChanged: (data: BaseDialogBodyState) => void
}

export interface BaseDialogBodyState {
    [index: string]: any
}

export class BaseDialogBody<T extends BaseDialogBodyProps = BaseDialogBodyProps, U extends BaseDialogBodyState = BaseDialogBodyState> extends Component<T, U> {

    handleChange = (key: string) => (event: any) => {
        this.setState({[key]: event.target.value}, () => {
            this.props.onDataChanged(this.state)
        })
    }
}
