import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {Rules} from "../../../config"
import {AssignmentFlowNode} from "./AssignmentFlowNode"
import InputWithType from "../../InputWithType/InputWithType"
import {Validator} from "../../../utils"

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
                value: node.getVariable().value,
                isNull: node.getVariable().value === "NULL",
                variable: node.getVariable()
            }
        } else {
            this.state = {
                variableName: "",
                variableType: "",
                value: "",
                isNull: false,
                variable: null
            }
        }
    }

    render() {
        return (
            <div className="bodyContainer">
                <TextField
                    id="variable-name-input"
                    label={strings.variableName}
                    disabled={this.props.readonlyType}
                    error={this.state.errorField === "variableName"}
                    value={this.state.variableName}
                    inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                    onChange={this.handleStringChange("variableName", (data) => {
                        const error = Validator.validateVariableName(data, this.props.variables)
                        this.setState({errorMessage: error, errorField: error ? "variableName" : ""}, () => {
                            this.props.onDataChanged(this.state)
                        })
                    })}
                    margin="normal"
                />
                <TextField
                    id="data-type-selector"
                    select
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
                        this.setState({value: data.value, isNull: data.isNull}, () => {
                            this.props.onDataChanged(this.state)
                        })
                    }}
                    value={this.state.value}
                    hide={this.state.variableType === ""}/>
            </div>
        )
    }
}
