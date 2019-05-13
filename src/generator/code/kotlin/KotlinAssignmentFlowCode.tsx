import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {AssignmentFlowCode} from "../common/AssignmentFlowCode";
import {VariableType} from "../../../models";
import {Clazz} from "../../project/Clazz";

export class KotlinAssignmentFlowCode implements AssignmentFlowCode {

    generateMain(assignmentFlow: AssignmentFlow, clazz: Clazz): void {
        if (assignmentFlow.content == null)
            return

        let contentString = ""
        switch (assignmentFlow.content.variable.type) {
            case VariableType.INT:
            case VariableType.DOUBLE:
                contentString = assignmentFlow.content.variable.value.toString()
                break
            case VariableType.STRING:
                contentString = `"${assignmentFlow.content.variable.value}"`
                break
            default:
                console.log("default...")
                break
        }

        let variableSetCode = ""
        if (clazz.addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        clazz.writeCodeToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${contentString}`)
        clazz.writeMainCodeFromFlow(assignmentFlow.nextFlow())
    }

}
