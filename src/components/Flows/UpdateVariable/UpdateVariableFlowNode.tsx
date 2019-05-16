import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {FlowType} from "../../../models"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

export class UpdateVariableFlowNode extends BaseFlowNode {
    variable: Variable
    variableValue: Variable

    constructor(variable: Variable, variableValue: Variable, withoutPorts: boolean = false) {
        super(FlowType.UPDATE_VARIABLE, strings.updateVariable + " (" + variable.type + ")", NodeColors.VARIABLE)

        this.variable = variable
        this.variableValue = variableValue

        this.setVariable(variable)
        this.setVariableValue(variableValue)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    setVariable(variable: Variable) {
        this.variable = variable
        this.updateInfo()
    }

    setVariableValue(variableValue: Variable) {
        this.variableValue = variableValue
        this.updateInfo()
    }

    updateInfo() {
        this.info = `${this.variable.name} = ${this.variableValue.name ? this.variableValue.name : this.variableValue.value}`
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.variable = object.variable
        this.variableValue = object.variableValue
    }

    serialize() {
        return _.merge(super.serialize(), {
            variable: this.variable,
            variableValue: this.variableValue
        })
    }
}
