import {BaseFlowModel} from "../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {FlowModel} from "../../generator/FlowModelJSON"
import {FlowObjectFactory} from "./FlowObjectFactory"
import {FlowType} from "../../models"
import {WhileFlowModel} from "./While/WhileFlowModel"

export class FlowGenerator {

    private constructor() {
    }

    static generate(initialFlow: BaseFlowModel | null): FlowModel[] {
        const flowModelList: FlowModel[] = []

        this.generateFlowModel(initialFlow, flowModelList)

        return flowModelList
    }

    private static generateFlowModel(currentFlow: BaseFlowModel | null, flowModelList: FlowModel[], scopeId: string | null = null) {
        if (currentFlow == null || (scopeId != null && currentFlow.getID() === scopeId))
            return

        switch (currentFlow.type) {
            case FlowType.WHILE:
                this.generateFlowModel((currentFlow as WhileFlowModel).getScopeFlow(), flowModelList, currentFlow.getID())
                break
            default:
                break
        }

        const flowModel = FlowObjectFactory.create(currentFlow)

        if (flowModel)
            flowModelList.push(flowModel)

        this.generateFlowModel(currentFlow.getNextFlow(), flowModelList, scopeId)
    }
}
