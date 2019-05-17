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
    returnListType: VariableType

    constructor(returnType: VariableType, returnListType: VariableType = VariableType.NONE, withoutPorts: boolean = false) {
        super(FlowType.INITIAL, strings.initialFlow, NodeColors.INITIAL)

        this.returnType = returnType
        this.returnListType = returnListType

        if (!withoutPorts) {
            this.addLoopPort(strings.recurse).setMaximumLinks(Infinity)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    updateInfo() {
        this.info = this.argList.map((arg) => {
            if (arg.type === VariableType.LIST)
                return `${arg.name}: ${arg.type}<${arg.listElementType}>`
            else
                return `${arg.name}: ${arg.type}`
        }).join(`\n`)
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
        this.returnListType = object.returnListType
    }

    serialize() {
        return _.merge(super.serialize(), {
            argList: this.argList,
            returnType: this.returnType,
            returnListType: this.returnListType
        })
    }

    // Prevent removing this item
    remove(): void {
        return
    }
}
