import {Variable} from "../../../models/Variable"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {FlowType, VariableType} from "../../../models"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {WhileFlowNode} from "../While/WhileFlowNode"
import {ArithmeticFlowNode} from "../Arithmetic/ArithmeticFlowNode"
import {InputFlowNode} from "../Input/InputFlowNode"
import {IfFlowNode} from "../If/IfFlowNode"

export abstract class BaseVariableFlowNode extends BaseFlowNode {
    private variable: Variable

    protected constructor(flowType?: FlowType, name: string = "Untitled", color: string = "rgb(0,192,255)") {
        super(flowType, name, color)

        this.variable = new Variable("", VariableType.BOOLEAN, "")
    }

    getVariable(): Variable {
        return this.variable
    }

    setVariable(variable: Variable) {
        if (this.variable.name && variable.name && variable.name !== this.variable.name) {
            this.updateNextFlowVariable(this.getNextFlow(), this.variable, variable, [])
        }

        this.variable = variable
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.variable = object.variable
    }

    serialize() {
        return _.merge(super.serialize(), {
            variable: this.variable
        })
    }

    updateNextFlowVariable(currentFlow: BaseFlowNode | null, oldVariable: Variable, newVariable: Variable, flowModelList: FlowModel[], scopeId: string | null = null) {
        if (!currentFlow)
            return

        // Check if the node has been visited before
        if (_.includes(flowModelList.map((flow) => flow.id), currentFlow.getID()))
            return

        switch (currentFlow.flowType) {
            case FlowType.ARITHMETIC: {
                const node = currentFlow as ArithmeticFlowNode

                if (node.getVariable().name === oldVariable.name) {
                    node.setVariable(newVariable)
                }
                if (node.getOperator1().name === oldVariable.name) {
                    node.setOperator1(newVariable)
                }
                if (node.getOperator2().name === oldVariable.name) {
                    node.setOperator2(newVariable)
                }
                break
            }
            case FlowType.OUTPUT: {
                const node = currentFlow as InputFlowNode

                if (node.getVariable().name === oldVariable.name) {
                    node.setVariable(newVariable)
                }
                break
            }
            case FlowType.WHILE: {
                const node = currentFlow as WhileFlowNode
                node.updateVariableInConditions(oldVariable, newVariable)
                this.updateNextFlowVariable((currentFlow as WhileFlowNode).getScopeFlow(), oldVariable, newVariable, flowModelList, currentFlow.getID())
                break
            }
            case FlowType.IF: {
                const node = currentFlow as IfFlowNode
                node.updateVariableInConditions(oldVariable, newVariable)
                this.updateNextFlowVariable((currentFlow as IfFlowNode).getTrueScopeFlow(), oldVariable, newVariable, flowModelList, currentFlow.getID())
                this.updateNextFlowVariable((currentFlow as IfFlowNode).getFalseScopeFlow(), oldVariable, newVariable, flowModelList, currentFlow.getID())
                break
            }
        }

        this.updateNextFlowVariable(currentFlow.getNextFlow(), oldVariable, newVariable, flowModelList, scopeId)
    }
}
