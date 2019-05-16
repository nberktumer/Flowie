import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {ClassFlowNode} from "./ClassFlowNode"
import {Variable} from "../../../models/Variable"

export class ClassFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ClassFlowNode): BaseFlowNode | undefined {
        if (!data || !data.selectedClassName || !data.fields || !data.returnType)
            return undefined

        try {
            const resultNode = node ? node : new ClassFlowNode(JSON.parse(data.variable), data.returnType, data.selectedClassName)
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

    load = (node: any): BaseFlowNode => new ClassFlowNode((node as ClassFlowNode).variable, (node as ClassFlowNode).returnType, (node as ClassFlowNode).name, true)
}
