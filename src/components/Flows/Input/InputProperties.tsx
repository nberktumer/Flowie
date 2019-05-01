import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {Rules} from "../../../config"
import {InputFlowNode} from "./InputFlowNode"

export interface InputPropertiesProps extends BasePropertiesProps {
    readonlyType: boolean
}

export class InputProperties extends BaseProperties<InputPropertiesProps> {
    static defaultProps = {
        readonlyType: false
    }

    constructor(props: InputPropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as InputFlowNode

            this.state = {
                variableName: node.getVariable().name,
                variableType: node.getVariable().type,
                variable: node.getVariable()
            }
        } else {
            this.state = {
                variableName: "",
                variableType: "",
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
                    error={this.state.errorMessage === strings.variableExists}
                    value={this.state.variableName}
                    inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                    onChange={this.handleStringChange("variableName", (data) => {
                        const hasError = this.props.variables.find((item) => item.name === data)

                        const errorMessage = hasError ? strings.variableExists : undefined
                        this.setState({errorMessage}, () => {
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
                    onChange={this.handleStringChange("variableType")}
                    margin="normal">
                    {Object.keys(VariableType).map((key: any) => (
                        <MenuItem key={key} value={VariableType[key]}>
                            {VariableType[key]}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        )
    }
}
