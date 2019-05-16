import React from "react"
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {ArithmeticOperationType, VariableType} from "../../../models"
import {ArithmeticFlowNode} from "./ArithmeticFlowNode"
import InputWithType from "../../InputWithType/InputWithType"
import {Variable} from "../../../models/Variable"
import {FlowConsumer} from "../../../stores/FlowStore"
import {SignConverter, Validator} from "../../../utils"
import {Rules} from "../../../config"

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
                op2initialValue: node.getOperator2().value,
                variableName: "",
                variableType: node.getVariable().type,
                assignToVariableStatus: "assign"
            }
        } else {
            this.state = {
                variable: "",
                operation: "",
                operator1: "",
                operator2: "",
                isOp2Constant: false,
                op2initialValue: "",
                variableName: "",
                variableType: VariableType.INT,
                assignToVariableStatus: "new"
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
                                    variable: e.target.value ? JSON.stringify(new Variable(e.target.value, this.state.variableType, undefined)) : "",
                                    errorMessage: error,
                                    errorField: error ? "variableName" : ""
                                }, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            margin="normal"/>
                        <TextField
                            id="variable-type-input"
                            fullWidth
                            select
                            label={strings.variableType}
                            error={this.state.errorField === "variableType"}
                            style={{display: this.state.assignToVariableStatus === "new" ? "flex" : "none"}}
                            value={this.state.variableType}
                            onChange={this.handleStringChange("variableType")}
                            margin="normal">
                            {Object.keys(VariableType).filter((item: any) => {
                                return VariableType[item] === VariableType.INT || VariableType[item] === VariableType.DOUBLE || VariableType[item] === VariableType.LONG
                            }).map((key: any) => (
                                <MenuItem key={key} value={VariableType[key]}>
                                    {VariableType[key]}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="data-type-selector"
                            select
                            label={strings.assignToVariable}
                            value={this.state.variable}
                            style={{display: this.state.assignToVariableStatus === "new" ? "none" : "flex"}}
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
                                    {SignConverter.arithmeticOperation(ArithmeticOperationType[value] as ArithmeticOperationType)}
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
