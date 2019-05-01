import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowModel} from "../../generator/FlowModelJSON"
import {FlowModelFactory} from "./FlowModelFactory"
import {FlowType} from "../../models"
import {WhileFlowNode} from "./While/WhileFlowNode"
import * as _ from "lodash"
import {IfFlowNode} from "./If/IfFlowNode"

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

        // Check if the node has been visited before
        if (_.includes(flowModelList.map((flow) => flow.id), currentFlow.getID()))
            return

        switch (currentFlow.flowType) {
            case FlowType.WHILE:
                this.generateFlowModel((currentFlow as WhileFlowNode).getScopeFlow(), flowModelList, currentFlow.getID())
                break
            case FlowType.IF:
                this.generateFlowModel((currentFlow as IfFlowNode).getTrueScopeFlow(), flowModelList, currentFlow.getID())
                this.generateFlowModel((currentFlow as IfFlowNode).getFalseScopeFlow(), flowModelList, currentFlow.getID())
                break
        }

        const flowModel = FlowModelFactory.create(currentFlow)
        if (flowModel)
            flowModelList.push(flowModel)

        this.generateFlowModel(currentFlow.getNextFlow(), flowModelList, scopeId)
    }
}
