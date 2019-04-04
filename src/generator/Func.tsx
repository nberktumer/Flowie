export class Func {
    functionName: string
    parameters: Parameter[]
    returnType: string | undefined
    codeLines: string[]

    constructor(
        functionName: string,
        parameters: Parameter[],
        returnType: string | undefined,
        codeLines: string[]
    ) {
        this.functionName = functionName
        this.parameters = parameters
        this.returnType = returnType
        this.codeLines = codeLines
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
