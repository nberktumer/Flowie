import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {DataClassFlowNode} from "./DataClassFlowNode"
import {Variable} from "../../../models/Variable"
import {DataClazz} from "../../../generator/project/DataClazz"

export class DataClassFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: DataClassFlowNode): BaseFlowNode | undefined {
        if (!data || !data.selectedClass || !data.fields || !data.variableName)
            return undefined

        try {
            const clazz = JSON.parse(data.selectedClass) as DataClazz

            const resultNode = node ? node : new DataClassFlowNode(data.variableName, clazz.name)
            resultNode.removeAllFields()

            for (const field of data.fields) {
                if (!field.field || !field.variable)
                    continue

                resultNode.addField(new Variable(field.field.name, field.field.type, JSON.parse(field.variable)))
            }

            return resultNode
        } catch (e) {
            console.error(e)
            return undefined
        }
    }

    load = (node: any): BaseFlowNode => new DataClassFlowNode((node as DataClassFlowNode).variableName, (node as DataClassFlowNode).name, true)
}
