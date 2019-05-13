import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {FlowType} from "../../../models"
import {Condition} from "../../../models/Condition"
import {ConditionType} from "../../../models/VariableEnums"
import {SignConverter} from "../../../utils"
import {Variable} from "../../../models/Variable"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {DefaultPortType} from "../../CanvasItems/Ports/DefaultPort"

export class IfFlowNode extends BaseFlowNode {
    conditionList: Condition[] = []
    conditionType: ConditionType = ConditionType.AND

    constructor(withoutPorts: boolean = false) {
        super(FlowType.IF, strings.ifStatement, NodeColors.IF)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(Infinity)
            this.addOutPort(strings.nextFlow).setMaximumLinks(1)
            this.addTrueScopePort(strings.true).setMaximumLinks(1)
            this.addFalseScopePort(strings.false).setMaximumLinks(1)
        }
    }

    updateInfo() {
        this.info = this.conditionList.map((condition) => {
            return `${condition.first.name} ${SignConverter.booleanOperation(condition.operation)} ${condition.second ? (condition.second.name ? condition.second.name : condition.second.value) : ""}`
        }).join(` ${this.conditionType} `)
    }

    setConditionType(conditionType: ConditionType) {
        this.conditionType = conditionType
        this.updateInfo()
    }

    getConditionType(): ConditionType {
        return this.conditionType
    }

    addCondition(condition: Condition) {
        this.conditionList.push(condition)
        this.updateInfo()
    }

    removeAllConditions() {
        this.conditionList = []
        this.updateInfo()
    }

    removeCondition(condition: Condition) {
        this.conditionList = this.conditionList.filter((cond) => cond !== condition)
        this.updateInfo()
    }

    updateVariableInConditions = (oldVariable: Variable, newVariable: Variable) => {
        this.conditionList.forEach((cond) => {
            if (cond.first.name === oldVariable.name) {
                cond.first = newVariable
            }
            if (cond.second && cond.second.name && cond.second.name === oldVariable.name) {
                cond.second = newVariable
            }
        })
        this.updateInfo()
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.conditionList = object.conditionList
        this.conditionType = object.conditionType
    }

    serialize() {
        return _.merge(super.serialize(), {
            conditionList: this.conditionList,
            conditionType: this.conditionType
        })
    }

    getTrueScopeFlow(): BaseFlowNode | null {
        const links = Object.values(this.getPortListByType(DefaultPortType.TRUE_SCOPE)[0].getLinks())

        if (links.length > 0) {
            return links[0].getTargetPort().getNode() as BaseFlowNode
        } else {
            return null
        }
    }

    getFalseScopeFlow(): BaseFlowNode | null {
        const links = Object.values(this.getPortListByType(DefaultPortType.FALSE_SCOPE)[0].getLinks())

        if (links.length > 0) {
            return links[0].getTargetPort().getNode() as BaseFlowNode
        } else {
            return null
        }
    }
}
