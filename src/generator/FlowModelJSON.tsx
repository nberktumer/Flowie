import {ArithmeticFlowContent} from "./ArithmeticFlow";
import {OutputFlowContent} from "./OutputFlow";
import {InputFlowContent} from "./InputFlow";
import {AssignmentFlowContent} from "./AssignmentFlow";

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
