import React from "react"
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {OutputFlowNode} from "./OutputFlowNode"
import {VariableType} from "../../../models"
import InputWithType from "../../InputWithType/InputWithType"
import {Variable} from "../../../models/Variable"

export class OutputProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as OutputFlowNode

            this.state = {
                variable: JSON.stringify(node.getVariable()),
                isConstant: node.getVariable().name === undefined,
                variableType: node.getVariable().type,
                initialValue: node.getVariable().value

            }
        } else {
            this.state = {
                variable: "",
                isConstant: false,
                variableType: "",
                initialValue: ""
            }
        }
    }

    render() {
        return (
            <div className="bodyContainer">
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <TextField
                        id="variable-selector"
                        select
                        style={{flex: 1, display: this.state.isConstant ? "none" : "flex"}}
                        label={strings.variable}
                        value={this.state.variable}
                        onChange={this.handleStringChange("variable")}
                        margin="normal">
                        {this.props.variables.map((value) => (
                            <MenuItem key={value.name} value={JSON.stringify(value)}>
                                {value.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <div style={{
                        display: this.state.isConstant ? "flex" : "none",
                        flex: 1,
                        flexDirection: "column"
                    }}>
                        <TextField
                            id="data-type-selector"
                            select
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

                        <InputWithType
                            variableType={this.state.variableType}
                            onDataChanged={(data: any) => {
                                this.setState({variable: JSON.stringify(new Variable(undefined, this.state.variableType, data.value))}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            value={this.state.initialValue}
                            hide={!this.state.isConstant || !this.state.variableType}/>
                    </div>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.isConstant}
                                onChange={this.handleBooleanChange("isConstant")}
                                value="true"
                                color="primary"
                            />
                        }
                        label={this.state.isConstant ? strings.constant : strings.variable}
                    />
                </div>
            </div>
        )
    }
}
