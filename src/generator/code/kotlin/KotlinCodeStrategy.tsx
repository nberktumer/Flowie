import {CodeStrategy} from "../CodeStrategy";
import {Func, Parameter} from "../../Func";
import {CodeWriter} from "../CodeWriter";
import {ArithmeticFlow, OperatorType} from "../../flows/ArithmeticFlow";
import {InputFlow} from "../../flows/InputFlow";
import {OutputFlow} from "../../flows/OutputFlow";
import {WhileFlow} from "../../flows/WhileFlow";
import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {ArithmeticOperationType, VariableType} from "../../../models";
import {ConditionOperation} from "../../../models/VariableEnums";
import {Variable} from "../../../models/Variable";
import {Value} from "../../../models/Condition";

export class KotlinCodeStrategy implements CodeStrategy {
    initMain(): void {
        CodeWriter.getInstance().writeLineToMainFunction(`fun main(args: Array<String\>) {`)
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
            returnTypeString += ""
        } else {
            returnTypeString += ": " + func.returnType
        }

        let parameterString = ""

        func.parameters.forEach((value, index) => {
            parameterString += `${value.name}: ${value.type}`
            if (index !== func.parameters.length - 1) {
                parameterString += ", "
            }
        })

        CodeWriter.getInstance().writeLine(`fun ${func.functionName}(${parameterString})${returnTypeString}`)
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

        if (arithmeticFlow.content.operator1.type === OperatorType.VARIABLE) {
            if (arithmeticFlow.content.operator1.variableName != null) {
                parameters.push(new Parameter(
                    arithmeticFlow.content.operator1.variableName,
                    VariableType.INT.toString()))
            }
        }

        if (arithmeticFlow.content.operator2.type === OperatorType.VARIABLE) {
            if (arithmeticFlow.content.operator2.variableName != null) {
                parameters.push(new Parameter(
                    arithmeticFlow.content.operator2.variableName,
                    VariableType.INT.toString()))
            }
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

        switch (arithmeticFlow.content.operator1.type) {
            case OperatorType.CONSTANT:
                operator1Code += arithmeticFlow.content.operator1.constantValue
                break
            case OperatorType.VARIABLE:
                operator1Code += arithmeticFlow.content.operator1.variableName
                break
        }

        switch (arithmeticFlow.content.operator2.type) {
            case OperatorType.CONSTANT:
                operator2Code += arithmeticFlow.content.operator2.constantValue
                break
            case OperatorType.VARIABLE:
                operator2Code += arithmeticFlow.content.operator2.variableName
                break
        }

        functionLines.push(`return ${operator1Code} ${operationCode} ${operator2Code}`)

        const func = new Func(
            arithmeticFlow.functionName(),
            parameters,
            VariableType.INT.toString(),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)

    }

    writeArithmeticMain(arithmeticFlow: ArithmeticFlow): void {
        if (arithmeticFlow.content == null)
            return

        let variableSetCode = ""

        if (CodeWriter.getInstance().addVariable(arithmeticFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        CodeWriter.getInstance().writeLineToMainFunction(
            `${variableSetCode}${arithmeticFlow.content.variable.name} = ${arithmeticFlow.functionInvocation()}`
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
            case VariableType.INT:
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
        if (CodeWriter.getInstance().addVariable(assignmentFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        CodeWriter.getInstance().writeLineToMainFunction(`${variableSetCode}${assignmentFlow.content.variable.name} = ${contentString}`)
        CodeWriter.getInstance().writeMainCodeFromFlow(assignmentFlow.nextFlow())
    }

    writeInputFunction(inputFlow: InputFlow): void {
        if (inputFlow.content == null)
            return

        const functionLines: string[] = []
        functionLines.push(`println("Please enter value for ${inputFlow.content.variable.name}")`)

        let scanCode = ""
        switch (inputFlow.content.variable.type) {
            case VariableType.INT:
                scanCode = "readLine()!!.toInt()"
                break
            case VariableType.STRING:
                scanCode = "readLine()"
                break
            default:
                break
        }

        functionLines.push(`return ${scanCode}`)

        const parameters: Parameter[] = []

        const func = new Func(
            inputFlow.functionName(),
            parameters,
            inputFlow.content.variable.type.toString(),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)
    }

    writeInputMain(inputFlow: InputFlow): void {
        if (inputFlow.content == null)
            return

        let variableSetCode = ""
        if (CodeWriter.getInstance().addVariable(inputFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        CodeWriter.getInstance().writeLineToMainFunction(
            `${variableSetCode}${inputFlow.content.variable.name} = ${inputFlow.functionInvocation()}`
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
                outputFlow.content.variable.type.toString()
            )
        ]

        const func = new Func(
            outputFlow.functionName(),
            parameters,
            undefined,
            functionLines
        )

        functionLines.push(`println("Value of ${outputFlow.content.variable.name} is \${${outputFlow.content.variable.name}}")`)
        CodeWriter.getInstance().writeFunction(func)
    }

    writeOutputMain(outputFlow: OutputFlow): void {
        CodeWriter.getInstance().writeLineToMainFunction(outputFlow.functionInvocation())
        CodeWriter.getInstance().writeMainCodeFromFlow(outputFlow.nextFlow())
    }

    writeWhileFunction(whileFlow: WhileFlow): void {

    }

    writeWhileMain(whileFlow: WhileFlow): void {
        if (whileFlow.content == null)
            return

        const nextScopeId = whileFlow.content.scopeId

        let conditionCode = ""
        whileFlow.content.conditions.forEach((condition) => {
            conditionCode += condition.first.name

            if (condition.second !== null) {
                conditionCode += " "

                switch (condition.operation) {
                    case ConditionOperation.EQUALS:
                        conditionCode += "=="
                        break
                    case ConditionOperation.NOT_EQUALS:
                        conditionCode += "!="
                        break
                }

                if (condition.second instanceof Variable) {
                    conditionCode += " " + condition.second.name
                } else if (condition.second instanceof Value) {
                    conditionCode += " " + condition.second.value
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

}
