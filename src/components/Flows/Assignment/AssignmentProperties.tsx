import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {Rules} from "../../../config"
import {AssignmentFlowNode} from "./AssignmentFlowNode"
import InputWithType from "../../InputWithType/InputWithType"

export class AssignmentProperties extends BaseProperties {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as AssignmentFlowNode

            this.state = {
                variableName: node.getVariable().name,
                variableType: node.getVariable().type,
                value: node.getVariable().value,
                isNull: node.getVariable().value === "NULL"
            }
        } else {
            this.state = {
                variableName: "",
                variableType: "",
                value: "",
                isNull: false
            }
        }
    }

    onDataChanged = (data: any) => {
        console.log(data)
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
                <InputWithType variableType={this.state.variableType}
                               onDataChanged={(data: any) => this.onDataChanged(data)}
                               hide={this.state.variableType === ""}/>
            </div>
        )
    }
}
