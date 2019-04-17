import {BaseInfoFlowNode} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowNode"
import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import {Variable} from "../../../models/Variable"
import {ArithmeticOperationType, FlowType} from "../../../models"
import {Operator} from "../../../generator/flows/ArithmeticFlow"
import * as _ from "lodash"

export class ArithmeticFlowNode extends BaseInfoFlowNode {
    private variable: Variable
    private operation: ArithmeticOperationType
    private operator1: Operator
    private operator2: Operator

    constructor(variable: Variable, operation: ArithmeticOperationType, operator1: Operator, operator2: Operator) {
        super(FlowType.ARITHMETIC, strings.arithmetic, NodeColors.ARITHMETIC)

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)

        this.variable = variable
        this.operation = operation
        this.operator1 = operator1
        this.operator2 = operator2

        this.setVariable(variable)
        this.setOperation(operation)
        this.setOperator1(operator1)
        this.setOperator2(operator2)
    }

    getVariable(): Variable {
        return this.variable
    }

    setVariable(value: Variable) {
        this.variable = value
        this.info = `${value.name} = ${this.getOperator1().variableName} ${this.getOperation()} ${this.getOperator2().variableName}`
    }

    getOperation(): ArithmeticOperationType {
        return this.operation
    }

    setOperation(value: ArithmeticOperationType) {
        this.operation = value
        this.info = `${this.getVariable().name} = ${this.getOperator1().variableName} ${value} ${this.getOperator2().variableName}`
    }

    getOperator1(): Operator {
        return this.operator1
    }

    setOperator1(value: Operator) {
        this.operator1 = value
        this.info = `${this.getVariable().name} = ${value.variableName} ${this.getOperation()} ${this.getOperator2().variableName}`
    }

    getOperator2(): Operator {
        return this.operator2
    }

    setOperator2(value: Operator) {
        this.operator2 = value
        this.info = `${this.getVariable().name} = ${this.getOperator1().variableName} ${this.getOperation()} ${value.variableName}`
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
