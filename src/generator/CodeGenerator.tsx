import {CodeWriter} from "./CodeWriter";
import {BaseFlow} from "./flows/BaseFlow";
import {FlowModel} from "./FlowModelJSON";
import {AssignmentFlow} from "./flows/AssignmentFlow";
import {InputFlow} from "./flows/InputFlow";
import {OutputFlow} from "./flows/OutputFlow";
import {ArithmeticFlow} from "./flows/ArithmeticFlow";

export class CodeGenerator {

    flowJson: string

    constructor(flowJson: string) {
        this.flowJson = flowJson
    }

    generate() {
        CodeWriter.getInstance().initMain()
        CodeWriter.getInstance().setFlows(this.convertToFlowObjects(JSON.parse(this.flowJson)))
        CodeWriter.getInstance().flows[0].createMainCode()

        CodeWriter.getInstance().finishMain()
        CodeWriter.getInstance().flows.forEach((value) => {
            value.createFunctionCode()
        })

        CodeWriter.getInstance().codes.forEach((value) => {
            console.log(value)
        })
    }

    convertToFlowObjects(flowModels: FlowModel[]): BaseFlow[] {
        const baseFlowList: BaseFlow[] = []

        flowModels.forEach((value) => {
                switch (value.type) {
                    case "assignment":
                        baseFlowList.push(new AssignmentFlow(
                            value.id,
                            value.type,
                            value.assignmentFlowContent
                        ))
                        break
                    case "input":
                        baseFlowList.push(new InputFlow(
                            value.id,
                            value.type,
                            value.inputFlowContent
                        ))
                        break
                    case "output":
                        baseFlowList.push(new OutputFlow(
                            value.id,
                            value.type,
                            value.outputFlowContent
                        ))
                        break
                    case "arithmetic":
                        baseFlowList.push(new ArithmeticFlow(
                            value.id,
                            value.type,
                            value.arithmeticFlowContent
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
                    case "while":
                        baseFlowList.push(new WhileFlow(
                            value.id,
                            value.type,
                            value.whileFlowContent
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
