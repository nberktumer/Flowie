import {Variable} from "../models/Variable"
import strings from "../lang"
import ClassModel from "../models/ClassModel"

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

    static validateClassName(className: string, classList: ClassModel[]) {
        if (classList.find((item) => item.name === className))
            return strings.classExists
        else if (!className.charAt(0).match(/[A-Z]/))
            return strings.classFirstCharacterError
        else if (!className.match(/^(?!-)(?!.*-)[A-Za-z]+$/))
            return strings.classContainsInvalidCharacters

        return ""
    }

    static validatePackageName(packageName: string, packageList: string[]) {
        console.log(packageList)
        if (packageList.find((name) => name === packageName))
            return strings.packageExists
        else if (!packageName.charAt(0).match(/[a-z]/i))
            return strings.packageFirstCharacterError
        else if (!packageName.match(/^(?!-)(?!.*-)[A-Za-z]+$/))
            return strings.packageContainsInvalidCharacters

        return ""
    }
}
