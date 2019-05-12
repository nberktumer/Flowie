import {Variable} from "../../models/Variable";
import {Code} from "../code/Code";

export class Func {
    functionName: string
    parameters: Variable[]
    returnType: string | undefined
    code: Code

    constructor(
        functionName: string,
        parameters: Variable[],
        returnType: string | undefined,
        codeLines: Code
    ) {
        this.functionName = functionName
        this.parameters = parameters
        this.returnType = returnType
        this.code = codeLines
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
