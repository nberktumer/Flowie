import {Code} from "../code/Code";
import {Variable} from "../../models/Variable";

export class Func {
    functionName: string
    parameters: Variable[]
    returnType: string | undefined
    code: Code
    isProjectMain: boolean

    constructor(
        functionName: string,
        parameters: Variable[],
        returnType: string | undefined,
        codeLines: Code,
        isProjectMain: boolean
    ) {
        this.functionName = functionName
        this.parameters = parameters
        this.returnType = returnType
        this.code = codeLines
        this.isProjectMain = isProjectMain
    }
}
