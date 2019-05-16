import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType, VariableType} from "../../../models"
import {Variable} from "../../../models/Variable"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

export class InitialFlowNode extends BaseFlowNode {
    argList: Variable[] = []
    returnType: VariableType

    constructor(returnType: VariableType, withoutPorts: boolean = false) {
        super(FlowType.INITIAL, strings.initialFlow, NodeColors.INITIAL)

        this.returnType = returnType
        if (!withoutPorts) {
            this.addLoopPort(strings.recurse).setMaximumLinks(Infinity)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    updateInfo() {
        this.info = this.argList.map((arg) => {
            return `${arg.name}: ${arg.type}`
        }).join(`<br />`)
    }

    addArgument(arg: Variable) {
        this.argList.push(arg)
        this.updateInfo()
    }

    removeArgument(arg: Variable) {
        this.argList = this.argList.filter((item) => item !== arg)
        this.updateInfo()
    }

    removeAllArguments() {
        this.argList = []
        this.updateInfo()
    }

    updateArgument(arg: Variable) {
        this.argList.forEach((item, index) => {
            if (item.name === arg.name) {
                this.argList[index] = arg
            }
        })
        this.updateInfo()
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.argList = object.argList
        this.returnType = object.returnType
    }

    serialize() {
        return _.merge(super.serialize(), {
            argList: this.argList,
            returnType: this.returnType
        })
    }

    // Prevent removing this item
    remove(): void {
        return
    }
}
