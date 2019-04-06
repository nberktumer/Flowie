import {BaseFlow} from "../flows/BaseFlow"
import {Func} from "../Func"
import {Stack} from "stack-typescript"
import {AssignmentFlow} from "../flows/AssignmentFlow"
import {InputFlow} from "../flows/InputFlow"
import {OutputFlow} from "../flows/OutputFlow"
import {ArithmeticFlow} from "../flows/ArithmeticFlow"
import {WhileFlow} from "../flows/WhileFlow"

export class CodeWriter {
    private static instance: CodeWriter
    flows: BaseFlow[] = []
    codes: string[] = []
    scopeCount = 0
    private mainFunctionLineIndex = 0
    private spacing = "\t"
    private variableSet: Set<string> = new Set()
    private loopStack: Stack<number> = new Stack()

    private constructor() {
        this.loopStack.push(-1)
    }

    static getInstance(): CodeWriter {
        return this.instance || (this.instance = new this())
    }

    reset() {
        this.flows = []
        this.codes = []
        this.scopeCount = 0
        this.mainFunctionLineIndex = 0
        this.variableSet = new Set()
        this.loopStack = new Stack()
        this.loopStack.push(-1)
    }

    setFlows(value: BaseFlow[]) {
        const sortedFlows = value.sort((first, second) => {
            let firstFlowId = -1
            let secondFlowId = -1

            if (first instanceof ArithmeticFlow) {
                firstFlowId = first.id
            } else if (first instanceof InputFlow) {
                firstFlowId = first.id
            } else if (first instanceof OutputFlow) {
                firstFlowId = first.id
            } else if (first instanceof WhileFlow) {
                firstFlowId = first.id
            } else if (first instanceof AssignmentFlow) {
                firstFlowId = first.id
            }

            if (second instanceof ArithmeticFlow) {
                secondFlowId = second.id
            } else if (second instanceof InputFlow) {
                secondFlowId = second.id
            } else if (second instanceof OutputFlow) {
                secondFlowId = second.id
            } else if (second instanceof WhileFlow) {
                secondFlowId = second.id
            } else if (second instanceof AssignmentFlow) {
                secondFlowId = second.id
            }

            return firstFlowId - secondFlowId
        })

        console.log(sortedFlows)
        this.flows = sortedFlows
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
        this.appendToLastLine(" {")
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

    getNextFlowIndex(index: number): number {
        return this.flows[index].nextFlow()
    }

    writeMainCodeFromFlow(flowIndex: number) {
        const top = this.loopStack.top

        if (!this.removeFromStackIfEquals(flowIndex)) {
            console.log("Code for index " + flowIndex + " is being created!")
            this.flows[flowIndex].createMainCode()
        } else {
            console.log("Top with index " + top + " is popped!")
        }
    }

    /**
     * Returns false if the set already contains variable true otherwise
     */

    addVariable(name: string | undefined): boolean {
        name = name === undefined ? "" : name

        if (this.variableSet.has(name)) {
            return false
        }

        this.variableSet.add(name)
        return true
    }

    addToLoopStack(index: number) {
        console.log("Pushed to stack " + index + "!")
        this.loopStack.push(index)
    }

    /**
     * Returns true if top equals index and pops it returns false otherwise.
     */
    removeFromStackIfEquals(index: number): boolean {
        if (this.loopStack.top === index) {
            this.loopStack.pop()
            return true
        }

        return false
    }

    private createSpacing(): string {
        let spacing = ""
        for (let i = 0; i < this.scopeCount; i++) {
            spacing += this.spacing
        }

        return spacing
    }

}
