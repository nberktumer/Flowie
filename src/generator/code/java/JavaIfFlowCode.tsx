import {IfFlow} from "../../flows/IfFlow";
import {Func} from "../../project/Func";
import {ConditionOperation} from "../../../models/VariableEnums";
import {IfFlowCode} from "../common/IfFlowCode";
import {Clazz} from "../../project/Clazz";

export class JavaIfFlowCode implements IfFlowCode {

    generateMain(ifFlow: IfFlow, clazz: Clazz) {
        if (ifFlow.content == null || clazz.mainFunction == null)
            return

        let conditionCode = ""
        ifFlow.content.conditions.forEach((condition) => {
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
        })

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
            clazz.writeMainCodeFromFlow(ifFlow.content.falseScopeId)

            clazz.mainFunction.code.decrementIdentation()

        }
        clazz.writeCodeToMainFunction("}")
    }

}
