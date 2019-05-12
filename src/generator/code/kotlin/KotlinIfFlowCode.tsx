import {IfFlow} from "../../flows/IfFlow";
import {IfFlowCode} from "../common/IfFlowCode";
import {Clazz} from "../../project/Clazz";
import {ConditionOperation} from "../../../models/VariableEnums";

export class KotlinIfFlowCode implements IfFlowCode {

    generateMain(ifFlow: IfFlow, clazz: Clazz): void {
        if (ifFlow.content == null || clazz.mainFunction == null)
            return

        let conditionCode = ""

        for (let i = 0; i < ifFlow.content.conditions.length; i++) {
            const condition = ifFlow.content.conditions[i]

            conditionCode += condition.first.name

            if (condition.second !== undefined) {
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

            if (i !== ifFlow.content.conditions.length - 1) {
                conditionCode += ` ${ifFlow.content.conditionType} `
            }
        }

        clazz.writeCodeToMainFunction("if(" + conditionCode + ") {")
        clazz.mainFunction.code.incrementIdentation()

        if (ifFlow.content.trueScopeId != null) {
            clazz.addToLoopStack(ifFlow.id)
            clazz.writeMainCodeFromFlow(ifFlow.content.trueScopeId)
        }

        clazz.mainFunction.code.decrementIdentation()

        if (ifFlow.content.falseScopeId != null) {
            clazz.writeCodeToMainFunction("} else {")

            clazz.mainFunction.code.incrementIdentation()

            clazz.addToLoopStack(ifFlow.id)
            clazz.writeCodeToMainFunction(ifFlow.content.falseScopeId)

            clazz.mainFunction.code.decrementIdentation()
        }

        clazz.writeCodeToMainFunction("}")

        clazz.writeMainCodeFromFlow(ifFlow.nextFlow())
    }

}
