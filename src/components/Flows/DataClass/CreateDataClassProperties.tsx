import React from "react"
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
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
import {FlowConsumer} from "../../../stores/FlowStore"
import {Validator} from "../../../utils"

export class CreateDataClassProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        this.state = {
            fields: [{
                name: "",
                type: "",
                value: "",
                initialValue: ""
            }],
            expanded: 0,
            name: ""
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.name
                && nextState.fields
                && nextState.fields.every((item: any) => item.name && item.type))
        }
    }

    renderFieldText = (field: any) => {
        if (!field || !field.name || !field.type)
            return strings.invalid

        if (field.value)
            return `${field.name}: ${field.type} = ${field.value}`
        else
            return `${field.name}: ${field.type}`
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => {
                    console.log(flowContext)
                    return (
                        <div className="bodyContainer">
                            <Paper id="paper"
                                   style={{
                                       display: "flex",
                                       flexDirection: "column",
                                       flex: 1,
                                       padding: 24,
                                       marginBottom: 8
                                   }}>
                                <TextField
                                    fullWidth
                                    id="data-class-name"
                                    label={strings.dataClass}
                                    value={this.state.name}
                                    error={this.state.errorField === "name"}
                                    onChange={this.handleStringChange("name", (data) => {
                                        const error = Validator.validateClassName(data, flowContext.classNameList)
                                        this.setState({errorMessage: error, errorField: error ? "name" : ""}, () => {
                                            this.props.onDataChanged(this.state)
                                        })
                                    })}
                                    margin="normal"/>
                            </Paper>
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
                                                name: "",
                                                type: "",
                                                value: "",
                                                initialValue: ""
                                            })
                                            this.setState({fields: this.state.fields})
                                            this.props.onDataChanged(this.state)
                                        }}/>
                                    ) : (
                                        <DeleteForeverIcon onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()

                                            this.state.fields.splice(this.state.fields.indexOf(field), 1)
                                            this.setState({fields: this.state.fields})
                                            this.props.onDataChanged(this.state)
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
                                            id="data-name"
                                            fullWidth
                                            label={strings.variableName}
                                            value={field.name}
                                            onChange={(e: any) => {
                                                const error = Validator.validateVariableName(e.target.value, this.state.fields.map((item: any) => new Variable(item.name, VariableType.STRING, "")))
                                                this.state.fields[index].name = e.target.value
                                                this.setState({
                                                    errorMessage: error,
                                                    errorField: error ? "variableName" : "",
                                                    fields: this.state.fields
                                                }, () => {
                                                    this.props.onDataChanged(this.state)
                                                })
                                            }}
                                            margin="normal"/>
                                        <TextField
                                            id="data-type-selector"
                                            select
                                            fullWidth
                                            label={strings.variableType}
                                            value={field.type}
                                            onChange={(e: any) => {
                                                this.state.fields[index].type = e.target.value
                                                this.setState({fields: this.state.fields})
                                                this.props.onDataChanged(this.state)
                                            }}
                                            margin="normal">
                                            {Object.keys(VariableType).map((value: any) => (
                                                <MenuItem key={value} value={VariableType[value]}>
                                                    {VariableType[value]}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <InputWithType
                                            label={strings.defaultValue}
                                            variableType={field.type}
                                            onDataChanged={(data: any) => {
                                                this.state.fields[index].value = data.value
                                                this.setState({fields: this.state.fields})
                                                this.props.onDataChanged(this.state)
                                            }}
                                            value={field.initialValue}/>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            ))}
                        </div>
                    )
                }}
            </FlowConsumer>
        )
    }
}
