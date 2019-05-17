import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {FlowType, VariableType} from "../../../models"
import {Variable} from "../../../models/Variable"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class ClassFlowNode extends BaseFlowNode {
    argList: Variable[] = []
    variable: Variable
    returnType: VariableType
    returnListType: VariableType

    constructor(variable: Variable, returnType: VariableType, returnListType: VariableType, className: string, withoutPorts: boolean = false) {
        super(FlowType.CLASS, className, NodeColors.DATA_CLASS)

        this.variable = variable
        this.returnType = returnType
        this.returnListType = returnListType
        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.nextFlow).setMaximumLinks(1)
        }
    }

    updateInfo() {
        this.info = this.argList.map((arg) => {
            if (arg.value && arg.value.name) {
                if (arg.type === VariableType.LIST)
                    return `${arg.name}: ${arg.type}<${arg.listElementType}> = ${arg.value.name}`
                else
                    return `${arg.name}: ${arg.type} = ${arg.value.name}`
            } else if (arg.value && !arg.value.name) {
                if (arg.type === VariableType.LIST)
                    return `${arg.name}: ${arg.type}<${arg.listElementType}> = ${arg.value.value}`
                else
                    return `${arg.name}: ${arg.type} = ${arg.value.value}`
            } else {
                if (arg.type === VariableType.LIST)
                    return `${arg.name}: ${arg.type}<${arg.listElementType}>`
                else
                    return `${arg.name}: ${arg.type}`
            }
        }).join("\n")
    }

    addField(field: Variable) {
        this.argList.push(field)
        this.updateInfo()
    }

    removeAllFields() {
        this.argList = []
        this.updateInfo()
    }

    removeField(field: Variable) {
        this.argList = this.argList.filter((item) => item !== field)
        this.updateInfo()
    }

    updateField = (oldArg: Variable, newArg: Variable) => {
        this.argList.forEach((arg, index) => {
            if (arg.name === oldArg.name) {
                this.argList[index] = newArg
            }
        })
        this.updateInfo()
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.argList = object.argList
        this.variable = object.variable
        this.returnType = object.returnType
        this.returnListType = object.returnListType
    }

    serialize() {
        return _.merge(super.serialize(), {
            argList: this.argList,
            variable: this.variable,
            returnType: this.returnType,
            returnListType: this.returnListType
        })
    }
}
