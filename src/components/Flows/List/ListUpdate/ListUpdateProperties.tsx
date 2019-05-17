import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../../Base/BaseProperties"
import {ListUpdateFlowNode} from "./ListUpdateFlowNode"
import {FlowConsumer} from "../../../../stores/FlowStore"
import _ from "lodash"
import {Variable} from "../../../../models/Variable"
import InputWithType from "../../../InputWithType/InputWithType"
import {VariableType} from "../../../../models"

export class ListUpdateProperties extends BaseProperties {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node) {
            const node = props.node as ListUpdateFlowNode

            this.state = {
                list: JSON.stringify(node.list),
                listType: node.list.type,
                variable: JSON.stringify(node.variable),
                index: node.index,
                initialIndexValue: node.index,
                initialValue: node.index,
                isConstant: node.variable.name ? "variable" : "constant"
            }
        } else {
            this.state = {
                list: "",
                listType: "",
                index: -1,
                initialIndexValue: "",
                initialValue: "",
                isConstant: "variable"
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.list
                && nextState.index >= 0)
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
                            label={strings.listToUpdate}
                            value={this.state.list}
                            onChange={(e) => {
                                const list = JSON.parse(e.target.value) as Variable
                                this.setState({list: e.target.value, listType: list.listElementType})
                            }}
                            margin="normal">
                            {_.concat(flowContext.variableList, flowContext.argList).filter((variable: Variable) => {
                                return variable.type === VariableType.LIST
                            }).map((variable: Variable) => (
                                <MenuItem key={variable.name} value={JSON.stringify(variable)}>
                                    {variable.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <InputWithType
                            variableType={VariableType.INT}
                            onDataChanged={(data: any) => {
                                this.setState({index: data.value}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            label={strings.index}
                            value={this.state.initialIndexValue}/>
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
                            hide={this.state.isConstant !== "constant" || !this.state.listType}/>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
