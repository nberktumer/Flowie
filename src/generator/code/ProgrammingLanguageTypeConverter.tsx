import {ProgrammingLanguage, VariableType} from "../../models";

export class ProgrammingLanguageTypeConverter {
    static convert(programmingLanguage: ProgrammingLanguage, variableType: VariableType): string {
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
                    case VariableType.MAIN_ARG:
                        convertedType = `Array<String>`
                        break
                }
                break
        }

        return convertedType
    }
}
