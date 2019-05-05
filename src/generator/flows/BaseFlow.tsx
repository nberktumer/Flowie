import {FlowType} from "../../models";

export interface BaseFlow {
    type: FlowType

    functionCallName: string,

    hasExternalDependencies(): boolean,

    nextFlow(): string,

    functionName(): string,

    functionInvocation(): string,
}
