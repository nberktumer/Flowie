import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {ArithmeticOperationType, VariableType} from "../../../models"
import {ArithmeticFlowNode} from "./ArithmeticFlowNode"
import {Operator, OperatorType} from "../../../generator/flows/ArithmeticFlow"

export interface ArithmeticPropertiesProps extends BasePropertiesProps {
    variables: Variable[]
}

export class ArithmeticProperties extends BaseProperties<ArithmeticPropertiesProps> {

    constructor(props: ArithmeticPropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as ArithmeticFlowNode

            this.state = {
                variable: JSON.stringify(node.getVariable()),
                operation: node.getOperation(),
                operator1: JSON.stringify(node.getOperator1()),
                operator2: JSON.stringify(node.getOperator2())
            }
        } else {
            this.state = {
                variable: "",
                operation: "",
                operator1: "",
                operator2: ""
            }
        }
    }

    render() {
        return (
            <div className="bodyContainer">
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.variable}
                    value={this.state.variable}
                    onChange={this.handleStringChange("variable")}
                    margin="normal">
                    {this.props.variables.filter((value) => {
                        return value.type === VariableType.INT
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
                    {Object.keys(ArithmeticOperationType).map((value: any) => (
                        <MenuItem key={value} value={ArithmeticOperationType[value]}>
                            {ArithmeticOperationType[value]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.firstOperator}
                    value={this.state.operator1}
                    onChange={this.handleStringChange("operator1")}
                    margin="normal">
                    {this.props.variables.filter((value) => {
                        return value.type === VariableType.INT
                    }).map((value) => (
                        <MenuItem key={value.name} value={JSON.stringify(new Operator(OperatorType.VARIABLE, value.name, value.value))}>
                            {value.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="data-type-selector"
                    select
                    label={strings.secondOperator}
                    value={this.state.operator2}
                    onChange={this.handleStringChange("operator2")}
                    margin="normal">
                    {this.props.variables.filter((value) => {
                        return value.type === VariableType.INT
                    }).map((value) => (
                        <MenuItem key={value.name} value={JSON.stringify(new Operator(OperatorType.VARIABLE, value.name, value.value))}>
                            {value.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        )
    }
}
