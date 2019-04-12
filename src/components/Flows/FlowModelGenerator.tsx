import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowModel} from "../../generator/FlowModelJSON"
import {FlowModelFactory} from "./FlowModelFactory"
import {FlowType} from "../../models"
import {WhileFlowNode} from "./While/WhileFlowNode"

export class FlowModelGenerator {

    private constructor() {
    }

    static generate(initialFlow: BaseFlowNode | null): FlowModel[] {
        const flowModelList: FlowModel[] = []

        this.generateFlowModel(initialFlow, flowModelList)

        return flowModelList
    }

    private static generateFlowModel(currentFlow: BaseFlowNode | null, flowModelList: FlowModel[], scopeId: string | null = null) {
        if (currentFlow == null || (scopeId != null && currentFlow.getID() === scopeId))
            return

        switch (currentFlow.type) {
            case FlowType.WHILE:
                this.generateFlowModel((currentFlow as WhileFlowNode).getScopeFlow(), flowModelList, currentFlow.getID())
                break
            default:
                break
        }

        const flowModel = FlowModelFactory.create(currentFlow)

        if (flowModel)
            flowModelList.push(flowModel)

        this.generateFlowModel(currentFlow.getNextFlow(), flowModelList, scopeId)
    }
}
