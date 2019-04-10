import {CodeWriter} from "./code/CodeWriter";
import {BaseFlow} from "./flows/BaseFlow";
import {FlowModel} from "./FlowModelJSON";
import {AssignmentFlow} from "./flows/AssignmentFlow";
import {InputFlow} from "./flows/InputFlow";
import {OutputFlow} from "./flows/OutputFlow";
import {ArithmeticFlow} from "./flows/ArithmeticFlow";
import {WhileFlow} from "./flows/WhileFlow";
import {FlowType} from "../models";

export class CodeGenerator {

    private readonly flowJson: string

    constructor(flowJson: string) {
        this.flowJson = flowJson
    }

    generate(): string {
        CodeWriter.getInstance().reset()
        CodeWriter.getInstance().setFlows(this.convertToFlowObjects(JSON.parse(this.flowJson)))

        CodeWriter.getInstance().flows.forEach((value) => {
            console.log("Creating function code")
            value.createFunctionCode()
        })

        CodeWriter.getInstance().generateMain()

        return CodeWriter.getInstance().codes.join("\n")
    }

    private convertToFlowObjects(flowModels: FlowModel[]): Map<string, BaseFlow> {
        const baseFlowMap = new Map<string, BaseFlow>()

        flowModels.forEach((value) => {

                switch (value.type) {
                    case FlowType.ASSIGNMENT:
                        baseFlowMap.set(value.id, new AssignmentFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.assignmentFlowContent
                        ))
                        break
                    case FlowType.INPUT:
                        baseFlowMap.set(value.id, new InputFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.inputFlowContent
                        ))
                        break
                    case FlowType.OUTPUT:
                        baseFlowMap.set(value.id, new OutputFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.outputFlowContent
                        ))
                        break
                    case FlowType.ARITHMETIC:
                        baseFlowMap.set(value.id, new ArithmeticFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.arithmeticFlowContent
                        ))
                        break
                    case FlowType.WHILE:
                        baseFlowMap.set(value.id, new WhileFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.whileFlowContent
                        ))
                        break
                    /*
                    case "if":
                        baseFlowList.push(new IfFlow(
                            value.id,
                            value.type,
                            value.ifFlowContent
                        ))
                        break
                    case "for":
                        baseFlowList.push(new ForFlow(
                            value.id,
                            value.type,
                            value.forFlowContent
                        ))
                        break
                     */

                    default :
                        break

                }
            }
        )

        return baseFlowMap
    }
}
