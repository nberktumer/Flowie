import React from "react"
import {MenuItem, TextField} from "@material-ui/core"
import strings from "../../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../../Base/BaseProperties"
import {ListRemoveFlowNode} from "./ListRemoveFlowNode"
import {FlowConsumer} from "../../../../stores/FlowStore"
import _ from "lodash"
import {Variable} from "../../../../models/Variable"
import InputWithType from "../../../InputWithType/InputWithType"
import {VariableType} from "../../../../models"

export class ListRemoveProperties extends BaseProperties {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node) {
            const node = props.node as ListRemoveFlowNode

            this.state = {
                list: JSON.stringify(node.list),
                index: node.index,
                initialValue: node.index
            }
        } else {
            this.state = {
                list: "",
                index: -1,
                initialValue: ""
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
                        <InputWithType
                            variableType={VariableType.INT}
                            onDataChanged={(data: any) => {
                                this.setState({index: data.value}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            label={strings.index}
                            value={this.state.initialValue}/>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
