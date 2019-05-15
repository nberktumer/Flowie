import {ProgrammingLanguage, VariableType} from "../../models";
import {Variable} from "../../models/Variable";

export class ProgrammingLanguageTypeConverter {
    static convertType(programmingLanguage: ProgrammingLanguage, variableType: VariableType): string {
        let convertedType = ""

        switch (+programmingLanguage) {
            case ProgrammingLanguage.JAVA:
                switch (variableType) {
                    case VariableType.INT:
                        convertedType = "int"
                        break
                    case VariableType.BOOLEAN:
                        convertedType = "boolean"
                        break
                    case VariableType.STRING:
                        convertedType = "String"
                        break
                    case VariableType.DOUBLE:
                        convertedType = "double"
                        break
                    case VariableType.LONG:
                        convertedType = "long"
                        break
                    case VariableType.MAIN_ARG:
                        convertedType = `String[]`
                        break
                }
                break
            case ProgrammingLanguage.KOTLIN:
                switch (variableType) {
                    case VariableType.INT:
                        convertedType = "Int"
                        break
                    case VariableType.BOOLEAN:
                        convertedType = "Boolean"
                        break
                    case VariableType.STRING:
                        convertedType = "String"
                        break
                    case VariableType.DOUBLE:
                        convertedType = "Double"
                        break
                    case VariableType.LONG:
                        convertedType = "Long"
                        break
                    case VariableType.MAIN_ARG:
                        convertedType = `Array<String>`
                        break
                }
                break
        }

        return convertedType
    }

    static convertConstantVariable(programmingLanguage: ProgrammingLanguage, variable: Variable): string {
        let convertedConstant = ""

        switch (+programmingLanguage) {
            case ProgrammingLanguage.JAVA:
                switch (variable.type) {
                    case VariableType.INT:
                        convertedConstant = variable.value
                        break
                    case VariableType.BOOLEAN:
                        console.log(variable.value)
                        if (variable.value === "true") {
                            convertedConstant = "true"
                        } else if (variable.value === "false") {
                            convertedConstant = "false"
                        }
                        break
                    case VariableType.STRING:
                        convertedConstant = `"${variable.value}"`
                        break
                    case VariableType.DOUBLE:
                        convertedConstant = variable.value
                        break
                    case VariableType.LONG:
                        convertedConstant = `${variable.value}L`
                        break
                    case VariableType.MAIN_ARG:
                        convertedConstant = `String[]`
                        break
                }
                break
            case ProgrammingLanguage.KOTLIN:
                switch (variable.type) {
                    case VariableType.INT:
                        convertedConstant = variable.value
                        break
                    case VariableType.BOOLEAN:
                        console.log(variable.value)
                        if (variable.value === "true") {
                            convertedConstant = "true"
                        } else if (variable.value === "false") {
                            convertedConstant = "false"
                        }
                        break
                    case VariableType.STRING:
                        convertedConstant = `"${variable.value}"`
                        break
                    case VariableType.DOUBLE:
                        convertedConstant = variable.value
                        break
                    case VariableType.LONG:
                        convertedConstant = `${variable.value}L`
                        break
                    case VariableType.MAIN_ARG:
                        convertedConstant = `String[]`
                        break
                }
                break
        }

        return convertedConstant
    }
}
