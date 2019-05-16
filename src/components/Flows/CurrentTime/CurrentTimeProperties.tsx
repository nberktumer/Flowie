import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {Rules} from "../../../config"
import {CurrentTimeFlowNode} from "./CurrentTimeFlowNode"
import {Validator} from "../../../utils"
import {FlowConsumer} from "../../../stores/FlowStore"
import {Variable} from "../../../models/Variable"
import {VariableType} from "../../../models"

export interface CurrentTimePropertiesProps extends BasePropertiesProps {
    readonlyType: boolean
}

export class CurrentTimeProperties extends BaseProperties<CurrentTimePropertiesProps> {
    static defaultProps = {
        readonlyType: false
    }

    constructor(props: CurrentTimePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as CurrentTimeFlowNode

            this.state = {
                variable: JSON.stringify(node.getVariable()),
                variableName: node.getVariable().name,
                assignToVariableStatus: "assign"
            }
        } else {
            this.state = {
                variable: "",
                variableName: "",
                assignToVariableStatus: "new"
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.variable)
        }
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div className="bodyContainer">
                        <TextField
                            id="data-type-selector"
                            select
                            label={strings.assignToVariable}
                            value={this.state.assignToVariableStatus}
                            onChange={this.handleStringChange("assignToVariableStatus")}
                            margin="normal">
                            <MenuItem key={"new"} value={"new"}>
                                {strings.createNewVariable}
                            </MenuItem>
                            <MenuItem key={"assign"} value={"assign"}>
                                {strings.assignToVariable}
                            </MenuItem>
                        </TextField>
                        <TextField
                            id="variable-name-input"
                            fullWidth
                            label={strings.variableName}
                            error={this.state.errorField === "variableName"}
                            style={{display: this.state.assignToVariableStatus === "new" ? "flex" : "none"}}
                            value={this.state.variableName}
                            inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                            onChange={(e) => {
                                const error = Validator.validateVariableName(e.target.value, flowContext.variableList)
                                this.setState({
                                    variableName: e.target.value,
                                    variable: e.target.value ? JSON.stringify(new Variable(e.target.value, VariableType.LONG, undefined)) : "",
                                    errorMessage: error,
                                    errorField: error ? "variableName" : ""
                                }, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            margin="normal"/>
                        <TextField
                            id="variable-selector"
                            select
                            label={strings.assignToVariable}
                            value={this.state.variable}
                            style={{display: this.state.assignToVariableStatus === "new" ? "none" : "flex"}}
                            onChange={this.handleStringChange("variable")}
                            margin="normal">
                            {flowContext.variableList.filter((value) => {
                                return value.type === VariableType.LONG
                            }).map((value) => (
                                <MenuItem key={value.name} value={JSON.stringify(value)}>
                                    {value.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
