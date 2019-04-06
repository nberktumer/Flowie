import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseDialogBody, BaseDialogBodyProps} from "./BaseDialogBody"
import {Variable} from "../../../models/Variable"
import {ArithmeticOperationType} from "../../../models"

export interface AddArithmeticDialogBodyProps extends BaseDialogBodyProps {
    variables: Variable[]
}

export class AddArithmeticDialogBody extends BaseDialogBody<AddArithmeticDialogBodyProps> {

    constructor(props: AddArithmeticDialogBodyProps) {
        super(props)

        this.state = {
            variable: "",
            operation: "",
            operator1: "",
            operator2: ""
        }
    }

    render() {
        return (
            <div className="bodyContainer">
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.variable}
                    value={this.state.variable}
                    onChange={this.handleChange("variable")}
                    margin="normal">
                    <MenuItem key="__select__" value="">
                        {strings.select}
                    </MenuItem>
                    {this.props.variables.filter((value) => {
                        return value.type.toString() === "INT"
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
                    onChange={this.handleChange("operation")}
                    margin="normal">
                    <MenuItem key="__select__" value="">
                        {strings.select}
                    </MenuItem>
                    {Object.keys(ArithmeticOperationType).map((value: any) => (
                        <MenuItem key={value} value={value}>
                            {ArithmeticOperationType[value]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.firstOperator}
                    value={this.state.operator1}
                    onChange={this.handleChange("operator1")}
                    margin="normal">
                    <MenuItem key="__select__" value="">
                        {strings.select}
                    </MenuItem>
                    {this.props.variables.filter((value) => {
                        return value.type.toString() === "INT"
                    }).map((value) => (
                        <MenuItem key={value.name} value={JSON.stringify(value)}>
                            {value.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.secondOperator}
                    value={this.state.operator2}
                    onChange={this.handleChange("operator2")}
                    margin="normal">
                    <MenuItem key="__select__" value="">
                        {strings.select}
                    </MenuItem>
                    {this.props.variables.filter((value) => {
                        return value.type.toString() === "INT"
                    }).map((value) => (
                        <MenuItem key={value.name} value={JSON.stringify(value)}>
                            {value.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        )
    }
}
