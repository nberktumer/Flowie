import {ArithmeticFlowContent} from "./flows/ArithmeticFlow"
import {OutputFlowContent} from "./flows/OutputFlow"
import {InputFlowContent} from "./flows/InputFlow"
import {AssignmentFlowContent} from "./flows/AssignmentFlow"
import {WhileFlowContent} from "./flows/WhileFlow"
import {FlowType} from "../models"
import {IfFlowContent} from "./flows/IfFlow";
import {RandomFlowContent} from "./flows/RandomFlow";
import {DirectoryItemType} from "./project/DirectoryItem";
import {Directory} from "./project/Directory";
import {Clazz} from "./project/Clazz";
import {MainClazz} from "./project/MainClazz";
import {DataClassFlowContent} from "./flows/DataClassFlow";
import {ReturnFlowContent} from "./flows/ReturnFlow";
import {CurrentTimeFlowContent} from "./flows/CurrentTimeFlow";
import {FunctionalityFlowContent} from "./flows/FunctionalityFlow"
import {UpdateVariableFlowContent} from "./flows/UpdateVariableFlow";

export class DirectoryItemModel {
    type: DirectoryItemType
    directory: Directory | null = null
    clazz: Clazz | null = null
    mainClazz: MainClazz | null = null

    constructor(type: DirectoryItemType) {
        this.type = type
    }

    setDirectory(directory: Directory): DirectoryItemModel {
        this.directory = directory
        return this
    }

    setClazz(clazz: Clazz): DirectoryItemModel {
        this.clazz = clazz
        return this
    }

    setMainClazz(mainClazz: MainClazz): DirectoryItemModel {
        this.mainClazz = mainClazz
        return this
    }

}

export class FlowModel {
    type: FlowType
    id: string
    assignmentFlowContent: AssignmentFlowContent | null = null
    inputFlowContent: InputFlowContent | null = null
    outputFlowContent: OutputFlowContent | null = null
    arithmeticFlowContent: ArithmeticFlowContent | null = null
    whileFlowContent: WhileFlowContent | null = null
    ifFlowContent: IfFlowContent | null = null
    randomFlowContent: RandomFlowContent | null = null
    currentTimeFlowContent: CurrentTimeFlowContent | null = null
    functionalityFlowContent: FunctionalityFlowContent | null = null
    dataClassFlowContent: DataClassFlowContent | null = null
    returnFlowContent: ReturnFlowContent | null = null
    updateVariableFlowContent: UpdateVariableFlowContent | null = null
    // forFlowContent: ForFlowContent,
    // ifFlowContent: IfFlowContent,
    nextFlowId: string | null

    constructor(
        type: FlowType,
        id: string,
        nextFlowId: string | null
        // forFlowContent: ForFlowContent,

    ) {
        this.type = type
        this.id = id
        this.nextFlowId = nextFlowId
    }
}

export class FlowModelBuilder {
    private flowModel: FlowModel
    private type: FlowType
    private id: string
    // forFlowContent: ForFlowContent,
    // ifFlowContent: IfFlowContent,
    private nextFlowId: string | null

    constructor(
        type: FlowType,
        id: string,
        nextFlowId: string | null
    ) {
        this.type = type
        this.id = id
        this.nextFlowId = nextFlowId
        this.flowModel = new FlowModel(type, id, nextFlowId)
    }

    setFlowContent(flowContent: any): FlowModelBuilder {
        switch (this.type) {
            case FlowType.INITIAL:
                break;
            case FlowType.IF:
                this.flowModel.ifFlowContent = flowContent
                break;
            case FlowType.WHILE:
                this.flowModel.whileFlowContent = flowContent
                break;
            case FlowType.INPUT:
                this.flowModel.inputFlowContent = flowContent
                break;
            case FlowType.OUTPUT:
                this.flowModel.outputFlowContent = flowContent
                break;
            case FlowType.ARITHMETIC:
                this.flowModel.arithmeticFlowContent = flowContent
                break;
            case FlowType.ASSIGNMENT:
                this.flowModel.assignmentFlowContent = flowContent
                break;
            case FlowType.RANDOM:
                this.flowModel.randomFlowContent = flowContent
                break;
            case FlowType.CURRENT_TIME:
                this.flowModel.currentTimeFlowContent = flowContent
                break;
            case FlowType.DATA_CLASS:
                this.flowModel.dataClassFlowContent = flowContent
                break;
            case FlowType.CLASS:
                this.flowModel.functionalityFlowContent = flowContent
                break;
            case FlowType.PACKAGE:
                break;
            case FlowType.RETURN:
                this.flowModel.returnFlowContent = flowContent
                break;
            case FlowType.UPDATE_VARIABLE:
                this.flowModel.updateVariableFlowContent = flowContent
                break;
        }

        return this
    }

    build(): FlowModel {
        return this.flowModel
    }

}
