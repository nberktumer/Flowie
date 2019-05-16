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
                value: node.getVariable().value
            }
        } else {
            this.state = {
                variableName: "",
                variableType: "",
                value: ""
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
                                const error = Validator.validateVariableName(data, _.merge(flowContext.variableList, flowContext.argList))
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
                            {Object.keys(VariableType).map((key: any) => (
                                <MenuItem key={key} value={VariableType[key]}>
                                    {VariableType[key]}
                                </MenuItem>
                            ))}
                        </TextField>
                        <InputWithType
                            variableType={this.state.variableType}
                            onDataChanged={(data: any) => {
                                this.setState({value: data.value}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            value={this.state.value}
                            hide={this.state.variableType === ""}/>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
