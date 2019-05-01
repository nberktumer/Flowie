import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {VariableType} from "../../../models"
import {ConditionOperation} from "../../../models/VariableEnums"
import {WhileFlowNode} from "./WhileFlowNode"

export interface WhilePropertiesProps extends BasePropertiesProps {
    variables: Variable[]
}

export class WhileProperties extends BaseProperties<WhilePropertiesProps> {

    constructor(props: WhilePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as WhileFlowNode

            // TODO: Change this to handle all conditions
            this.state = {
                variableType: node.conditionList[0].variableType,
                first: JSON.stringify(node.conditionList[0].first),
                second: JSON.stringify(node.conditionList[0].second),
                operation: node.conditionList[0].operation
            }
        } else {
            this.state = {
                variableType: "",
                first: "",
                second: "",
                operation: ""
            }
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
