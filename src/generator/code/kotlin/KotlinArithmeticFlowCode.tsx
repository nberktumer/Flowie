import {ArithmeticFlow} from "../../flows/ArithmeticFlow";
import {ArithmeticFlowCode} from "../common/ArithmeticFlowCode";
import {Clazz} from "../../project/Clazz";
import {ArithmeticOperationType, ProgrammingLanguage} from "../../../models";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";

export class KotlinArithmeticFlowCode implements ArithmeticFlowCode {

    generateMain(arithmeticFlow: ArithmeticFlow, clazz: Clazz): void {
        if (arithmeticFlow.content == null)
            return

        let variableSetCode = ""

        if (clazz.addVariable(arithmeticFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        let operationCode = ""
        switch (arithmeticFlow.content.operation) {
            case ArithmeticOperationType.ADDITION:
                operationCode = "+"
                break
            case ArithmeticOperationType.SUBTRACTION:
                operationCode = "-"
                break
            case ArithmeticOperationType.MULTIPLICATION:
                operationCode = "*"
                break
            case ArithmeticOperationType.DIVISION:
                operationCode = "/"
                break
        }

        let operator1Code = ""
        let operator2Code = ""

        if (arithmeticFlow.content.operator1.name !== undefined) {
            operator1Code += arithmeticFlow.content.operator1.name
        } else {
            operator1Code += arithmeticFlow.content.operator1.value
        }

        if (arithmeticFlow.content.operator2.name !== undefined) {
            operator2Code += arithmeticFlow.content.operator2.name
        } else {
            operator2Code += arithmeticFlow.content.operator2.value
        }

        let fullOperationCode = ""

        if (arithmeticFlow.content.operation === ArithmeticOperationType.ROOT) {
            fullOperationCode = `Math.pow(${operator1Code}, 1 / ${operator2Code})`
        } else {
            fullOperationCode = `${operator1Code} ${operationCode} ${operator2Code}`
        }

        fullOperationCode = ProgrammingLanguageTypeConverter.convertArithmeticResult(
            ProgrammingLanguage.KOTLIN,
            fullOperationCode,
            arithmeticFlow.content.variable.type,
            arithmeticFlow.content.operator1.type,
            arithmeticFlow.content.operator2.type
        )

        clazz.writeCodeToMainFunction(`${variableSetCode}${arithmeticFlow.content.variable.name} = ${fullOperationCode}`)
        clazz.writeMainCodeFromFlow(arithmeticFlow.nextFlow())
    }

}
