import React from "react"
import {TextField} from "@material-ui/core"
import {BaseProperties, BasePropertiesProps, BasePropertiesState} from "../Base/BaseProperties"
import strings from "../../../lang"
import {FlowConsumer} from "../../../stores/FlowStore"
import {Validator} from "../../../utils"

export class CreatePackageProperties extends BaseProperties<BasePropertiesProps> {

    constructor(props: BasePropertiesProps) {
        super(props)

        this.state = {
            name: ""
        }
    }

    componentWillUpdate(nextProps: Readonly<BasePropertiesProps>, nextState: Readonly<BasePropertiesState>, nextContext: any): void {
        if (this.props.isValidListener && nextState !== this.state) {
            this.props.isValidListener(!nextState.errorMessage
                && !nextState.errorField
                && nextState.name)
        }
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div className="bodyContainer">
                        <TextField
                            fullWidth
                            id="package-name"
                            label={strings.newPackage}
                            value={this.state.name}
                            error={this.state.errorField === "name"}
                            onChange={this.handleStringChange("name", (data) => {
                                const error = Validator.validatePackageName(data, flowContext.packageNameList)
                                this.setState({errorMessage: error, errorField: error ? "name" : ""}, () => {
                                    this.props.onDataChanged(this.state)
                                })
                            })}
                            margin="normal"/>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
