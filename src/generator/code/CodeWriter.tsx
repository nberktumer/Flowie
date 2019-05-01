import {BaseFlow} from "../flows/BaseFlow"
import {Func} from "../Func"
import {Stack} from "stack-typescript"
import {ProgrammingLanguage} from "../../models";
import {CodeStrategy} from "./CodeStrategy";
import {KotlinCodeStrategy} from "./kotlin/KotlinCodeStrategy";
import {CodeStrategyFactory} from "./CodeStrategyFactory";
import {instanceOf} from "prop-types";
import {ArithmeticFlow, ArithmeticFlowContent} from "../flows/ArithmeticFlow";
import {AssignmentFlow} from "../flows/AssignmentFlow";
import {InputFlow} from "../flows/InputFlow";
import {OutputFlow} from "../flows/OutputFlow";
import {WhileFlow} from "../flows/WhileFlow";
import {InitialFlow} from "../flows/InitialFlow";

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

    private codeStrategy: CodeStrategy = new KotlinCodeStrategy()

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

    init(programmingLanguage: ProgrammingLanguage, flows: Map<string, BaseFlow>) {
        console.log(flows)
        this.flows = flows
        this.codeStrategy = CodeStrategyFactory.createCodeStrategy(programmingLanguage)

        flows.forEach((value) => {
            console.log("Creating function code")
            this.writeFunctionCodeFromFlow(value)
        })

        this.generateMain()
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
        this.codeStrategy.initMain()

        const initialFlow = this.flows.get(CodeWriter.INITIAL_ID)
        if (initialFlow !== undefined) {
            this.writeMainCodeFromFlow(CodeWriter.INITIAL_ID)
        } else {
            console.log("No initial defined please define it with " + CodeWriter.INITIAL_ID + "!")
        }

        this.codeStrategy.finishMain()
    }

    writeFunction(func: Func) {
        this.codeStrategy.writeFunctionSignature(func)
    }

    writeMainCodeFromFlow(id: string) {
        const top = this.loopStack.top

        if (!this.removeFromStackIfTopEquals(id)) {
            const flow = this.flows.get(id)
            if (flow !== undefined) {
                console.log("Code for id " + id + " is being created!")

                if (flow instanceof ArithmeticFlow) {
                    this.codeStrategy.writeArithmeticMain(flow)
                } else if (flow instanceof AssignmentFlow) {
                    this.codeStrategy.writeAssignmentMain(flow)
                } else if (flow instanceof InputFlow) {
                    this.codeStrategy.writeInputMain(flow)
                } else if (flow instanceof OutputFlow) {
                    this.codeStrategy.writeOutputMain(flow)
                } else if (flow instanceof WhileFlow) {
                    this.codeStrategy.writeWhileMain(flow)
                } else if (flow instanceof InitialFlow) {
                    this.writeMainCodeFromFlow(flow.nextFlow())
                }
            } else {
                console.log("Something went horribly wrong!")
            }

        } else {
            console.log("Top with id " + top + " is popped!")
        }
    }

    writeFunctionCodeFromFlow(flow: BaseFlow) {

        if (flow instanceof ArithmeticFlow) {
            this.codeStrategy.writeArithmeticFunction(flow)
        } else if (flow instanceof AssignmentFlow) {
            this.codeStrategy.writeAssignmentFunction(flow)
        } else if (flow instanceof InputFlow) {
            this.codeStrategy.writeInputFunction(flow)
        } else if (flow instanceof OutputFlow) {
            this.codeStrategy.writeOutputFunction(flow)
        } else if (flow instanceof WhileFlow) {
            this.codeStrategy.writeWhileFunction(flow)
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
    removeFromStackIfTopEquals(id: string): boolean {
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
