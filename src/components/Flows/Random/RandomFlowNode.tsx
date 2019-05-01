import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {BaseVariableFlowNode} from "../Base/BaseVariableFlowNode"
import {FlowType} from "../../../models"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

export class RandomFlowNode extends BaseVariableFlowNode {
    minValue: number = 0
    maxValue: number = 1

    constructor(variable: Variable, minValue: number, maxValue: number, withoutPorts: boolean = false) {
        super(FlowType.RANDOM, strings.variable + " (" + strings.random + ")", NodeColors.RANDOM)

        this.setVariable(variable)
        this.setMinValue(minValue)
        this.setMaxValue(maxValue)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.minValue = object.minValue
        this.maxValue = object.maxValue
    }

    serialize() {
        return _.merge(super.serialize(), {
            minValue: this.minValue,
            maxValue: this.maxValue
        })
    }

    setVariable(variable: Variable) {
        super.setVariable(variable)
        this.updateInfo()
    }

    setMinValue(value: number) {
        if (value > this.maxValue)
            return

        this.minValue = value
        this.updateInfo()
    }

    setMaxValue(value: number) {
        this.maxValue = value
        this.updateInfo()
    }

    updateInfo(): void {
        this.info = `${this.minValue} <= ${this.getVariable().name} <= ${this.maxValue}`
    }
}
