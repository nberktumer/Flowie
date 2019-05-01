import {VariableType} from "../../models"
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core"
import strings from "../../lang"
import React, {Component} from "react"

export interface InputWithTypeProps {
    variableType: VariableType,
    onDataChanged: (data: any) => void,
    value: string,
    hide: boolean
}

export interface InputWithTypeState {
    [index: string]: any
}

export default class InputWithType extends Component<InputWithTypeProps, InputWithTypeState> {
    static defaultProps = {
        value: "",
        hide: false
    }

    constructor(props: InputWithTypeProps) {
        super(props)

        this.state = {
            value: this.props.value,
            isNull: this.props.value === "NULL"
        }
    }

    handleStringChange = (key: string, callback?: (value: string, onComplete: (data: any) => void) => void) => (event: any) => {
        this.setState({[key]: event.target.value}, () => {
            if (callback) {
                callback(event.target.value, this.props.onDataChanged)
            } else {
                this.props.onDataChanged(this.state)
            }
        })
    }

    handleBooleanChange = (key: string, callback?: (value: boolean, onComplete: (data: any) => void) => void) => (event: any) => {
        const val = event.target.checked
        this.setState({[key]: val}, () => {
            if (callback) {
                callback(val, this.props.onDataChanged)
            } else {
                this.props.onDataChanged(this.state)
            }
        })
    }

    render() {
        if(this.props.hide)
            return (<div />)
        switch (this.props.variableType) {
            case VariableType.STRING:
                return this.renderStringInput()
            case VariableType.INT:
                return this.renderIntegerInput()
            case VariableType.BOOLEAN:
                return this.renderBooleanInput()
            default:
                return (<div/>)
        }
    }

    private renderStringInput = () => (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center"
            }}>
            <TextField
                style={{flex: 1}}
                id="string-value-input"
                label={strings.value}
                value={this.state.isNull ? "NULL" : this.state.value}
                type="text"
                onChange={this.handleStringChange("value")}
                margin="normal"
                disabled={this.state.isNull}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.state.isNull}
                        onChange={this.handleBooleanChange("isNull", (value: boolean, onComplete: (data: any) => void) => {
                            this.setState({value: value ? "NULL" : ""}, () => onComplete(this.state))
                        })}
                        value="true"
                        color="primary"/>
                }
                label="NULL"
            />
        </div>
    )

    private renderIntegerInput = () => (
        <TextField
            style={{display: "flex", flex: 1}}
            id="integer-value-input"
            label={strings.value}
            value={this.state.value}
            type="number"
            onChange={this.handleStringChange("value")}
            margin="normal"
        />
    )

    private renderBooleanInput = () => (
        <TextField
            style={{display: "flex", flex: 1}}
            id="boolean-value-input"
            select
            label={strings.value}
            value={this.state.value}
            onChange={this.handleStringChange("value")}
            margin="normal">
            <MenuItem key={"true"} value={"true"}>
                True
            </MenuItem>
            <MenuItem key={"false"} value={"false"}>
                False
            </MenuItem>
        </TextField>
    )
}
