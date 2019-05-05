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
                        {this.props.variables.map((value) => (
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
