import {BaseFlow} from "../flows/BaseFlow"
import {Func} from "../Func"
import {Stack} from "stack-typescript"
import {ProgrammingLanguage} from "../../models";
import {CodeStrategy} from "./CodeStrategy";
import {KotlinCodeStrategy} from "./kotlin/KotlinCodeStrategy";
import {CodeStrategyFactory} from "./CodeStrategyFactory";
import {ArithmeticFlow} from "../flows/ArithmeticFlow";
import {AssignmentFlow} from "../flows/AssignmentFlow";
import {InputFlow} from "../flows/InputFlow";
import {OutputFlow} from "../flows/OutputFlow";
import {WhileFlow} from "../flows/WhileFlow";
import {InitialFlow} from "../flows/InitialFlow";
import {Class} from "./Class";

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
    private dependencySet: Set<string> = new Set()
    private loopStack: Stack<string> = new Stack()

    private codeStrategy: CodeStrategy = new KotlinCodeStrategy()

    private constructor() {
        this.loopStack.push(CodeWriter.TERMINATION_ID)
    }

    reset() {
        this.flowIncrementalId = 0
        this.flows.clear()
        this.variableSet.clear()
        this.dependencySet.clear()
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

        this.generateMain()

        flows.forEach((value) => {
            this.writeFunctionCodeFromFlow(value)
        })

        this.codeStrategy.finishClass()
        this.addDependencies()
    }

    writeLineToIndex(line: string, index: number) {
        this.codes.splice(index, 0, line)
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
        const mainClass = new Class("GeneratedCode")

        this.codeStrategy.initClass(mainClass)
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
        if (!this.removeFromStackIfTopEquals(id)) {
            const flow = this.flows.get(id)
            if (flow !== undefined) {
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
            }
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

        if (this.variableSet.has(name)) {
            return false
        }

        this.variableSet.add(name)
        return true
    }

    addDependency(dependency: string) {
        this.dependencySet.add(dependency)
    }

    addToLoopStack(id: string) {
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

    private addDependencies(): void {
        this.codeStrategy.addDependencies(this.dependencySet)
    }

}
