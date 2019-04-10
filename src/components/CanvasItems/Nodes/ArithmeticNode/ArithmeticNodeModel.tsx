import {RectangleNodeWithInfoModel} from "../BaseNodes/RectangleNode/RectangleNodeWithInfo/RectangleNodeWithInfoModel"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import {Variable} from "../../../../models/Variable"
import {ArithmeticOperationType} from "../../../../models"
import {Operator} from "../../../../generator/flows/ArithmeticFlow"
import * as _ from "lodash"

export class ArithmeticNodeModel extends RectangleNodeWithInfoModel {
    variable: Variable
    operation: ArithmeticOperationType
    operator1: Operator
    operator2: Operator

    constructor(variable: Variable, operation: ArithmeticOperationType, operator1: Operator, operator2: Operator) {
        super(strings.arithmetic, NodeColors.ARITHMETIC)

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)

        this.variable = variable
        this.operation = operation
        this.operator1 = operator1
        this.operator2 = operator2
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.variable = object.variable
        this.operation = object.operation
        this.operator1 = object.operator1
        this.operator2 = object.operator2
    }

    serialize() {
        return _.merge(super.serialize(), {
            variable: this.variable,
            operation: this.operation,
            operator1: this.operator1,
            operator2: this.operator2
        })
    }
}
