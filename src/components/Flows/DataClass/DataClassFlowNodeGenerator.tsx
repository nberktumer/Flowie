import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {DataClassFlowNode} from "./DataClassFlowNode"
import {Variable} from "../../../models/Variable"

export class DataClassFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: DataClassFlowNode): BaseFlowNode | undefined {
        if (!data || !data.fieldList)
            return undefined

        const resultNode = node ? node : new DataClassFlowNode()
        resultNode.removeAllFields()

        for (const field of data.fieldList as Variable[]) {
            if (!field.type || !field.name || !field.value)
                continue

            resultNode.addField(field)
        }

        return resultNode
    }

    load = (node: any): BaseFlowNode => new DataClassFlowNode(true)
}
