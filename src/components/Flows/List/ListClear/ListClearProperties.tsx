import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../../Base/BaseProperties"
import {ListClearFlowNode} from "./ListClearFlowNode"
import {FlowConsumer} from "../../../../stores/FlowStore"
import _ from "lodash"
import {Variable} from "../../../../models/Variable"
import {VariableType} from "../../../../models"

export class ListClearProperties extends BaseProperties {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node) {
            const node = props.node as ListClearFlowNode

            this.state = {
                list: JSON.stringify(node.list)
            }
        } else {
            this.state = {
                list: ""
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.list)
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
                            label={strings.listToClear}
                            value={this.state.list}
                            onChange={this.handleStringChange("list")}
                            margin="normal">
                            {_.concat(flowContext.variableList, flowContext.argList).filter((variable: Variable) => {
                                return variable.type === VariableType.LIST
                            }).map((variable: Variable) => (
                                <MenuItem key={variable.name} value={JSON.stringify(variable)}>
                                    {variable.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
