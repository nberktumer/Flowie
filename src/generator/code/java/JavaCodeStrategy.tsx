import {CodeStrategy} from "../CodeStrategy";
import {Func, Parameter} from "../../Func";
import {CodeWriter} from "../CodeWriter";
import {ArithmeticFlow} from "../../flows/ArithmeticFlow";
import {InputFlow} from "../../flows/InputFlow";
import {OutputFlow} from "../../flows/OutputFlow";
import {WhileFlow} from "../../flows/WhileFlow";
import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {ArithmeticOperationType, ProgrammingLanguage, VariableType} from "../../../models";
import {Class} from "../Class";
import {ConditionOperation} from "../../../models/VariableEnums";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {Variable} from "../../../models/Variable";
import {RandomFlow} from "../../flows/RandomFlow";
import {IfFlow} from "../../flows/IfFlow";

export class JavaCodeStrategy implements CodeStrategy {

    initClass(clazz: Class): void {
        CodeWriter.getInstance().writeLineToMainFunction(`public class ${clazz.className} {`)
        CodeWriter.getInstance().scopeCount++
    }

    finishClass(): void {
        CodeWriter.getInstance().scopeCount--
        CodeWriter.getInstance().writeLine("}")
        CodeWriter.getInstance().writeLine("")
    }

    initMain(): void {
        CodeWriter.getInstance().writeLineToMainFunction(`public static void main(String args[]) {`)
        CodeWriter.getInstance().scopeCount++

    }

    finishMain(): void {
        CodeWriter.getInstance().scopeCount--
        CodeWriter.getInstance().writeLineToMainFunction("}")
        CodeWriter.getInstance().writeLineToMainFunction("")
    }

    writeFunctionSignature(func: Func): void {
        let returnTypeString = ""
        if (func.returnType === undefined) {
            returnTypeString += "void"
        } else {
            returnTypeString += `${func.returnType}`
        }

        let parameterString = ""

        func.parameters.forEach((value, index) => {
            parameterString += `${value.type} ${value.name}`
            if (index !== func.parameters.length - 1) {
                parameterString += ", "
            }
        })

        CodeWriter.getInstance().writeLine(`private static ${returnTypeString} ${func.functionName}(${parameterString}) `)
        CodeWriter.getInstance().appendToLastLine(" {")
        CodeWriter.getInstance().scopeCount++

        func.codeLines.forEach((value) => {
                CodeWriter.getInstance().writeLine(value)
            }
        )

        CodeWriter.getInstance().scopeCount--
        CodeWriter.getInstance().writeLine("}")
        CodeWriter.getInstance().writeLine("")
    }

    writeArithmeticFunction(arithmeticFlow: ArithmeticFlow): void {
        if (arithmeticFlow.content == null)
            return

        const functionLines: string[] = []

        const parameters: Parameter[] = []

        if (arithmeticFlow.content.operator1.name !== undefined) {
            parameters.push(new Parameter(
                arithmeticFlow.content.operator1.name,
                ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, arithmeticFlow.content.operator1.type)))
        }

        if (arithmeticFlow.content.operator2.name !== undefined) {
            parameters.push(new Parameter(
                arithmeticFlow.content.operator2.name,
                ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, arithmeticFlow.content.operator2.type)))
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

        functionLines.push(`return ${operator1Code} ${operationCode} ${operator2Code};`)

