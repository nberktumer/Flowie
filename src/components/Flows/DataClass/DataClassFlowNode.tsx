import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {FlowType} from "../../../models"
import {Variable} from "../../../models/Variable"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class DataClassFlowNode extends BaseFlowNode {
    fieldList: Variable[] = []

    constructor(withoutPorts: boolean = false) {
        super(FlowType.DATA_CLASS, strings.dataClass, NodeColors.DATA_CLASS)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.nextFlow).setMaximumLinks(1)
        }
    }

    updateInfo() {
        this.info = this.fieldList.map((field) => {
            return `${field.name}: ${field.type}`
        }).join("\n")
    }

    addField(field: Variable) {
        this.fieldList.push(field)
        this.updateInfo()
    }

    removeAllFields() {
        this.fieldList = []
        this.updateInfo()
    }

    removeField(field: Variable) {
        this.fieldList = this.fieldList.filter((item) => item !== field)
        this.updateInfo()
    }

    updateField = (oldField: Variable, newField: Variable) => {
        this.fieldList.forEach((field, index) => {
            if (field.name === oldField.name) {
                this.fieldList[index] = newField
            }
        })
        this.updateInfo()
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.fieldList = object.fieldList
    }

    serialize() {
        return _.merge(super.serialize(), {
            fieldList: this.fieldList
        })
    }
}
