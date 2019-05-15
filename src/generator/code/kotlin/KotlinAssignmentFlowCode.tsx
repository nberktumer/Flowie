import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {AssignmentFlowCode} from "../common/AssignmentFlowCode";
import {ProgrammingLanguage} from "../../../models";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";

export class KotlinAssignmentFlowCode implements AssignmentFlowCode {

    generateMain(assignmentFlow: AssignmentFlow, clazz: Clazz): void {
        if (assignmentFlow.content == null)
            return

        const contentString = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.KOTLIN, assignmentFlow.content.variable)

        let variableSetCode = ""
        if (clazz.addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        clazz.writeCodeToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${contentString}`)
        clazz.writeMainCodeFromFlow(assignmentFlow.nextFlow())
    }

}
