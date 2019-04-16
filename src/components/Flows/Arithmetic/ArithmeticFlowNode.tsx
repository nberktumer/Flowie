import {BaseInfoFlowNode} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowNode"
import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import {Variable} from "../../../models/Variable"
import {ArithmeticOperationType, FlowType} from "../../../models"
import {Operator} from "../../../generator/flows/ArithmeticFlow"
import * as _ from "lodash"

export class ArithmeticFlowNode extends BaseInfoFlowNode {
    private _variable: Variable
    private _operation: ArithmeticOperationType
    private _operator1: Operator
    private _operator2: Operator

    constructor(variable: Variable, operation: ArithmeticOperationType, operator1: Operator, operator2: Operator) {
        super(FlowType.ASSIGNMENT, strings.arithmetic, NodeColors.ARITHMETIC)

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)

        this._variable = variable
        this._operation = operation
        this._operator1 = operator1
        this._operator2 = operator2

        this.info = `${variable.name} = ${operator1.variableName} ${operation} ${operator2.variableName}`
    }

    get variable(): Variable {
        return this._variable
    }

    set variable(value: Variable) {
        this._variable = value
        this.info = `${value.name} = ${this.operator1.variableName} ${this.operation} ${this.operator2.variableName}`
    }

    get operation(): ArithmeticOperationType {
        return this._operation
    }

    set operation(value: ArithmeticOperationType) {
        this._operation = value
        this.info = `${this.variable.name} = ${this.operator1.variableName} ${value} ${this.operator2.variableName}`
    }

    get operator1(): Operator {
        return this._operator1
    }

    set operator1(value: Operator) {
        this._operator1 = value
        this.info = `${this.variable.name} = ${value.variableName} ${this.operation} ${this.operator2.variableName}`
    }

    get operator2(): Operator {
        return this._operator2
    }

    set operator2(value: Operator) {
        this._operator2 = value
        this.info = `${this.variable.name} = ${this.operator1.variableName} ${this.operation} ${value.variableName}`
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this._variable = object._variable
        this._operation = object._operation
        this._operator1 = object._operator1
        this._operator2 = object._operator2
    }

    serialize() {
        return _.merge(super.serialize(), {
            variable: this._variable,
            operation: this._operation,
            operator1: this._operator1,
            operator2: this._operator2
        })
    }
}
