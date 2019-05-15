import React from "react"
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {ArithmeticOperationType, VariableType} from "../../../models"
import {ArithmeticFlowNode} from "./ArithmeticFlowNode"
import InputWithType from "../../InputWithType/InputWithType"
import {Variable} from "../../../models/Variable"
import {FlowConsumer} from "../../../stores/FlowStore"

export class ArithmeticProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as ArithmeticFlowNode

            this.state = {
                variable: JSON.stringify(node.getVariable()),
                operation: node.getOperation(),
                operator1: JSON.stringify(node.getOperator1()),
                operator2: JSON.stringify(node.getOperator2()),
                isOp2Constant: node.getOperator2().name === undefined,
                op2initialValue: node.getOperator2().value
            }
        } else {
            this.state = {
                variable: "",
                operation: "",
                operator1: "",
                operator2: "",
                isOp2Constant: false,
                op2initialValue: ""
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.variable
                && nextState.operation
                && nextState.operator1
                && ((nextState.isOp2Constant && nextState.operator2 && JSON.parse(nextState.operator2).value)
                    || (!nextState.isOp2Constant && nextState.operator2)
                ))
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
                            label={strings.variable}
                            value={this.state.variable}
                            onChange={this.handleStringChange("variable")}
                            margin="normal">
                            {flowContext.variableList.filter((value) => {
                                return value.type === VariableType.INT || value.type === VariableType.DOUBLE || value.type === VariableType.LONG
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
                            {flowContext.variableList.filter((value) => {
                                return value.type === VariableType.INT || value.type === VariableType.DOUBLE || value.type === VariableType.LONG
                            }).map((value) => (
                                <MenuItem key={value.name}
                                          value={JSON.stringify(new Variable(value.name, value.type, value.value))}>
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
                                label={strings.secondOperator}
                                value={this.state.operator2}
                                onChange={this.handleStringChange("operator2")}
                                margin="normal">
                                {flowContext.variableList.filter((value) => {
                                    return value.type === VariableType.INT || value.type === VariableType.DOUBLE || value.type === VariableType.LONG
                                }).map((value) => (
                                    <MenuItem key={value.name}
                                              value={JSON.stringify(new Variable(value.name, value.type, value.value))}>
                                        {value.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <InputWithType
                                variableType={VariableType.INT}
                                onDataChanged={(data: any) => {
                                    this.setState({operator2: JSON.stringify(new Variable(undefined, VariableType.INT, data.value))}, () => {
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
                                            this.setState({operator2: null}, () => {
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
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
