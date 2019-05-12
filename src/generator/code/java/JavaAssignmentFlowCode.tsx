import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {AssignmentFlowCode} from "../common/AssignmentFlowCode";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguage, VariableType} from "../../../models";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";

export class JavaAssignmentFlowCode implements AssignmentFlowCode {

    generateMain(assignmentFlow: AssignmentFlow, clazz: Clazz): void {
        if (assignmentFlow.content == null)
            return

        let contentString = ""
        switch (assignmentFlow.content.variable.type) {
            case VariableType.DOUBLE:
            case VariableType.INT:
                contentString = assignmentFlow.content.variable.value.toString()
                break
            case VariableType.STRING:
                contentString = `"${assignmentFlow.content.variable.value}"`
                break
            default:
                break
        }

        let variableSetCode = ""
        if (clazz.addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = `${ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, assignmentFlow.content.variable.type)} `
        }

        clazz.writeCodeToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${contentString};`)
    }

    generateFunc(assignmentFlow: AssignmentFlow, clazz: Clazz): void {
    }

}
