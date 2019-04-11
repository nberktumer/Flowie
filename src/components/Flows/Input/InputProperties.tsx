import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {Rules} from "../../../config"

export class InputProperties extends BaseProperties {

    constructor(props: BasePropertiesProps) {
        super(props)

        this.state = {
            variableName: "",
            variableType: ""
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
                    onChange={this.handleStringChange("variableName")}
                    margin="normal"
                />
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.dataType}
                    value={this.state.variableType}
                    onChange={this.handleStringChange("variableType")}
                    margin="normal"
                >
                    {Object.keys(VariableType).map((key: any) => (
                        <MenuItem key={key} value={VariableType[key]}>
                            {VariableType[key]}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        )
    }
}
