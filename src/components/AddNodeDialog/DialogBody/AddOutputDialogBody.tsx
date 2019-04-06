import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseDialogBody, BaseDialogBodyProps} from "./BaseDialogBody"
import {Variable} from "../../../models/Variable"

export interface AddOutputDialogBodyProps extends BaseDialogBodyProps {
    variables: Variable[]
}

export class AddOutputDialogBody extends BaseDialogBody<AddOutputDialogBodyProps> {

    constructor(props: AddOutputDialogBodyProps) {
        super(props)

        this.state = {
            variable: ""
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
                        return value.type === this.state.variableType
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
