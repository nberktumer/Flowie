import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {AssignmentFlowCode} from "../common/AssignmentFlowCode";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguage} from "../../../models";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {Variable} from "../../../models/Variable";

export class JavaAssignmentFlowCode implements AssignmentFlowCode {

    generateMain(assignmentFlow: AssignmentFlow, clazz: Clazz): void {
        if (assignmentFlow.content == null)
            return

        let variableSetCode = ""
        if (clazz.addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = `${ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.JAVA, assignmentFlow.content.variable.type)} `
        }

        let assignedFromCode = ""

        if (assignmentFlow.content.variable.value instanceof Variable) {
            assignedFromCode += assignmentFlow.content.variable.value.name
        } else {
            assignedFromCode = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.JAVA, assignmentFlow.content.variable)
        }

        clazz.writeCodeToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${assignedFromCode};`)
        clazz.writeMainCodeFromFlow(assignmentFlow.nextFlow())
    }

}
