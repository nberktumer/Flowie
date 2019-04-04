import {ArithmeticFlowContent} from "./flows/ArithmeticFlow";
import {OutputFlowContent} from "./flows/OutputFlow";
import {InputFlowContent} from "./flows/InputFlow";
import {AssignmentFlowContent} from "./flows/AssignmentFlow";

export class FlowModel {
    type: string
    id: number
    assignmentFlowContent: AssignmentFlowContent
    inputFlowContent: InputFlowContent
    outputFlowContent: OutputFlowContent
    arithmeticFlowContent: ArithmeticFlowContent
    // forFlowContent: ForFlowContent,
    // ifFlowContent: IfFlowContent,
    // whileFlowContent: WhileFlowContent

    constructor(
        type: string,
        id: number,
        assignmentFlowContent: AssignmentFlowContent,
        inputFlowContent: InputFlowContent,
        outputFlowContent: OutputFlowContent,
        arithmeticFlowContent: ArithmeticFlowContent
        // forFlowContent: ForFlowContent,
        // ifFlowContent: IfFlowContent,
        // whileFlowContent: WhileFlowContent
    ) {
        this.type = type
        this.id = id
        this.assignmentFlowContent = assignmentFlowContent
        this.inputFlowContent = inputFlowContent
        this.outputFlowContent = outputFlowContent
        this.arithmeticFlowContent = arithmeticFlowContent
    }
}
