import React from "react"
import {TextField} from "@material-ui/core"
import strings from "../../../lang"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import {VariableType} from "../../../models"
import {Rules} from "../../../config"
import {RandomFlowNode} from "./RandomFlowNode"
import InputWithType from "../../InputWithType/InputWithType"
import {Validator} from "../../../utils"
import {FlowConsumer} from "../../../stores/FlowStore"
import _ from "lodash"

export interface RandomPropertiesProps extends BasePropertiesProps {
    readonlyType: boolean
}

export class RandomProperties extends BaseProperties<RandomPropertiesProps> {
    static defaultProps = {
        readonlyType: false
    }

    constructor(props: RandomPropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as RandomFlowNode

            this.state = {
                variableName: node.getVariable().name,
                minValue: node.minValue,
                maxValue: node.maxValue
            }
        } else {
            this.state = {
                variableName: "",
                minValue: 0,
                maxValue: 1
            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.variableName
                && nextState.minValue.toString()
                && nextState.maxValue.toString()
                && nextState.maxValue >= nextState.minValue)
        }
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div className="bodyContainer">
                        <TextField
                            id="variable-name-input"
                            label={strings.variableName}
                            disabled={this.props.readonlyType}
                            error={this.state.errorField === "variableName"}
                            value={this.state.variableName}
                            inputProps={{maxLength: Rules.MAX_VAR_LENGTH}}
                            onChange={this.handleStringChange("variableName", (data) => {
                                const error = Validator.validateVariableName(data, _.concat(flowContext.variableList, flowContext.argList))
                                this.setState({errorMessage: error, errorField: error ? "variableName" : ""}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            })}
                            margin="normal"
                        />
                        <InputWithType
                            variableType={VariableType.DOUBLE}
                            label={strings.minValue}
                            onDataChanged={(data: any) => {
                                this.setState({minValue: data.value}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            value={this.state.minValue}/>
                        <InputWithType
                            variableType={VariableType.DOUBLE}
                            label={strings.maxValue}
                            onDataChanged={(data: any) => {
                                this.setState({maxValue: data.value}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            }}
                            value={this.state.maxValue}/>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
