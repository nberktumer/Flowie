import {ProgrammingLanguage, VariableType} from "../../models";

export class ProgrammingLanguageTypeConverter {
    static convertType(programmingLanguage: ProgrammingLanguage, variableType: VariableType): string {
        let convertedType = ""

        switch (+programmingLanguage) {
            case ProgrammingLanguage.JAVA:
                switch (variableType) {
                    case VariableType.INT:
                        convertedType = "Integer"
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
                        convertedType = `String[]`
                        break
                    case VariableType.NONE:
                        convertedType = "void"
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
                    case VariableType.NONE:
                        convertedType = "Unit"
                }
                break
        }

        return convertedType
    }

    static convertConstantVariable(programmingLanguage: ProgrammingLanguage, value: any, type: VariableType): string {
        let convertedConstant = ""

        switch (+programmingLanguage) {
            case ProgrammingLanguage.JAVA:
                switch (type) {
                    case VariableType.INT:
                        if (value.toString().indexOf(".") === -1) {
                            convertedConstant = `${value}`
                        } else {
                            convertedConstant = `(int) ${value}`
                        }
                        break
                    case VariableType.BOOLEAN:
                        console.log(value)
                        if (value === "true") {
                            convertedConstant = "true"
                        } else if (value === "false") {
                            convertedConstant = "false"
                        }
                        break
                    case VariableType.STRING:
                        convertedConstant = `"${value}"`
                        break
                    case VariableType.DOUBLE:
                        convertedConstant = value
                        break
                    case VariableType.LONG:
                        convertedConstant = `${value}L`
                        break
                    case VariableType.MAIN_ARG:
                        convertedConstant = `String[]`
                        break
                }
                break
            case ProgrammingLanguage.KOTLIN:
                switch (type) {
                    case VariableType.INT:
                        if (value.toString().indexOf(".") === -1) {
                            convertedConstant = `${value}`
                        } else {
                            convertedConstant = `${value}.toInt()`
                        }
                        break
                    case VariableType.BOOLEAN:
                        console.log(value)
                        if (value === "true") {
                            convertedConstant = "true"
                        } else if (value === "false") {
                            convertedConstant = "false"
                        }
                        break
                    case VariableType.STRING:
                        convertedConstant = `"${value}"`
                        break
                    case VariableType.DOUBLE:
                        if (value.toString().indexOf(".") === -1) {
                            convertedConstant = `${value}.0`
                        } else {
                            convertedConstant = `${value}`
                        }
                        break
                    case VariableType.LONG:
                        convertedConstant = `${value}L`
                        break
                    case VariableType.MAIN_ARG:
                        convertedConstant = `String[]`
                        break
                }
                break
        }

        return convertedConstant
    }

    static convertArithmeticResult(programmingLanguage: ProgrammingLanguage,
                                   originalExpression: string,
                                   setVariableType: VariableType,
                                   firstOperatorType: VariableType | undefined,
                                   secondOperatorType: VariableType | undefined): string {
        let convertedResult = originalExpression
        if (setVariableType === firstOperatorType && setVariableType === secondOperatorType) return convertedResult

        switch (+programmingLanguage) {
            case ProgrammingLanguage.JAVA:
                switch (setVariableType) {
                    case VariableType.INT:
                        convertedResult = `(${convertedResult}).intValue()`
                        break
                    case VariableType.DOUBLE:
                        convertedResult = `(${convertedResult}).doubleValue()`
                        break
                    case VariableType.LONG:
                        convertedResult = `(${convertedResult}).longValue()`
                        break
                }
                break
            case ProgrammingLanguage.KOTLIN:
                switch (setVariableType) {
                    case VariableType.INT:
                        convertedResult = `(${convertedResult}).toInt()`
                        break
                    case VariableType.DOUBLE:
                        convertedResult = `(${convertedResult}).toDouble()`
                        break
                    case VariableType.LONG:
                        convertedResult = `(${convertedResult}).toLong()`
                        break
                }
                break
        }

        return convertedResult
    }
}
