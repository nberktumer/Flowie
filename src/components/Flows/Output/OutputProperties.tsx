import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import {OutputFlowNode} from "./OutputFlowNode"

export class OutputProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as OutputFlowNode

            this.state = {
                variable: JSON.stringify(node.getVariable())
            }
        } else {
            this.state = {
                variable: ""
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
                    {this.props.variables.map((value) => (
                        <MenuItem key={value.name} value={JSON.stringify(value)}>
                            {value.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        )
    }
}
