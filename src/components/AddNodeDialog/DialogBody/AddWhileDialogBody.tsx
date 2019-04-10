import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseDialogBody, BaseDialogBodyProps} from "./BaseDialogBody"
import {Variable} from "../../../models/Variable"
import {VariableType} from "../../../models"
import {ConditionOperation} from "../../../models/VariableEnums"

export interface WhileDialogBodyProps extends BaseDialogBodyProps {
    variables: Variable[]
}

export class AddWhileDialogBody extends BaseDialogBody<WhileDialogBodyProps> {

    constructor(props: WhileDialogBodyProps) {
        super(props)

        this.state = {
            variableType: "",
            first: "",
            second: "",
            operation: ""
        }
    }

    render() {
        return (
            <div className="bodyContainer">
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.variableType}
                    value={this.state.variableType}
                    onChange={this.handleStringChange("variableType")}
                    margin="normal">
                    {Object.keys(VariableType).map((value: any) => (
                        <MenuItem key={value} value={VariableType[value]}>
                            {VariableType[value]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.firstVariable}
                    value={this.state.first}
                    onChange={this.handleStringChange("first")}
                    margin="normal">
                    {this.props.variables.filter((value) => {
                        return value.type === this.state.variableType
                    }).map((value) => (
                        <MenuItem key={value.name} value={JSON.stringify(value)}>
                            {value.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.secondVariable}
                    value={this.state.second}
                    onChange={this.handleStringChange("second")}
                    margin="normal">
                    {this.props.variables.filter((value) => {
                        return value.type === this.state.variableType
                    }).map((value) => (
                        <MenuItem key={value.name} value={JSON.stringify(value)}>
                            {value.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.operation}
                    value={this.state.operation}
                    onChange={this.handleStringChange("operation")}
                    margin="normal">
                    {Object.keys(ConditionOperation).map((value: any) => (
                        <MenuItem key={value} value={ConditionOperation[value]}>
                            {ConditionOperation[value]}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        )
    }
}
