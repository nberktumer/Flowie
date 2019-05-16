import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {AssignmentFlowCode} from "../common/AssignmentFlowCode";
import {ProgrammingLanguage} from "../../../models";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {Variable} from "../../../models/Variable";

export class KotlinAssignmentFlowCode implements AssignmentFlowCode {

    generateMain(assignmentFlow: AssignmentFlow, clazz: Clazz): void {
        if (assignmentFlow.content == null)
            return

        let variableSetCode = ""
        if (clazz.addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        let assignedFromCode = ""

        const valueAsVariable = assignmentFlow.content.variable.value as Variable
        if (valueAsVariable.name) {
            assignedFromCode += valueAsVariable.name
        } else {
            assignedFromCode = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.KOTLIN, valueAsVariable.value, valueAsVariable.type)
        }

        clazz.writeCodeToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${assignedFromCode}`)
        clazz.writeMainCodeFromFlow(assignmentFlow.nextFlow())
    }

}
