import React from "react"
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {ConditionOperation} from "../../../models/VariableEnums"
import {WhileFlowNode} from "./WhileFlowNode"
import InputWithType from "../../InputWithType/InputWithType"
import {Variable} from "../../../models/Variable"

export class WhileProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as WhileFlowNode

            // TODO: Change this to handle all conditions
            this.state = {
                variableType: node.conditionList[0].variableType,
                first: JSON.stringify(node.conditionList[0].first),
                second: JSON.stringify(node.conditionList[0].second),
                operation: node.conditionList[0].operation,
                op2initialValue: node.conditionList[0].second.value,
                isOp2Constant: node.conditionList[0].second.name === undefined
            }
        } else {
            this.state = {
                variableType: "",
                first: "",
                second: "",
                operation: "",
                isOp2Constant: false,
                op2initialValue: ""
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
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <TextField
                        id="data-type-selector"
                        select
                        style={{flex: 1, display: this.state.isOp2Constant ? "none" : "flex"}}
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
                    <InputWithType
                        variableType={this.state.variableType}
                        onDataChanged={(data: any) => {
                            this.setState({second: JSON.stringify(new Variable(undefined, this.state.variableType, data.value))}, () => {
                                this.props.onDataChanged(this.state)
                            })
                        }}
                        value={this.state.op2initialValue}
                        hide={!this.state.isOp2Constant}/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.isOp2Constant}
                                onChange={this.handleBooleanChange("isOp2Constant", () => {
                                    this.setState({second: JSON.stringify(new Variable(undefined, this.state.variableType, this.state.op2initialValue))}, () => {
                                        this.props.onDataChanged(this.state)
                                    })
                                })}
                                value="true"
                                color="primary"
                            />
                        }
                        label={this.state.isOp2Constant ? strings.constant : strings.variable}
                    />
                </div>

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
