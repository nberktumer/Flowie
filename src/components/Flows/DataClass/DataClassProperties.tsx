import React from "react"
import {
    Checkbox,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControlLabel,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import AddIcon from "@material-ui/icons/Add"
import {BaseProperties, BasePropertiesProps} from "../Base/BaseProperties"
import strings from "../../../lang"
import {VariableType} from "../../../models"
import InputWithType from "../../InputWithType/InputWithType"
import {Variable} from "../../../models/Variable"
import {DataClassFlowNode} from "./DataClassFlowNode"
import {FlowConsumer} from "../../../stores/FlowStore"

export class DataClassProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as DataClassFlowNode

            this.state = {
                fields: node.fieldList.map((value) => {
                    return {
                        variableType: value.type,
                        field: JSON.stringify(value),
                        initialValue: value ? value.value : "",
                        isConstant: value && value.name === undefined
                    }
                }),
                expanded: ""
            }
        } else {
            this.state = {
                fields: [{
                    variableType: "",
                    field: "",
                    isConstant: false,
                    initialValue: ""
                }],
                expanded: ""

            }
        }
    }

    renderFieldText = (field: any) => {
        if (!field || !field.type || !field.value)
            return strings.invalid

        if (field.name)
            return `${field.name}: ${field.type}`
        else
            return `${field.value} (${field.type})`
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div className="bodyContainer">
                        {this.state.fields.map((field: any, index: number) => (
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

                                        this.state.fields.push({
                                            variableType: "",
                                            field: "",
                                            isConstant: false,
                                            initialValue: ""
                                        })
                                        this.props.onDataChanged(this.state)
                                        this.forceUpdate()
                                    }}/>
                                ) : (
                                    <DeleteForeverIcon onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()

                                        this.state.fields.splice(this.state.fields.indexOf(field), 1)
                                        this.props.onDataChanged(this.state)
                                        this.forceUpdate()
                                    }}/>
                                )}>
                                    <Typography>
                                        {this.renderFieldText(field)}
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
                                        value={this.state.fields[index].variableType}
                                        onChange={(e: any) => {
                                            this.state.fields[index].variableType = e.target.value
                                            this.props.onDataChanged(this.state)
                                            this.forceUpdate()
                                        }}
                                        margin="normal">
                                        {Object.keys(VariableType).map((value: any) => (
                                            <MenuItem key={value} value={VariableType[value]}>
                                                {VariableType[value]}
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
                                            style={{flex: 1, display: field.isConstant ? "none" : "flex"}}
                                            label={strings.variable}
                                            value={this.state.fields[index].field}
                                            onChange={(e: any) => {
                                                this.state.fields[index].field = e.target.value
                                                this.props.onDataChanged(this.state)
                                                this.forceUpdate()
                                            }}
                                            margin="normal">
                                            {flowContext.variableList.filter((value) => {
                                                return value.type === field.variableType
                                            }).map((value) => (
                                                <MenuItem key={value.name} value={JSON.stringify(value)}>
                                                    {value.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <InputWithType
                                            variableType={this.state.fields[index].variableType}
                                            onDataChanged={(data: any) => {
                                                this.state.fields[index].field = JSON.stringify(new Variable(undefined, field.variableType, data.value))
                                                this.props.onDataChanged(this.state)
                                                this.forceUpdate()
                                            }}
                                            value={field.initialValue}
                                            hide={!field.isConstant}/>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.fields[index].isConstant}
                                                    onChange={(e: any) => {
                                                        this.state.fields[index].isConstant = e.target.checked
                                                        this.state.fields[index].field = JSON.stringify(new Variable(undefined, field.variableType, field.initialValue))
                                                        this.props.onDataChanged(this.state)
                                                        this.forceUpdate()
                                                    }}
                                                    value="true"
                                                    color="primary"
                                                />
                                            }
                                            label={field.isConstant ? strings.constant : strings.variable}
                                        />
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
