import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import {Variable} from "../../../models/Variable"
import {ArithmeticOperationType, FlowType} from "../../../models"
import * as _ from "lodash"
import {SignConverter} from "../../../utils"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class ArithmeticFlowNode extends BaseFlowNode {
    private variable: Variable
    private operation: ArithmeticOperationType
    private operator1: Variable
    private operator2: Variable

    constructor(variable: Variable, operation: ArithmeticOperationType, operator1: Variable, operator2: Variable, withoutPorts: boolean = false) {
        super(FlowType.ARITHMETIC, strings.arithmetic, NodeColors.ARITHMETIC)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }

        this.variable = variable
        this.operation = operation
        this.operator1 = operator1
        this.operator2 = operator2

        this.setVariable(variable)
        this.setOperation(operation)
        this.setOperator1(operator1)
        this.setOperator2(operator2)
    }

    updateInfo() {
        this.info = `${this.getVariable().name} = ${this.getOperator1().name} ${SignConverter.arithmeticOperation(this.getOperation())} 
        ${!this.getOperator2().name ? this.getOperator2().value : this.getOperator2().name}`
    }

    getVariable(): Variable {
        return this.variable
    }

    setVariable(value: Variable) {
        this.variable = value
        this.updateInfo()
    }

    getOperation(): ArithmeticOperationType {
        return this.operation
    }

    setOperation(value: ArithmeticOperationType) {
        this.operation = value
        this.updateInfo()
    }

    getOperator1(): Variable {
        return this.operator1
    }

    setOperator1(value: Variable) {
        this.operator1 = value
        this.updateInfo()
    }

    getOperator2(): Variable {
        return this.operator2
    }

    setOperator2(value: Variable) {
        this.operator2 = value
        this.updateInfo()
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
