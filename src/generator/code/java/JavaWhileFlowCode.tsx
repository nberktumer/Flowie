import {WhileFlow} from "../../flows/WhileFlow";
import {WhileFlowCode} from "../common/WhileFlowCode";
import {Clazz} from "../../project/Clazz";
import {ConditionOperation} from "../../../models/VariableEnums";

export class JavaWhileFlowCode implements WhileFlowCode {

    generateMain(whileFlow: WhileFlow, clazz: Clazz) {
        if (!whileFlow.content || clazz.mainFunction == null)
            return

        const nextScopeId = whileFlow.content.scopeId

        let conditionCode = ""
        whileFlow.content.conditions.forEach((condition) => {
            conditionCode += condition.first.name

            if (condition.second) {
                conditionCode += " "

                switch (condition.operation) {
                    case ConditionOperation.EQUALS:
                        conditionCode += "=="
                        break
                    case ConditionOperation.NOT_EQUALS:
                        conditionCode += "!="
                        break
                    case ConditionOperation.GREATER_THAN:
                        conditionCode += ">"
                        break;
                    case ConditionOperation.GREATER_THAN_OR_EQUALS:
                        conditionCode += ">="
                        break;
                    case ConditionOperation.LESS_THAN:
                        conditionCode += "<"
                        break;
                    case ConditionOperation.LESS_THAN_OR_EQUALS:
                        conditionCode += "<="
                        break;
                }

                if (!condition.second.name) {
                    conditionCode += " " + condition.second.value
                } else {
                    conditionCode += " " + condition.second.name
                }
            }
        })

        clazz.writeCodeToMainFunction("while(" + conditionCode + ") {")
        clazz.mainFunction.code.incrementIndentation()

        if (nextScopeId != null) {
            clazz.addToLoopStack(whileFlow.id)
            clazz.writeMainCodeFromFlow(nextScopeId)
        }

        clazz.mainFunction.code.decrementIndentation()
        clazz.writeCodeToMainFunction("}")
        clazz.writeMainCodeFromFlow(whileFlow.nextFlow())
    }

}
