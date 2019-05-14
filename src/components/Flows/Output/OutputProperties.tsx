import React from "react"
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {OutputFlowNode} from "./OutputFlowNode"
import {VariableType} from "../../../models"
import InputWithType from "../../InputWithType/InputWithType"
import {Variable} from "../../../models/Variable"
import {FlowConsumer} from "../../../stores/FlowStore"

export class OutputProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as OutputFlowNode

            this.state = {
                variable: JSON.stringify(node.getVariable()),
                isConstant: node.getVariable().name === undefined,
                initialValue: node.getVariable().value

            }
        } else {
            this.state = {
                variable: "",
                isConstant: false,
                initialValue: ""
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && ((nextState.isConstant && nextState.variable && JSON.parse(nextState.variable).value)
                    || (!nextState.isConstant && nextState.variable)
                ))
        }
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div className="bodyContainer">
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            flex: 1
                        }}>
                            <TextField
                                id="variable-selector"
                                select
                                style={{flex: 1, display: this.state.isConstant ? "none" : "flex"}}
                                label={strings.variable}
                                value={this.state.variable}
                                onChange={this.handleStringChange("variable")}
                                margin="normal">
                                {flowContext.variableList.map((value) => (
                                    <MenuItem key={value.name} value={JSON.stringify(value)}>
                                        {value.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <InputWithType
                                variableType={VariableType.STRING}
                                onDataChanged={(data: any) => {
                                    this.setState({variable: JSON.stringify(new Variable(undefined, VariableType.STRING, data.value))}, () => {
                                        this.props.onDataChanged(this.state)
                                    })
                                }}
                                value={this.state.initialValue}
                                hide={!this.state.isConstant}/>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isConstant}
                                        onChange={this.handleBooleanChange("isConstant", () => {
                                            this.setState({variable: null}, () => {
                                                this.props.onDataChanged(this.state)
                                            })
                                        })}
                                        value="true"
                                        color="primary"
                                    />
                                }
                                label={this.state.isConstant ? strings.constant : strings.variable}
                            />
                        </div>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
