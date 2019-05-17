import React, {Component} from "react"
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@material-ui/core"
import {DialogProps} from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button"
import strings from "../../lang"
import styles from "./AddNodeDialog.module.css"
import {BasePropertiesState} from "../Flows/Base/BaseProperties"
import {FlowType} from "../../models"
import {FlowPropertiesFactory} from "../Flows"

export interface AddNodeDialogProps extends DialogProps {
    onSaveClick: (data: BasePropertiesState | null) => void,
    onDismissClick: () => void,
    type: FlowType | null,
    file: boolean
}

export interface AddNodeDialogState {
    bodyData: BasePropertiesState | null,
    enableSaveButton: boolean
}

export class AddNodeDialog extends Component<AddNodeDialogProps, AddNodeDialogState> {
    static defaultProps = {
        file: false
    }

    constructor(props: AddNodeDialogProps) {
        super(props)

        this.state = {
            bodyData: null,
            enableSaveButton: false
        }
    }

    onBodyChanged(data: BasePropertiesState) {
        this.setState({bodyData: data})
    }

    isValidListener(isValid: boolean) {
        this.setState({enableSaveButton: isValid})
    }

    onSave() {
        this.setState({bodyData: null, enableSaveButton: false})
        if (this.props.onSaveClick != null)
            this.props.onSaveClick(this.state.bodyData)
    }

    onDismiss() {
        this.setState({bodyData: null, enableSaveButton: false})
        if (this.props.onDismissClick != null)
            this.props.onDismissClick()
    }

    render() {
        return (
            <Dialog aria-labelledby="simple-dialog-title" {...this.props} onClose={(e) => {
                this.setState({bodyData: null, enableSaveButton: false})
                if (this.props.onClose)
                    this.props.onClose(e)
            }}>
                <DialogTitle id="simple-dialog-title">
                    {FlowPropertiesFactory.getTitleAndDescription(this.props.type).title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {FlowPropertiesFactory.getTitleAndDescription(this.props.type).contextText}
                    </DialogContentText>
                    <div className={styles.addNodeDialogBody}>
                        <Typography color="error">
                            {(this.state.bodyData && this.state.bodyData.errorMessage) ? this.state.bodyData.errorMessage : ""}
                        </Typography>
                        {this.props.file ?
                            FlowPropertiesFactory.createFileProperties(this.props.type, this.onBodyChanged.bind(this), (isValid) => this.isValidListener(isValid)) :
                            FlowPropertiesFactory.create(this.props.type, (data) => this.onBodyChanged(data), (isValid) => this.isValidListener(isValid))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.onDismiss.bind(this)}>
                        {strings.dismiss}
                    </Button>
                    <Button disabled={!this.state.enableSaveButton}
                            variant="contained"
                            color="primary"
                            onClick={this.onSave.bind(this)}>
                        {strings.save}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
