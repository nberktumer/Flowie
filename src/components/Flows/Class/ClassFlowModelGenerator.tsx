import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType, VariableType} from "../../../models"
import {ClassFlowNode} from "./ClassFlowNode"
import {FunctionalityFlowContent} from "../../../generator/flows/FunctionalityFlow"

export class ClassFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const classFlow = flow as ClassFlowNode

        const nextFlow = classFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.CLASS, classFlow.getID(), nextFlowId)
            .setFlowContent(new FunctionalityFlowContent(
                classFlow.name,
                classFlow.name,
                classFlow.argList,
                classFlow.variable,
                classFlow.returnType === VariableType.LIST ? classFlow.returnListType : classFlow.returnType,
                classFlow.returnType === VariableType.LIST
            ))
            .build()
    }
}
