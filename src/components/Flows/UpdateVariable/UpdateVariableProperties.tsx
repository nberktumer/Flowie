import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {UpdateVariableFlowNode} from "./UpdateVariableFlowNode"
import InputWithType from "../../InputWithType/InputWithType"
import {FlowConsumer} from "../../../stores/FlowStore"
import {Variable} from "../../../models/Variable"
import {VariableType} from "../../../models"

export class UpdateVariableProperties extends BaseProperties {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as UpdateVariableFlowNode

            this.state = {
                variable: JSON.stringify(node.variable),
                variableName: node.variable.name,
                variableValue: JSON.stringify(node.variableValue),
                variableType: node.variable.type,
                initialVariableValue: node.variableValue.value,
                assignToVariableStatus: node.variableValue.name ? "variable" : "constant"
            }
        } else {
            this.state = {
                variable: "",
                variableName: "",
                variableValue: "",
                variableType: "",
                initialVariableValue: "",
                assignToVariableStatus: "variable"
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
                            id="variable-selector"
                            select
                            fullWidth
                            label={strings.assignToVariable}
                            value={this.state.variable}
                            style={{display: this.state.assignToVariableStatus === "new" ? "none" : "flex"}}
                            onChange={this.handleStringChange("variable", (data) => {
                                const variable = JSON.parse(data) as Variable
                                this.setState({variableType: variable.type, variableName: variable.name})
                            })}
                            margin="normal">
                            {flowContext.variableList.map((value) => (
                                <MenuItem key={value.name} value={JSON.stringify(value)}>
                                    {value.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="data-type-selector"
                            select
                            fullWidth
                            label={strings.constantVariable}
                            value={this.state.assignToVariableStatus}
                            onChange={this.handleStringChange("assignToVariableStatus")}
                            margin="normal">
                            <MenuItem key={"constant"} value={"constant"}>
                                {strings.constant}
                            </MenuItem>
                            <MenuItem key={"variable"} value={"variable"}>
                                {strings.variable}
                            </MenuItem>
                        </TextField>
                        <InputWithType
                            variableType={this.state.variableType}
                            onDataChanged={(data: any) => {
                                this.setState({variableValue: JSON.stringify(new Variable(undefined, this.state.variableType, data.value))}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            value={this.state.initialVariableValue}
                            hide={this.state.assignToVariableStatus !== "constant" || !this.state.variable}/>
                        <TextField
                            id="variable-selector"
                            select
                            fullWidth
                            label={strings.assignFromVariable}
                            value={this.state.variableValue}
                            style={{display: this.state.assignToVariableStatus === "constant" || !this.state.variable ? "none" : "flex"}}
                            onChange={this.handleStringChange("variableValue")}
                            margin="normal">
                            {flowContext.variableList.filter((item: Variable) => {
                                return item.type === this.state.variableType as VariableType && item.name !== this.state.variableName
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
