import React, {Component} from "react"
import {Dialog, DialogTitle} from "@material-ui/core"
import {DialogProps} from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button"
import strings from "../../lang"
import styles from "./AddNodeDialog.module.css"
import {AddVariableDialogBody} from "./DialogBody/AddVariableDialogBody"
import {BaseDialogBodyState} from "./DialogBody/BaseDialogBody"
import {AddWhileDialogBody} from "./DialogBody/AddWhileDialogBody"
import {Variable} from "../../models/Variable"
import {FlowType} from "../../models"
import {AddArithmeticDialogBody} from "./DialogBody/AddArithmeticDialogBody"
import {AddOutputDialogBody} from "./DialogBody/AddOutputDialogBody"
import {AddInputDialogBody} from "./DialogBody/AddInputDialogBody"

export interface AddNodeDialogProps extends DialogProps {
    type: FlowType | null,
    onSaveClick: (data: BaseDialogBodyState | null) => void,
    onDismissClick: () => void,
    variables: Variable[]
}

export interface AddNodeDialogState {
    bodyData: BaseDialogBodyState | null
}

export class AddNodeDialog extends Component<AddNodeDialogProps, AddNodeDialogState> {
    static defaultProps = {
        variables: []
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

    onSave() {
        if (this.props.onSaveClick != null)
            this.props.onSaveClick(this.state.bodyData)
    }

    onDismiss() {
        if (this.props.onDismissClick != null)
            this.props.onDismissClick()
    }

    getDialogBody() {
        switch (this.props.type) {
            case FlowType.WHILE:
                return (<AddWhileDialogBody variables={this.props.variables}
                                            onDataChanged={this.onBodyChanged.bind(this)}/>)
            case FlowType.ARITHMETIC:
                return (<AddArithmeticDialogBody variables={this.props.variables}
                                                 onDataChanged={this.onBodyChanged.bind(this)}/>)
            case FlowType.ASSIGNMENT:
                return (<AddVariableDialogBody onDataChanged={this.onBodyChanged.bind(this)}/>)
            case FlowType.INPUT:
                return (<AddInputDialogBody onDataChanged={this.onBodyChanged.bind(this)}/>)
            case FlowType.OUTPUT:
                return (<AddOutputDialogBody variables={this.props.variables}
                                             onDataChanged={this.onBodyChanged.bind(this)}/>)
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
