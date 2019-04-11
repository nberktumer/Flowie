import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {Operator, OperatorType} from "../../../generator/flows/ArithmeticFlow"
import {ArithmeticFlowModel} from "./ArithmeticFlowModel"

export class ArithmeticFlowModelGenerator extends BaseFlowModelGenerator {
    create(data?: BasePropertiesState): BaseFlowModel | null {
        if (!data || data.variable === "" || data.operation === "" || data.operator1 === "" || data.operator2 === "")
            return null

        const var1 = JSON.parse(data.operator1) as Variable
        const var2 = JSON.parse(data.operator2) as Variable

        const op1 = new Operator(OperatorType.VARIABLE, var1.name, var1.value)
        const op2 = new Operator(OperatorType.VARIABLE, var2.name, var2.value)

        return new ArithmeticFlowModel(
            JSON.parse(data.variable),
            data.operation,
            op1,
            op2
        )
    }
}
