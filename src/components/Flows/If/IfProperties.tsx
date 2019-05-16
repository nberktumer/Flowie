import React from "react"
import {
    Checkbox,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControlLabel,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import AddIcon from "@material-ui/icons/Add"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import strings from "../../../lang"
import {VariableType} from "../../../models"
import InputWithType from "../../InputWithType/InputWithType"
import {Variable} from "../../../models/Variable"
import {ConditionOperation, ConditionType} from "../../../models/VariableEnums"
import {SignConverter} from "../../../utils"
import {IfFlowNode} from "./IfFlowNode"
import {FlowConsumer} from "../../../stores/FlowStore"
import _ from "lodash"

export class IfProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as IfFlowNode

            this.state = {
                conditions: node.conditionList.map((value) => {
                    return {
                        variableType: value.variableType,
                        first: JSON.stringify(value.first),
                        second: JSON.stringify(value.second),
                        operation: value.operation,
                        op2initialValue: value.second ? value.second.value : "",
                        isOp2Constant: value.second && value.second.name === undefined
                    }
                }),
                conditionType: node.conditionType,
                expanded: ""
            }
        } else {
            this.state = {
                conditions: [{
                    variableType: "",
                    first: "",
                    second: "",
                    operation: "",
                    isOp2Constant: false,
                    op2initialValue: ""
                }],
                conditionType: ConditionType.AND,
                expanded: 0

            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && (nextState !== this.state)) {
            this.props.isValidListener(nextState.conditions
                && nextState.conditionType
                && nextState.conditions.every((item: any) =>
                    item.variableType && item.first && item.operation
                    && ((item.isOp2Constant && item.second && JSON.parse(item.second).value)
                        || (!item.isOp2Constant && item.second)
                    )))
        }
    }

    renderConditionText = (condition: any) => {
        if (!condition || !condition.first || !condition.second || !condition.operation)
            return strings.invalid

        const first = JSON.parse(condition.first)
        const second = JSON.parse(condition.second)

        if (second) {
            return `${first.name} ${SignConverter.booleanOperation(condition.operation)} ${second.name ? second.name : second.value}`
        } else {
            return first.name
        }
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div className="bodyContainer">
                        <Paper id="paper"
                               style={{
                                   display: "flex",
                                   flex: 1,
                                   padding: 24,
                                   marginBottom: 8
                               }}>
                            <TextField
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    margin: 0,
                                    color: "black"
                                }}
                                id="condition-type-selector"
                                select
                                label={strings.conditionType}
                                value={this.state.conditionType}
                                onChange={this.handleStringChange("conditionType")}
                                margin="normal">
                                {Object.keys(ConditionType).map((value: any) => (
                                    <MenuItem key={value} value={ConditionType[value]}>
                                        {ConditionType[value]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Paper>
                        {this.state.conditions.map((condition: any, index: number) => (
                            <ExpansionPanel id="paper"
                                            key={index}
                                            expanded={this.state.expanded === index}
                                            onChange={(e, expanded) => {
                                                this.setState({
                                                    expanded: expanded ? index : -1
                                                })
                                            }}>
                                <ExpansionPanelSummary expandIcon={index === 0 ? (
                                    <AddIcon onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()

                                        this.state.conditions.push({
                                            variableType: "",
                                            first: "",
                                            second: "",
                                            operation: "",
                                            isOp2Constant: false,
                                            op2initialValue: ""
                                        })
                                        this.props.onDataChanged(this.state)
                                        this.forceUpdate()
                                    }}/>
                                ) : (
                                    <DeleteForeverIcon onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()

                                        this.state.conditions.splice(this.state.conditions.indexOf(condition), 1)
                                        this.props.onDataChanged(this.state)
                                        this.forceUpdate()
                                    }}/>
                                )}>
                                    <Typography>
                                        {this.renderConditionText(condition)}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1
                                }}>
                                    <TextField
                                        id="data-type-selector"
                                        select
                                        label={strings.variableType}
                                        value={this.state.conditions[index].variableType}
                                        onChange={(e: any) => {
                                            this.state.conditions[index].variableType = e.target.value
                                            this.setState({conditions: this.state.conditions, ...this.state})
                                            this.props.onDataChanged(this.state)
                                        }}
                                        margin="normal">
                                        {Object.keys(VariableType).filter((item: any) => VariableType[item] !== VariableType.MAIN_ARG && VariableType[item] !== VariableType.NONE).map((value: any) => (
                                            <MenuItem key={value} value={VariableType[value]}>
                                                {VariableType[value]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="data-type-selector"
                                        select
                                        label={strings.firstVariable}
                                        value={this.state.conditions[index].first}
                                        onChange={(e: any) => {
                                            this.state.conditions[index].first = e.target.value
                                            this.setState({conditions: this.state.conditions, ...this.state})
                                            this.props.onDataChanged(this.state)
                                        }}
                                        margin="normal">
                                        {_.concat(flowContext.variableList, flowContext.argList).filter((value: Variable) => {
                                            return value.type === condition.variableType
                                        }).map((value: Variable) => (
                                            <MenuItem key={value.name} value={JSON.stringify(value)}>
                                                {value.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <TextField
                                            id="data-type-selector"
                                            select
                                            style={{flex: 1, display: condition.isOp2Constant ? "none" : "flex"}}
                                            label={strings.secondVariable}
                                            value={this.state.conditions[index].second}
                                            onChange={(e: any) => {
                                                this.state.conditions[index].second = e.target.value
                                                this.setState({conditions: this.state.conditions, ...this.state})
                                                this.props.onDataChanged(this.state)
                                            }}
                                            margin="normal">
                                            {_.concat(flowContext.variableList, flowContext.argList).filter((value: Variable) => {
                                                return value.type === condition.variableType
                                            }).map((value: Variable) => (
                                                <MenuItem key={value.name} value={JSON.stringify(value)}>
                                                    {value.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <InputWithType
                                            variableType={this.state.conditions[index].variableType}
                                            onDataChanged={(data: any) => {
                                                this.state.conditions[index].second = JSON.stringify(new Variable(undefined, condition.variableType, data.value))
                                                this.setState({conditions: this.state.conditions, ...this.state})
                                                this.props.onDataChanged(this.state)
                                            }}
                                            value={condition.op2initialValue}
                                            hide={!condition.isOp2Constant}/>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.conditions[index].isOp2Constant}
                                                    onChange={(e: any) => {
                                                        this.state.conditions[index].isOp2Constant = e.target.checked
                                                        this.state.conditions[index].second = null
                                                        this.setState({conditions: this.state.conditions, ...this.state})
                                                        this.props.onDataChanged(this.state)
                                                    }}
                                                    value="true"
                                                    color="primary"
                                                />
                                            }
                                            label={condition.isOp2Constant ? strings.constant : strings.variable}
                                        />
                                    </div>
                                    <TextField
                                        id="data-type-selector"
                                        select
                                        label={strings.operation}
                                        value={this.state.conditions[index].operation}
                                        onChange={(e: any) => {
                                            this.state.conditions[index].operation = e.target.value
                                            this.setState({conditions: this.state.conditions, ...this.state})
                                            this.props.onDataChanged(this.state)
                                        }}
                                        margin="normal">
                                        {Object.keys(ConditionOperation).map((value: any) => (
                                            <MenuItem key={value} value={ConditionOperation[value]}>
                                                {SignConverter.booleanOperation(ConditionOperation[value] as ConditionOperation)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
