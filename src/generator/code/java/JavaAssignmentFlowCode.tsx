import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {AssignmentFlowCode} from "../common/AssignmentFlowCode";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguage} from "../../../models";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";

export class JavaAssignmentFlowCode implements AssignmentFlowCode {

    generateMain(assignmentFlow: AssignmentFlow, clazz: Clazz): void {
        if (assignmentFlow.content == null)
            return

        const contentString = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.JAVA, assignmentFlow.content.variable)

        let variableSetCode = ""
        if (clazz.addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = `${ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.JAVA, assignmentFlow.content.variable.type)} `
        }

        clazz.writeCodeToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${contentString};`)
    }

}
