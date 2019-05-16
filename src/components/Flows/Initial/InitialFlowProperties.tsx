import React from "react"
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import strings from "../../../lang"
import {VariableType} from "../../../models"
import Button from "@material-ui/core/Button"
import {InitialFlowNode} from "./InitialFlowNode"
import {HOLDER} from "../../../bigNoNoPackage/ReturnTypeHolder"

export class InitialFlowProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        if (props.node !== undefined) {
            const node = props.node as InitialFlowNode

            this.state = {
                args: node.argList.map((item) => {
                    return {
                        name: item.name,
                        type: item.type
                    }
                }),
                returnType: node.returnType,
                expanded: ""
            }
        } else {
            this.state = {
                args: [],
                returnType: VariableType.NONE,
                expanded: ""

            }
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        HOLDER.ReturnType = nextState.returnType
        if (this.props.isValidListener && (nextState !== this.state)) {
            this.props.isValidListener(nextState.returnType
                && nextState.args
                && nextState.args.every((item: any) => item.name && item.type))
        }
    }

    renderArgumentText = (arg: any) => {
        if (!arg || !arg.name || !arg.type)
            return strings.invalid

        return `${arg.name}: ${arg.type}`
    }

    render() {
        return (
            <div className="bodyContainer">
                <TextField
                    fullWidth
                    id="return-type-selector"
                    select
                    label={strings.returnType}
                    value={this.state.returnType}
                    onChange={this.handleStringChange("returnType")}
                    margin="normal">
                    {Object.keys(VariableType).filter((item) => item !== VariableType.MAIN_ARG).map((value: any) => (
                        <MenuItem key={value} value={VariableType[value]}>
                            {VariableType[value]}
                        </MenuItem>
                    ))}
                </TextField>

                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        alignSelf: "center",
                        marginTop: 8,
                        marginBottom: 16
                    }}
                    onClick={() => {
                        this.state.args.push({
                            name: "",
                            type: ""
                        })
                        this.forceUpdate()
                    }}>
                    {strings.addArg}
                </Button>
                {this.state.args.map((arg: any, index: number) => (
                    <ExpansionPanel
                        id="paper"
                        key={index}
                        expanded={this.state.expanded === index}
                        onChange={(e, expanded) => {
                            this.setState({
                                expanded: expanded ? index : -1
                            })
                        }}>
                        <ExpansionPanelSummary expandIcon={(
                            <DeleteForeverIcon onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()

                                this.state.args.splice(this.state.args.indexOf(arg), 1)
                                this.props.onDataChanged(this.state)
                                this.forceUpdate()
                            }}/>
                        )}>
                            <Typography>
                                {this.renderArgumentText(arg)}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column"
                        }}>
                            <TextField
                                id="arg-name"
                                fullWidth
                                label={strings.argName}
                                value={this.state.args[index].name}
                                onChange={(e: any) => {
                                    this.state.args[index].name = e.target.value
                                    this.setState({args: this.state.args})
                                    this.props.onDataChanged(this.state)
                                }}
                                margin="normal"/>
                            <TextField
                                id="arg-type-selector"
                                fullWidth
                                select
                                label={strings.argType}
                                value={this.state.args[index].type}
                                onChange={(e: any) => {
                                    this.state.args[index].type = e.target.value
                                    this.setState({args: this.state.args})
                                    this.props.onDataChanged(this.state)
                                }}
                                margin="normal">
                                {Object.keys(VariableType).filter((item) => item !== VariableType.MAIN_ARG).map((value: any) => (
                                    <MenuItem key={value} value={VariableType[value]}>
                                        {VariableType[value]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        )
    }
}
