import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../../Base/BaseProperties"
import {NewListFlowNode} from "./NewListFlowNode"
import {FlowConsumer} from "../../../../stores/FlowStore"
import _ from "lodash"
import {Rules} from "../../../../config"
import {Validator} from "../../../../utils"
import {VariableType} from "../../../../models"

export interface AssignmentPropertiesProps extends BasePropertiesProps {
    readonlyType: boolean
}

export class NewListProperties extends BaseProperties<AssignmentPropertiesProps> {
    static defaultProps = {
        readonlyType: false
    }

    constructor(props: AssignmentPropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as NewListFlowNode

            this.state = {
                variableName: node.getVariable().name,
                variableType: node.getVariable().type
            }
        } else {
            this.state = {
                variableName: "",
                variableType: ""
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.variableName
                && nextState.variableType)
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
                            onChange={this.handleStringChange("variableType")}
                            margin="normal">
                            {Object.keys(VariableType).filter((value: any) => {
                                return VariableType[value] !== VariableType.NONE && VariableType[value] !== VariableType.MAIN_ARG
                            }).map((key: any) => (
                                <MenuItem key={key} value={VariableType[key]}>
                                    {VariableType[key]}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
