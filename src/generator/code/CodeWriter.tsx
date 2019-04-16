import {BaseFlow} from "../flows/BaseFlow"
import {Func} from "../Func"
import {Stack} from "stack-typescript"

export class CodeWriter {
    static INITIAL_ID = "INITIAL_ID"
    static TERMINATION_ID = "TERMINATION_ID"

    static getInstance(): CodeWriter {
        return this.instance || (this.instance = new this())
    }

    private static instance: CodeWriter

    flowIncrementalId = 0
    flows: Map<string, BaseFlow> = new Map()
    codes: string[] = []
    scopeCount = 0
    private mainFunctionLineIndex = 0
    private spacing = "\t"
    private variableSet: Set<string> = new Set()
    private loopStack: Stack<string> = new Stack()

    private constructor() {
        this.loopStack.push(CodeWriter.TERMINATION_ID)
    }

    reset() {
        this.flowIncrementalId = 0
        this.flows.clear()
        this.variableSet.clear()
        this.codes = []
        this.scopeCount = 0
        this.mainFunctionLineIndex = 0
        this.loopStack = new Stack()
        this.loopStack.push(CodeWriter.TERMINATION_ID)
    }

    setFlows(flows: Map<string, BaseFlow>) {
        console.log(flows)
        this.flows = flows
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

    generateMain() {
        this.writeLineToMainFunction(`fun main(args: Array<String\>) {`)
        this.scopeCount++

        const initialFlow = this.flows.get(CodeWriter.INITIAL_ID)
        if (initialFlow !== undefined) {
            initialFlow.createMainCode()
        } else {
            console.log("No initial defined please define it with " + CodeWriter.INITIAL_ID + "!")
        }

        this.scopeCount--
        this.writeLineToMainFunction("}")
        this.writeLineToMainFunction("")
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

    writeMainCodeFromFlow(id: string) {
        const top = this.loopStack.top

        if (!this.removeFromStackIfEquals(id)) {
            const flow = this.flows.get(id)
            if (flow !== undefined) {
                console.log("Code for id " + id + " is being created!")
                return flow.createMainCode()
            }

            console.log("Something went horribly wrong!")
        } else {
            console.log("Top with id " + top + " is popped!")
        }
    }

    /**
     * Returns false if the set already contains variable true otherwise
     */

    addVariable(name: string | undefined): boolean {
        name = name === undefined ? "" : name

        console.log("Adding variable : " + name + " isContained: " + this.variableSet.has(name))
        if (this.variableSet.has(name)) {
            return false
        }

        this.variableSet.add(name)
        return true
    }

    addToLoopStack(id: string) {
        console.log("Pushed to stack " + id + "!")
        this.loopStack.push(id)
    }

    /**
     * Returns true if top equals index and pops it returns false otherwise.
     */
    removeFromStackIfEquals(id: string): boolean {
        if (this.loopStack.top === id) {
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
