import {InputFlow} from "../../flows/InputFlow";
import {InputFlowCode} from "../common/InputFlowCode";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage, VariableType} from "../../../models";
import {Variable} from "../../../models/Variable";
import {Func} from "../../project/Func";
import {Clazz} from "../../project/Clazz";
import {Code} from "../Code";

export class JavaInputFlowCode implements InputFlowCode {

    generateMain(inputFlow: InputFlow, clazz: Clazz): void {
    }

    generateFunc(inputFlow: InputFlow, clazz: Clazz): void {
        if (inputFlow.content == null)
            return

        clazz.addDependency("import java.util.Scanner;")

        const code = new Code(clazz.indentationCount)
        code.insert(`System.out.println("Please enter value for ${inputFlow.content.variable.name}");`)
        code.insert(`Scanner scanner = new Scanner(System.in);`)

        const variableTypeString = ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, inputFlow.content.variable.type)
        switch (inputFlow.content.variable.type) {
            case VariableType.INT:
                code.insert(`${variableTypeString} input = scanner.nextInt();`)
                break
            case VariableType.DOUBLE:
                code.insert(`${variableTypeString} input = scanner.nextDouble();`)
                break
            case VariableType.STRING:
                code.insert(`${variableTypeString} input = scanner.nextLine();`)
                break
            default:
                break
        }

        code.insert(`scanner.close();`)
        code.insert(`return input;`)

        const parameters: Variable[] = []

        const func = new Func(
            inputFlow.functionName(),
            parameters,
            ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, inputFlow.content.variable.type),
            code
        )

        clazz.functions.push(func)
    }

}
