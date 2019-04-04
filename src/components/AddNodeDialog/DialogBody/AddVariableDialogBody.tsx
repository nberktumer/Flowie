import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseDialogBody, BaseDialogBodyProps} from "./BaseDialogBody"
import {Rules} from "../../../config"
import {DataType} from "../../../models"

export class AddVariableDialogBody extends BaseDialogBody {

    constructor(props: BaseDialogBodyProps) {
        super(props)

        this.state = {
            variableName: "",
            dataType: "NUMBER",
            value: ""
        }
    }

    render() {
        return (
            <div className="bodyContainer">
                <TextField
                    id="variable-name-input"
                    label={strings.variableName}
                    value={this.state.variableName}
                    inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                    onChange={this.handleChange("variableName")}
                    margin="normal"
                />
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.dataType}
                    value={this.state.dataType}
                    onChange={this.handleChange("dataType")}
                    margin="normal"
                >
                    {Object.keys(DataType).map((key: any) => (
                        <MenuItem key={key} value={key}>
                            {DataType[key]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="value-input"
                    label={strings.value}
                    value={this.state.value}
                    inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                    onChange={this.handleChange("value")}
                    margin="normal"
                />
            </div>
        )
    }
}
