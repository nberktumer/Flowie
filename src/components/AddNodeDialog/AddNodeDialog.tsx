import React, {Component} from "react"
import {Dialog, DialogTitle, Typography} from "@material-ui/core"
import {DialogProps} from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button"
import strings from "../../lang"
import styles from "./AddNodeDialog.module.css"
import {BasePropertiesState} from "../Flows/Base/BaseProperties"
import {Variable} from "../../models/Variable"
import {FlowType} from "../../models"
import {FlowPropertiesFactory} from "../Flows"

export interface AddNodeDialogProps extends DialogProps {
    onSaveClick: (data: BasePropertiesState | null) => void,
    onDismissClick: () => void,
    type: FlowType | null,
    variables: Variable[]
}

export interface AddNodeDialogState {
    bodyData: BasePropertiesState | null
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

    onBodyChanged(data: BasePropertiesState) {
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

    render() {
        return (
            <Dialog aria-labelledby="simple-dialog-title" {...this.props}>
                <DialogTitle id="simple-dialog-title">Set Properties</DialogTitle>
                <div className={styles.addNodeDialogBody}>
                    <Typography color="error">
                        {(this.state.bodyData && this.state.bodyData.errorMessage) ? this.state.bodyData.errorMessage : ""}
                    </Typography>
                    {FlowPropertiesFactory.create(this.props.type, this.props.variables, this.onBodyChanged.bind(this))}
                </div>
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
