import {DirectoryItem, DirectoryItemType} from "./DirectoryItem"
import {Func} from "./Func"
import {Code, CodeLine} from "../code/Code"
import {BaseFlow} from "../flows/BaseFlow"
import {Stack} from "stack-typescript"
import {FlowModel} from "../FlowModelJSON"
import {FlowType, VariableType} from "../../models"
import {InitialFlow} from "../flows/InitialFlow"
import {AssignmentFlow} from "../flows/AssignmentFlow"
import {InputFlow} from "../flows/InputFlow"
import {OutputFlow} from "../flows/OutputFlow"
import {ArithmeticFlow} from "../flows/ArithmeticFlow"
import {WhileFlow} from "../flows/WhileFlow"
import {IfFlow} from "../flows/IfFlow"
import {RandomFlow} from "../flows/RandomFlow"
import {Project} from "./Project"
import {DataClassFlow} from "../flows/DataClassFlow";
import {ReturnFlow} from "../flows/ReturnFlow";
import {FunctionalityFlow} from "../flows/FunctionalityFlow";
import {CurrentTimeFlow} from "../flows/CurrentTimeFlow";
import {UpdateVariableFlow} from "../flows/UpdateVariableFlow";
import {Variable} from "../../models/Variable";
import {ListNewFlow} from "../flows/ListNewFlow";

export class Clazz implements DirectoryItem {
    static INITIAL_ID = "INITIAL_ID"
    static TERMINATION_ID = "TERMINATION_ID"
    static flowIncrementalId = 0

    type: DirectoryItemType
    name: string
    mainFunction: Func | null = null
    functions: Func[]

    flowMap: Map<string, BaseFlow> = new Map()
    generatedCode: string[] = []
    scopeCount = 0
    spacing = "\t"
    loopStack: Stack<string> = new Stack()

    indentationCount = 0
    declaredVariableSet: Set<string> = new Set()

    classInitCode = new Code(this.indentationCount)
    classFinishCode = new Code(this.indentationCount)
    globalVariableSet = new Code(this.indentationCount)
    dependencySet = new Code(this.indentationCount)

    constructor(parameters: Variable[], returnType: VariableType, type: DirectoryItemType, name: string, flowModels: FlowModel[]) {
        this.type = type
        this.name = name
        this.functions = []
        this.reset(parameters, returnType, flowModels)
    }

    reset(parameters: Variable[], returnType: VariableType, flowModels: FlowModel[]) {
        this.flowMap = this.convertToFlowObjects(flowModels)

        this.functions = []
        this.mainFunction = null
        this.generatedCode = []
        this.scopeCount = 0
        this.loopStack = new Stack()
        this.indentationCount = 0
        this.declaredVariableSet = new Set()
        this.classInitCode = new Code(this.indentationCount)
        this.classFinishCode = new Code(this.indentationCount)
        this.globalVariableSet = new Code(this.indentationCount)
        this.dependencySet = new Code(this.indentationCount)

        Project.codeStrategy.initClazz(this)
        Project.codeStrategy.initMain(parameters, returnType, this)

        this.loopStack.push(Clazz.TERMINATION_ID)

        const initialFlow = this.flowMap.get(Clazz.INITIAL_ID)

        if (initialFlow) {
            this.writeMainCodeFromFlow(Clazz.INITIAL_ID)
        }

        this.flowMap.forEach((flow) => {
            this.writeFunctionCodeFromFlow(flow)
        })

        Project.codeStrategy.finishMain(this)
        Project.codeStrategy.finishClazz(this)
    }

    writeCodeToMainFunction(line: string) {
        if (this.mainFunction == null) {
            throw new Error("Undefined main function!")
        }

        this.mainFunction.code.insert(line)
    }

    addFunction(fn: Func) {
        this.functions.push(fn)
    }

    addDependency(dependency: string) {
        this.dependencySet.insert(dependency)
    }

    addGlobalVariable(globalVariable: string) {
        this.globalVariableSet.insert(globalVariable)
    }

    /**
     * Returns false if the set already contains variable true otherwise
     */

    addVariable(name: string | undefined): boolean {
        name = name === undefined ? "" : name

        if (this.declaredVariableSet.has(name)) {
            return false
        }

        this.declaredVariableSet.add(name)
        return true
    }

    addToLoopStack(id: string) {
        this.loopStack.push(id)
    }

    writeMainCodeFromFlow(id: string) {
        if (!this.removeFromStackIfTopEquals(id)) {
            const flow = this.flowMap.get(id)
            if (flow) {
                if (flow instanceof ArithmeticFlow) {
                    Project.codeStrategy.arithmeticFlowCode.generateMain(flow, this)
                } else if (flow instanceof AssignmentFlow) {
                    Project.codeStrategy.assignmentFlowCode.generateMain(flow, this)
                } else if (flow instanceof InputFlow) {
                    Project.codeStrategy.inputFlowCode.generateMain(flow, this)
                } else if (flow instanceof OutputFlow) {
                    Project.codeStrategy.outputFlowCode.generateMain(flow, this)
                } else if (flow instanceof WhileFlow) {
                    Project.codeStrategy.whileFlowCode.generateMain(flow, this)
                } else if (flow instanceof IfFlow) {
                    Project.codeStrategy.ifFlowCode.generateMain(flow, this)
                } else if (flow instanceof RandomFlow) {
                    Project.codeStrategy.randomFlowCode.generateMain(flow, this)
                } else if (flow instanceof CurrentTimeFlow) {
                    Project.codeStrategy.currentTimeFlowCode.generateMain(flow, this)
                } else if (flow instanceof DataClassFlow) {
                    Project.codeStrategy.dataClassFlowCode.generateMain(flow, this)
                } else if (flow instanceof ReturnFlow) {
                    Project.codeStrategy.returnFlowCode.generateMain(flow, this)
                } else if (flow instanceof FunctionalityFlow) {
                    Project.codeStrategy.functionalityFlowCode.generateMain(flow, this)
                } else if (flow instanceof UpdateVariableFlow) {
                    Project.codeStrategy.updateVariableFlowCode.generateMain(flow, this)
                } else if (flow instanceof ListNewFlow) {
                    Project.codeStrategy.newListFlowCode.generateMain(flow, this)
                } else if (flow instanceof InitialFlow) {
                    this.writeMainCodeFromFlow(flow.nextFlow())
                }
            }
        }
    }

