import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../../Base/BaseProperties"
import {ListAddFlowNode} from "./ListAddFlowNode"
import InputWithType from "../../../InputWithType/InputWithType"
import {FlowConsumer} from "../../../../stores/FlowStore"
import _ from "lodash"
import {Variable} from "../../../../models/Variable"
import {VariableType} from "../../../../models"

export interface AssignmentPropertiesProps extends BasePropertiesProps {
    readonlyType: boolean
}

export class ListAddProperties extends BaseProperties<AssignmentPropertiesProps> {
    static defaultProps = {
        readonlyType: false
    }

    constructor(props: AssignmentPropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as ListAddFlowNode

            this.state = {
                list: JSON.stringify(node.list),
                listType: node.list.type,
                variable: JSON.stringify(node.variable),
                isConstant: node.variable.name ? "variable" : "constant",
                initialValue: node.variable.value
            }
        } else {
            this.state = {
                list: "",
                listType: "",
                variable: "",
                isConstant: "constant",
                initialValue: ""
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.list
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
                            fullWidth
                            label={strings.dataType}
                            value={this.state.list}
                            onChange={this.handleStringChange("list", () => {
                                this.setState({listType: (JSON.parse(this.state.list) as Variable).listElementType}, () => this.props.onDataChanged(this.state))
                            })}
                            margin="normal">
                            {_.concat(flowContext.variableList, flowContext.argList).filter((variable: Variable) => {
                                return variable.type === VariableType.LIST
                            }).map((variable: Variable) => (
                                <MenuItem key={variable.name} value={JSON.stringify(variable)}>
                                    {variable.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="data-type-selector"
                            select
                            fullWidth
                            label={strings.constantVariable}
                            value={this.state.isConstant}
                            onChange={this.handleStringChange("isConstant", () => {
                                this.setState({variable: ""})
                            })}
                            margin="normal">
                            <MenuItem key={"constant"} value={"constant"}>
                                {strings.constant}
                            </MenuItem>
                            <MenuItem key={"variable"} value={"variable"}>
                                {strings.variable}
                            </MenuItem>
                        </TextField>

                        <TextField
                            id="variable-selector"
                            select
                            fullWidth
                            style={{display: this.state.isConstant === "constant" ? "none" : "flex"}}
                            label={strings.variable}
                            value={this.state.variable}
                            onChange={this.handleStringChange("variable")}
                            margin="normal">
                            {_.concat(flowContext.variableList, flowContext.argList)
                                .filter((variable) => variable.type === this.state.listType)
                                .map((value) => (
                                    <MenuItem key={value.name} value={JSON.stringify(value)}>
                                        {value.name}
                                    </MenuItem>
                                ))}
                        </TextField>

                        <InputWithType
                            variableType={this.state.listType}
                            onDataChanged={(data: any) => {
                                this.setState({variable: JSON.stringify(new Variable(undefined, this.state.listType, data.value))}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            value={this.state.initialValue}
                            hide={this.state.isConstant !== "constant"}/>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
