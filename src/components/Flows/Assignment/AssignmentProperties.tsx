import React from "react"
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {Rules} from "../../../config"

export class AssignmentProperties extends BaseProperties {

    constructor(props: BasePropertiesProps) {
        super(props)

        this.state = {
            variableName: "",
            variableType: "",
            value: "",
            isNull: false
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
                    onChange={this.handleStringChange("variableType", (value) => {
                        this.setState({value: ""})
                    })}
                    margin="normal">
                    {Object.keys(VariableType).map((key: any) => (
                        <MenuItem key={key} value={VariableType[key]}>
                            {VariableType[key]}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{display: this.state.variableType !== "" ? "initial" : "none"}}>
                    <div
                        style={{
                            display: this.state.variableType !== VariableType.BOOLEAN ? "flex" : "none",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center",
                            textAlign: "center"
                        }}>
                        <TextField
                            style={{flex: 1}}
                            id="value-input"
                            label={strings.value}
                            value={this.state.isNull ? "NULL" : this.state.value}
                            type={this.state.variableType === VariableType.INT ? "number" : "text"}
                            onChange={this.handleStringChange("value")}
                            margin="normal"
                            disabled={this.state.isNull}
                        />
                        <FormControlLabel
                            style={{display: this.state.variableType === VariableType.STRING ? "inherit" : "none"}}
                            control={
                                <Checkbox
                                    checked={this.state.isNull}
                                    onChange={this.handleBooleanChange("isNull", (value: boolean) => {
                                        this.setState({value: value ? "NULL" : ""})
                                    })}
                                    value="true"
                                    color="primary"/>
                            }
                            label="NULL"
                        />
                    </div>
                    <TextField
                        style={{display: this.state.variableType === VariableType.BOOLEAN ? "flex" : "none"}}
                        id="boolean-value-input"
                        select
                        label={strings.value}
                        value={this.state.value}
                        onChange={this.handleStringChange("value")}
                        margin="normal">
                        <MenuItem key={"true"} value={"true"}>
                            True
                        </MenuItem>
                        <MenuItem key={"false"} value={"false"}>
                            False
                        </MenuItem>
                    </TextField>
                </div>
            </div>
        )
    }
}