        const func = new Func(
            arithmeticFlow.functionName(),
            parameters,
            ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, arithmeticFlow.content.variable.type),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)
    }

    writeArithmeticMain(arithmeticFlow: ArithmeticFlow): void {
        if (arithmeticFlow.content == null)
            return

        let variableSetCode = ""

        if (CodeWriter.getInstance().addVariable(arithmeticFlow.content.variable.name)) {
            variableSetCode = `${ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, arithmeticFlow.content.variable.type)} `
        }

        CodeWriter.getInstance().writeLineToMainFunction(
            `${variableSetCode}${arithmeticFlow.content.variable.name} = ${arithmeticFlow.functionInvocation()};`
        )
        CodeWriter.getInstance().writeMainCodeFromFlow(arithmeticFlow.nextFlow())
    }

    writeAssignmentFunction(assignmentFlow: AssignmentFlow): void {
    }

    writeAssignmentMain(assignmentFlow: AssignmentFlow): void {
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
        if (CodeWriter.getInstance().addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = `${ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, assignmentFlow.content.variable.type)} `
        }

        CodeWriter.getInstance().writeLineToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${contentString};`)
        CodeWriter.getInstance().writeMainCodeFromFlow(assignmentFlow.nextFlow())
    }

    writeInputFunction(inputFlow: InputFlow): void {
        if (inputFlow.content == null)
            return

        CodeWriter.getInstance().addDependency("import java.util.Scanner;")

        const functionLines: string[] = []
        functionLines.push(`System.out.println("Please enter value for ${inputFlow.content.variable.name}");`)
        functionLines.push(`Scanner scanner = new Scanner(System.in);`)

        const variableTypeString = ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, inputFlow.content.variable.type)
        switch (inputFlow.content.variable.type) {
            case VariableType.INT:
                functionLines.push(`${variableTypeString} input = scanner.nextInt();`)
                break
            case VariableType.DOUBLE:
                functionLines.push(`${variableTypeString} input = scanner.nextDouble();`)
                break
            case VariableType.STRING:
                functionLines.push(`${variableTypeString} input = scanner.next();`)
                break
            default:
                break
        }

        functionLines.push(`scanner.close();`)
        functionLines.push(`return input;`)

        const parameters: Parameter[] = []

        const func = new Func(
            inputFlow.functionName(),
            parameters,
            ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, inputFlow.content.variable.type),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)
    }

    writeInputMain(inputFlow: InputFlow): void {
        if (inputFlow.content == null)
            return

        let variableSetCode = ""
        if (CodeWriter.getInstance().addVariable(inputFlow.content.variable.name)) {
            variableSetCode = `${ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, inputFlow.content.variable.type)} `
        }

        CodeWriter.getInstance().writeLineToMainFunction(
            `${variableSetCode}${inputFlow.content.variable.name} = ${inputFlow.functionInvocation()};`
        )

        CodeWriter.getInstance().writeMainCodeFromFlow(inputFlow.nextFlow())
    }

    writeOutputFunction(outputFlow: OutputFlow): void {
        if (outputFlow.content == null || outputFlow.content.variable.name === undefined)
            return

        const functionLines: string[] = []
        const parameters: Parameter[] = [
            new Parameter(
                outputFlow.content.variable.name,
                ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, outputFlow.content.variable.type)
            )
        ]

        const func = new Func(
            outputFlow.functionName(),
            parameters,
            undefined,
            functionLines
        )

        let printString = ""

        if (!outputFlow.content.variable.name) {
            printString = outputFlow.content.variable.value
        } else {
            printString = outputFlow.content.variable.name
        }

        functionLines.push(`System.out.println("Value of ${outputFlow.content.variable.name} is " + ${printString});`)
        CodeWriter.getInstance().writeFunction(func)
    }

    writeOutputMain(outputFlow: OutputFlow): void {
        CodeWriter.getInstance().writeLineToMainFunction(`${outputFlow.functionInvocation()};`)
        CodeWriter.getInstance().writeMainCodeFromFlow(outputFlow.nextFlow())
    }

    writeWhileFunction(whileFlow: WhileFlow): void {

    }

    writeWhileMain(whileFlow: WhileFlow): void {
        if (!whileFlow.content)
            return

        const nextScopeId = whileFlow.content.scopeId

        let conditionCode = ""
        whileFlow.content.conditions.forEach((condition) => {
            conditionCode += condition.first.name

            if (condition.second) {
                conditionCode += " "

                switch (condition.operation) {
                    case ConditionOperation.EQUALS:
                        conditionCode += "=="
                        break
                    case ConditionOperation.NOT_EQUALS:
                        conditionCode += "!="
                        break
                }

                if (!condition.second.name) {
                    conditionCode += " " + condition.second.value
                } else {
                    conditionCode += " " + condition.second.name
                }
            }
        })

        CodeWriter.getInstance().writeLineToMainFunction("while(" + conditionCode + ") {")
        CodeWriter.getInstance().scopeCount++

        if (nextScopeId != null) {
            CodeWriter.getInstance().addToLoopStack(whileFlow.id)
            CodeWriter.getInstance().writeMainCodeFromFlow(nextScopeId)
        }

        CodeWriter.getInstance().scopeCount--
        CodeWriter.getInstance().writeLineToMainFunction("}")
        CodeWriter.getInstance().writeMainCodeFromFlow(whileFlow.nextFlow())
    }

    writeIfFunction(ifFlow: IfFlow): void {
    }

    writeIfMain(ifFlow: IfFlow): void {
        if (ifFlow.content == null)
            return

        let conditionCode = ""
        ifFlow.content.conditions.forEach((condition) => {
            conditionCode += condition.first.name

            if (condition.second !== undefined) {
                conditionCode += " "

                switch (condition.operation) {
                    case ConditionOperation.EQUALS:
                        conditionCode += "=="
                        break
                    case ConditionOperation.NOT_EQUALS:
                        conditionCode += "!="
                        break
                }

                if (!condition.second.name) {
                    conditionCode += " " + condition.second.value
                } else {
                    conditionCode += " " + condition.second.name
                }
            }
        })

        CodeWriter.getInstance().writeLineToMainFunction("if(" + conditionCode + ") {")
        CodeWriter.getInstance().scopeCount++

        if (ifFlow.content.trueScopeId != null) {
            CodeWriter.getInstance().addToLoopStack(ifFlow.id)
            CodeWriter.getInstance().writeMainCodeFromFlow(ifFlow.content.trueScopeId)
        }

        CodeWriter.getInstance().scopeCount--

        if (ifFlow.content.falseScopeId != null) {
            CodeWriter.getInstance().writeLineToMainFunction("} else {")
            CodeWriter.getInstance().scopeCount++

            CodeWriter.getInstance().addToLoopStack(ifFlow.id)
            CodeWriter.getInstance().writeMainCodeFromFlow(ifFlow.content.falseScopeId)

            CodeWriter.getInstance().scopeCount--
            CodeWriter.getInstance().writeLineToMainFunction("}")

        }

        CodeWriter.getInstance().writeMainCodeFromFlow(ifFlow.nextFlow())
    }

    writeRandomFunction(randomFlow: RandomFlow): void {
    }

    writeRandomMain(randomFlow: RandomFlow): void {
        CodeWriter.getInstance().addGlobalVariable("Random random = Random();")
        CodeWriter.getInstance().addDependency("import java.util.Random")

        if (randomFlow.content == null)
            return

        let variableSetCode = ""
        if (CodeWriter.getInstance().addVariable(randomFlow.content.variable.name)) {
            variableSetCode = "double "
        }

        CodeWriter.getInstance().writeLineToMainFunction(
            `${variableSetCode}${randomFlow.content.variable.name} = ${randomFlow.content.min} + (${randomFlow.content.max} - ${randomFlow.content.min}) * random.nextDouble();`
        )

        CodeWriter.getInstance().writeMainCodeFromFlow(randomFlow.nextFlow())
    }

    addDependenciesAndGlobalVariables(dependencies: Set<string>, globalVariables: Set<string>): void {
        dependencies.add("")
        let index = 0

        dependencies.forEach((value => {
                CodeWriter.getInstance().writeLineToIndex(value, index)
                index++
            }
        ))

        CodeWriter.getInstance().writeLineToIndex("", index)
        index++

        globalVariables.forEach((value => {
            CodeWriter.getInstance().writeLineToIndex(value, index)
            index++
        }))
    }

}
