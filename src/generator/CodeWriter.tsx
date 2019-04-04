import {BaseFlow} from "./models/BaseFlow";
import {Func} from "./Func";

export class CodeWriter {
    static getInstance(): CodeWriter {
        return this.instance || (this.instance = new this())
    }

    private static instance: CodeWriter

    spacing = "\t"
    scopeCount = 0
    mainFunctionLineIndex = 0
    flows: BaseFlow[] = []
    codes: string[] = []

    private constructor() {

    }

    setFlows(value: BaseFlow[]) {
        this.flows = value;
    }

    writeLineToMainFunction(line: string) {
        this.codes.splice(this.mainFunctionLineIndex, 0, this.createSpacing() + line)
        this.mainFunctionLineIndex++
    }

    writeLine(line: string) {
        this.codes.push(this.createSpacing() + line)
    }

    appendToLastLine(str: string) {
        const lastIndex = this.codes.length - 1
        let last = this.codes[lastIndex]
        last += str
        this.codes[lastIndex] = last
    }

    initMain() {
        this.writeLineToMainFunction(`fun main(args: Array<String\>) {`)
        this.scopeCount++
    }

    finishMain() {
        this.scopeCount--
        this.writeLineToMainFunction("}")
        this.writeLineToMainFunction("")
    }

    openScope() {
        this.writeLine("{")
        this.scopeCount++
    }

    closeScope() {
        this.scopeCount--
        this.writeLine("}")
    }

    writeFunction(func: Func) {
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

        this.writeLine(`fun ${func.functionName}(${parameterString})${returnTypeString}`)
        this.appendToLastLine("{")
        this.scopeCount++

        func.codeLines.forEach((value) => {
                this.writeLine(value)
            }
        )

        this.scopeCount--
        this.writeLine("}")
        this.writeLine("")
    }

    getFunctionInvocationFromFlowIndex(index: number): string {
        if (index !== -1) {
            return this.flows[index].functionInvocation()
        }

        return ""
    }

    writeCodeFromFlowIndex(index: number) {
        if (index !== -1) {
            this.flows[index].createMainCode()
        }
    }

    private createSpacing(): string {
        let spacing = ""
        for (let i = 0; i < this.scopeCount; i++) {
            spacing += this.spacing
        }

        return spacing
    }

}
