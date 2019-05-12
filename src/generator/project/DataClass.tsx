import {Variable} from "../../models/Variable";

export class DataClass {
    variables: Variable[] = []

    addVariable(variable: Variable) {
        this.variables.push(variable)
    }
}
