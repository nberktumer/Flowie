import React from "react"
import {TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {Rules} from "../../../config"
import {CurrentTimeFlowNode} from "./CurrentTimeFlowNode"
import {Validator} from "../../../utils"
import {FlowConsumer} from "../../../stores/FlowStore"

export interface CurrentTimePropertiesProps extends BasePropertiesProps {
    readonlyType: boolean
}

export class CurrentTimeProperties extends BaseProperties<CurrentTimePropertiesProps> {
    static defaultProps = {
        readonlyType: false
    }

    constructor(props: CurrentTimePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as CurrentTimeFlowNode

            this.state = {
                variableName: node.getVariable().name
            }
        } else {
            this.state = {
                variableName: ""
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.variableName)
        }
    }

    render() {
        return (
            <FlowConsumer>
                {(flowConsumer) => (
                    <div className="bodyContainer">
                        <TextField
                            id="variable-name-input"
                            label={strings.variableName}
                            disabled={this.props.readonlyType}
                            error={this.state.errorField === "variableName"}
                            value={this.state.variableName}
                            inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                            onChange={this.handleStringChange("variableName", (data) => {
                                const error = Validator.validateVariableName(data, flowConsumer.variableList)
                                this.setState({errorMessage: error, errorField: error ? "variableName" : ""}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            })}
                            margin="normal"
                        />
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
