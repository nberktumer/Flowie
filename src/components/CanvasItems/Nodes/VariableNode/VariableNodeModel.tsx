import {RectangleNodeWithInfoModel} from "../BaseNodes/RectangleNode/RectangleNodeWithInfo/RectangleNodeWithInfoModel"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {DataType} from "../../../../models"
import {DiagramEngine, LinkModel, LinkModelListener} from "storm-react-diagrams"
import * as _ from "lodash"

export class VariableNodeModel extends RectangleNodeWithInfoModel {
    variableName: string | undefined
    dataType: DataType | undefined
    value: any

    constructor(type: DataType) {
        super(strings.variable + " (" + type + ")", NodeColors.VARIABLE)

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }

    getNextFlowId() {
        if (Object.keys(this.getOutPorts()[0].getLinks()).length > 0) {
            Object.values(this.getOutPorts()[0].getLinks()).map((value: LinkModel<LinkModelListener>) => {
                value.getTargetPort()
            })
        }
        return this.getOutPorts()
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.variableName = object.variableName
        this.dataType = object.dataType
        this.value = object.value
    }

    serialize() {
        return _.merge(super.serialize(), {
            variableName: this.variableName,
            dataType: this.dataType,
            value: this.value
        })
    }
}
