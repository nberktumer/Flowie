import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {Rules} from "../../../config"
import {AssignmentFlowNode} from "./AssignmentFlowNode"
import InputWithType from "../../InputWithType/InputWithType"
import {Validator} from "../../../utils"
import {FlowConsumer} from "../../../stores/FlowStore"
import _ from "lodash"
import {Variable} from "../../../models/Variable"

export interface AssignmentPropertiesProps extends BasePropertiesProps {
    readonlyType: boolean
}

export class AssignmentProperties extends BaseProperties<AssignmentPropertiesProps> {
    static defaultProps = {
        readonlyType: false
    }

    constructor(props: AssignmentPropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as AssignmentFlowNode

            this.state = {
                variableName: node.getVariable().name,
                variableType: node.getVariable().type,
                value: node.getVariable().value instanceof Variable ? JSON.stringify(node.getVariable().value) : node.getVariable().value,
                assignToVariableStatus: node.getVariable().name ? "variable" : "constant"
            }
        } else {
            this.state = {
                variableName: "",
                variableType: "",
                value: "",
                assignToVariableStatus: "constant"
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.variableName
                && nextState.variableType
                && nextState.value)
        }
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div className="bodyContainer">
                        <TextField
                            id="variable-name-input"
                            fullWidth
                            label={strings.variableName}
                            disabled={this.props.readonlyType}
                            error={this.state.errorField === "variableName"}
                            value={this.state.variableName}
                            inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                            onChange={this.handleStringChange("variableName", (data) => {
                                const error = Validator.validateVariableName(data, _.concat(flowContext.variableList, flowContext.argList))
                                this.setState({errorMessage: error, errorField: error ? "variableName" : ""}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            })}
                            margin="normal"
                        />
                        <TextField
                            id="data-type-selector"
                            select
                            fullWidth
                            disabled={this.props.readonlyType}
                            label={strings.dataType}
                            value={this.state.variableType}
                            onChange={this.handleStringChange("variableType", () => {
                                this.setState({value: ""})
                            })}
                            margin="normal">
                            {Object.keys(VariableType).filter((value: any) => {
                                return VariableType[value] !== VariableType.NONE && VariableType[value] !== VariableType.MAIN_ARG
                            }).map((key: any) => (
                                <MenuItem key={key} value={VariableType[key]}>
                                    {VariableType[key]}
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
                                this.setState({value: JSON.stringify(new Variable(undefined, this.state.variableType, data.value))}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            value={this.state.value}
                            hide={this.state.variableType === "" || this.state.assignToVariableStatus === "variable"}/>
                        <TextField
                            id="variable-selector"
                            select
                            fullWidth
                            label={strings.assignFromVariable}
                            value={this.state.value}
                            style={{display: this.state.assignToVariableStatus === "constant" || !this.state.variableType ? "none" : "flex"}}
                            onChange={(e) => {
                                this.setState({
                                    value: e.target.value
                                }, () => this.props.onDataChanged(this.state))
                            }}
                            margin="normal">
                            {_.concat(flowContext.variableList, flowContext.argList).filter((item: Variable) => {
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
