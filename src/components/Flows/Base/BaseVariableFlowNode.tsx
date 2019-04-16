import {Variable} from "../../../models/Variable"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {BaseInfoFlowNode} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowNode"
import {FlowType, VariableType} from "../../../models"

export abstract class BaseVariableFlowNode extends BaseInfoFlowNode {
    protected constructor(flowType?: FlowType, name: string = "Untitled", color: string = "rgb(0,192,255)") {
        super(flowType, name, color)

        this.variable = new Variable("", VariableType.BOOLEAN, "")
    }

    private variable: Variable

    getVariable(): Variable {
        return this.variable
    }

    setVariable(variable: Variable) {
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
}
