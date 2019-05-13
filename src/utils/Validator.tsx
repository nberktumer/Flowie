import {Variable} from "../models/Variable"
import strings from "../lang"

export class Validator {

    static validateVariableName(variableName: string, variableList: Variable[]): string {
        if (variableName.length === 0)
            return ""

        if (variableList.find((item) => item.name === variableName))
            return strings.variableExists
        else if (!variableName.charAt(0).match(/[a-z]/i))
            return strings.variableFirstCharacterError
        else if (!variableName.match(/^(?!-)(?!.*-)[A-Za-z0-9-_]+$/))
            return strings.variableContainsInvalidCharacters

        return ""
    }

    static validateClassName(className: string) {
        if (!className.charAt(0).match(/[A-Z]/i))
            return strings.classFirstCharacterError
        else if (!className.match(/^(?!-)(?!.*-)[A-Za-z]+$/))
            return strings.classContainsInvalidCharacters

        return ""
    }
}
