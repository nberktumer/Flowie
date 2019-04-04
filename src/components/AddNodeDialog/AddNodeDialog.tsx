import React, {Component} from "react"
import {Dialog, DialogTitle} from "@material-ui/core"
import {DialogProps} from "@material-ui/core/Dialog"
import {Operations} from "../../models"
import Button from "@material-ui/core/Button"
import strings from "../../lang"
import styles from "./AddNodeDialog.module.css"
import {AddVariableDialogBody} from "./DialogBody/AddVariableDialogBody"
import {BaseDialogBodyState} from "./DialogBody/BaseDialogBody"
import {AddWhileDialogBody} from "./DialogBody/AddWhileDialogBody"
import {Variable} from "../../models/Variable"

export interface AddNodeDialogProps extends DialogProps {
    type: Operations | null,
    onSaveClick: (data: BaseDialogBodyState | null) => void,
    onDismissClick: () => void,
    variableList: Variable[]
}

export interface AddNodeDialogState {
    bodyData: BaseDialogBodyState | null
}

export class AddNodeDialog extends Component<AddNodeDialogProps, AddNodeDialogState> {
    static defaultProps = {
        variableList: []
    }

    constructor(props: AddNodeDialogProps) {
        super(props)

        this.state = {
            bodyData: null
        }
    }

    onBodyChanged(data: BaseDialogBodyState) {
        this.setState({bodyData: data})
    }

    onSave(event: any) {
        if (this.props.onSaveClick != null)
            this.props.onSaveClick(this.state.bodyData)
    }

    onDismiss(event: any) {
        if (this.props.onDismissClick != null)
            this.props.onDismissClick()
    }

    getDialogBody() {
        switch (this.props.type) {
            case Operations.WHILE:
                return (<AddWhileDialogBody variableList={this.props.variableList}
                                            onDataChanged={this.onBodyChanged.bind(this)}/>)
            case Operations.FOR:
                return (<div/>)
            case Operations.IF:
                return (<div/>)
            case Operations.VARIABLE:
                return (<AddVariableDialogBody onDataChanged={this.onBodyChanged.bind(this)}/>)
            case Operations.SWITCH:
                return (<div/>)
            default:
                return (<div/>)
        }
    }

    renderDialogBody() {
        return (
            <div className={styles.addNodeDialogBody}>
                {this.getDialogBody()}
            </div>
        )
    }

    render() {
        return (
            <Dialog aria-labelledby="simple-dialog-title" {...this.props}>
                <DialogTitle id="simple-dialog-title">Set Properties</DialogTitle>
                {this.renderDialogBody()}
                <div className={styles.addNodeDialogButtonContainer}>
                    <Button variant="contained" color="secondary" onClick={this.onDismiss.bind(this)}>
                        {strings.dismiss}
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.onSave.bind(this)}>
                        {strings.save}
                    </Button>
                </div>
            </Dialog>
        )
    }
}
