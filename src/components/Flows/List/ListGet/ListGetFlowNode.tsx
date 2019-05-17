import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

export class ListGetFlowNode extends BaseFlowNode {
    list: Variable
    variable: Variable
    index: Variable
    isNewVariable: boolean

    constructor(list: Variable, variable: Variable, index: Variable, isNewVariable: boolean, withoutPorts: boolean = false) {
        super(FlowType.LIST_GET, strings.getFromList + " (" + variable.type + ")", NodeColors.LIST_GET)

        this.list = list
        this.variable = variable
        this.index = index
        this.isNewVariable = isNewVariable
        this.setList(list)
        this.setVariable(variable)
        this.setIndex(index)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    setList(list: Variable) {
        this.list = list
        this.updateInfo()
    }

    setVariable(variable: Variable) {
        this.variable = variable
        this.updateInfo()
    }

    setIndex(index: Variable) {
        this.index = index
        this.updateInfo()
    }

    updateInfo() {
        this.info = `${this.variable.name} = ${this.list.name}[${this.index.name ? this.index.name : this.index.value}]`
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.list = object.list
        this.variable = object.variable
        this.index = object.index
        this.isNewVariable = object.isNewVariable
    }

    serialize() {
        return _.merge(super.serialize(), {
            list: this.list,
            variable: this.variable,
            index: this.index,
            isNewVariable: this.isNewVariable
        })
    }
}
