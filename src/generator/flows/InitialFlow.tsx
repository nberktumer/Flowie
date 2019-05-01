import {BaseFlow} from "./BaseFlow";
import {FlowType} from "../../models";
import {CodeWriter} from "../code/CodeWriter";

export class InitialFlow implements BaseFlow {
    id: string
    nextFlowId: string | null
    type: FlowType
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.functionCallName = ""
    }

    functionInvocation(): string {
        return "";
    }

    functionName(): string {
        return "";
    }

    hasExternalDependencies(): boolean {
        return false;
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }
}
