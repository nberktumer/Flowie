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
    assignmentFlowContent: AssignmentFlowContent | null
    inputFlowContent: InputFlowContent | null
    outputFlowContent: OutputFlowContent | null
    arithmeticFlowContent: ArithmeticFlowContent | null
    whileFlowContent: WhileFlowContent | null
    ifFlowContent: IfFlowContent | null
    randomFlowContent: RandomFlowContent | null
    dataClassFlowContent: DataClassFlowContent | null
    // forFlowContent: ForFlowContent,
    // ifFlowContent: IfFlowContent,
    nextFlowId: string | null

    constructor(
        type: FlowType,
        id: string,
        assignmentFlowContent: AssignmentFlowContent | null = null,
        inputFlowContent: InputFlowContent | null = null,
        outputFlowContent: OutputFlowContent | null = null,
        arithmeticFlowContent: ArithmeticFlowContent | null = null,
        whileFlowContent: WhileFlowContent | null = null,
        ifFlowContent: IfFlowContent | null = null,
        randomFlowContent: RandomFlowContent | null = null,
        dataClassFlowContent: DataClassFlowContent | null = null,
        nextFlowId: string | null
        // forFlowContent: ForFlowContent,

    ) {
        this.type = type
        this.id = id
        this.assignmentFlowContent = assignmentFlowContent
        this.inputFlowContent = inputFlowContent
        this.outputFlowContent = outputFlowContent
        this.arithmeticFlowContent = arithmeticFlowContent
        this.ifFlowContent = ifFlowContent
        this.whileFlowContent = whileFlowContent
        this.ifFlowContent = ifFlowContent
        this.randomFlowContent = randomFlowContent
        this.dataClassFlowContent = dataClassFlowContent
        this.nextFlowId = nextFlowId
    }
}
