import {WhileFlow} from "../../flows/WhileFlow";
import {WhileFlowCode} from "../common/WhileFlowCode";
import {ConditionOperation} from "../../../models/VariableEnums";
import {Clazz} from "../../project/Clazz";

export class KotlinWhileFlowCode implements WhileFlowCode {

    generateMain(whileFlow: WhileFlow, clazz: Clazz): void {
        if (whileFlow.content == null || clazz.mainFunction == null)
            return

        const nextScopeId = whileFlow.content.scopeId

        let conditionCode = ""

        for (let i = 0; i < whileFlow.content.conditions.length; i++) {
            const condition = whileFlow.content.conditions[i]

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

            if (i !== whileFlow.content.conditions.length - 1) {
                conditionCode += ` ${whileFlow.content.conditionType} `
            }
        }

        clazz.writeCodeToMainFunction("while(" + conditionCode + ") {")
        clazz.mainFunction.code.incrementIdentation()

        if (nextScopeId != null) {
            clazz.addToLoopStack(whileFlow.id)
            clazz.writeMainCodeFromFlow(nextScopeId)
        }

        clazz.mainFunction.code.decrementIdentation()
        clazz.writeCodeToMainFunction("}")
        clazz.writeMainCodeFromFlow(whileFlow.nextFlow())
    }

}