    writeFunctionCodeFromFlow(flow: BaseFlow) {
        if (flow instanceof InputFlow) {
            Project.codeStrategy.inputFlowCode.generateFunc(flow, this)
        } else if (flow instanceof OutputFlow) {
            Project.codeStrategy.outputFlowCode.generateFunc(flow, this)
        }
    }

    generateCode() {
        Project.codeStrategy.initClazzCode(this)

        if (this.mainFunction == null) {
            throw new Error("Main function not defined!")
        }

        this.dependencySet.lines.forEach((dependencyLine) => {
            this.generatedCode.push(this.createLineWithSpacing(dependencyLine))
        })

        if (this.dependencySet.lines.length > 0) {
            this.generatedCode.push("")
        }

        this.classInitCode.lines.forEach((classLine) => {
            this.generatedCode.push(this.createLineWithSpacing(classLine))
        })

        this.globalVariableSet.lines.forEach((globalVariableLine) => {
            this.generatedCode.push(this.createLineWithSpacing(globalVariableLine))
        })

        if (this.globalVariableSet.lines.length > 0) {
            this.generatedCode.push("")
        }

        this.mainFunction.code.lines.forEach((codeLine) => {
            this.generatedCode.push(this.createLineWithSpacing(codeLine))
        })

        this.functions.forEach((func) => {
                func.code.lines.forEach((codeLine) => {
                    this.generatedCode.push(this.createLineWithSpacing(codeLine))
                })
            }
        )

        Project.codeStrategy.finishClazzCode(this)

        this.classFinishCode.lines.forEach((classLine) => {
            this.generatedCode.push(this.createLineWithSpacing(classLine))
        })

    }

    getCode(): string {
        return this.generatedCode.join("\n")
    }

    incrementIndentation() {
        this.indentationCount++
    }

    decrementIndentation() {
        this.indentationCount--
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

    protected createLineWithSpacing(codeLine: CodeLine): string {
        let line = ""
        for (let i = 0; i < codeLine.indentationCount; i++) {
            line += this.spacing
        }

        line += codeLine.content
        return line
    }

    private convertToFlowObjects(flowModels: FlowModel[]): Map<string, BaseFlow> {
        const baseFlowMap = new Map<string, BaseFlow>()

        flowModels.forEach((value) => {
                console.log(value)

                switch (value.type) {
                    case FlowType.INITIAL:
                        baseFlowMap.set(Clazz.INITIAL_ID, new InitialFlow(
                            Clazz.INITIAL_ID,
                            value.nextFlowId,
                            value.type
                        ))
                        break
                    case FlowType.ASSIGNMENT:
                        baseFlowMap.set(value.id, new AssignmentFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.assignmentFlowContent
                        ))
                        break
                    case FlowType.INPUT:
                        baseFlowMap.set(value.id, new InputFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.inputFlowContent
                        ))
                        break
                    case FlowType.OUTPUT:
                        baseFlowMap.set(value.id, new OutputFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.outputFlowContent
                        ))
                        break
                    case FlowType.ARITHMETIC:
                        baseFlowMap.set(value.id, new ArithmeticFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.arithmeticFlowContent
                        ))
                        break
                    case FlowType.WHILE:
                        baseFlowMap.set(value.id, new WhileFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.whileFlowContent
                        ))
                        break
                    case FlowType.IF:
                        baseFlowMap.set(value.id, new IfFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.ifFlowContent
                        ))
                        break
                    case FlowType.CURRENT_TIME:
                        baseFlowMap.set(value.id, new CurrentTimeFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.currentTimeFlowContent
                        ))
                        break
                    case FlowType.RANDOM:
                        baseFlowMap.set(value.id, new RandomFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.randomFlowContent
                        ))
                        break
                    case FlowType.DATA_CLASS:
                        baseFlowMap.set(value.id, new DataClassFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.dataClassFlowContent
                        ))
                        break
                    case FlowType.RETURN:
                        baseFlowMap.set(value.id, new ReturnFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.returnFlowContent
                        ))
                        break
                    case FlowType.UPDATE_VARIABLE:
                        baseFlowMap.set(value.id, new UpdateVariableFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.updateVariableFlowContent
                        ))
                        break
                    case FlowType.CLASS:
                        baseFlowMap.set(value.id, new FunctionalityFlow(
                            value.id,
                            value.nextFlowId,
                            value.type,
                            value.functionalityFlowContent
                        ))
                        break
                    /*
                    case "for":
                        baseFlowList.push(new ForFlow(
                            value.id,
                            value.type,
                            value.forFlowContent
                        ))
                        break
                     */
                    default :
                        break

                }
            }
        )

        return baseFlowMap
    }
}
