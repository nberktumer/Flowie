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

    flowJson: string

    constructor(flowJson: string) {
        this.flowJson = flowJson
    }

    generate(): string {
        CodeWriter.getInstance().setFlows(this.convertToFlowObjects(JSON.parse(this.flowJson)))

        CodeWriter.getInstance().flows.forEach((value) => {
            value.createFunctionCode()
        })

        CodeWriter.getInstance().initMain()
        CodeWriter.getInstance().flows[0].createMainCode()

        CodeWriter.getInstance().finishMain()

        return CodeWriter.getInstance().codes.join("\n")
    }

    convertToFlowObjects(flowModels: FlowModel[]): BaseFlow[] {
        const baseFlowList: BaseFlow[] = []

        flowModels.forEach((value) => {
                switch (value.type) {
                    case FlowType.ASSIGNMENT:
                        baseFlowList.push(new AssignmentFlow(
                            value.id,
                            value.type,
                            value.assignmentFlowContent
                        ))
                        break
                    case FlowType.INPUT:
                        baseFlowList.push(new InputFlow(
                            value.id,
                            value.type,
                            value.inputFlowContent
                        ))
                        break
                    case FlowType.OUTPUT:
                        baseFlowList.push(new OutputFlow(
                            value.id,
                            value.type,
                            value.outputFlowContent
                        ))
                        break
                    case FlowType.ARITHMETIC:
                        baseFlowList.push(new ArithmeticFlow(
                            value.id,
                            value.type,
                            value.arithmeticFlowContent
                        ))
                        break
                    case FlowType.WHILE:
                        baseFlowList.push(new WhileFlow(
                            value.id,
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

        return baseFlowList
    }
}
