import {Code} from "../code/Code";
import {Variable} from "../../models/Variable";

export class Func {
    functionName: string
    parameters: Variable[]
    returnType: string | undefined
    code: Code
    isMain: boolean

    constructor(
        functionName: string,
        parameters: Variable[],
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
