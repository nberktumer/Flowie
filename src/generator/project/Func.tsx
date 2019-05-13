import {Code} from "../code/Code";

export class Func {
    functionName: string
    parameters: Parameter[]
    returnType: string | undefined
    code: Code
    isMain: boolean

    constructor(
        functionName: string,
        parameters: Parameter[],
        returnType: string | undefined,
        codeLines: Code,
        isMain: boolean
    ) {
        this.functionName = functionName
        this.parameters = parameters
        this.returnType = returnType
        this.code = codeLines
        this.isMain = isMain
    }
}

export class Parameter {
    name: string
    type: string

    constructor(
        name: string,
        type: string
    ) {
        this.name = name;
        this.type = type
    }
}
