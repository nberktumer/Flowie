import {FlowType} from "../../models"
import {BasePropertiesState} from "./Base/BaseProperties"
import {Variable} from "../../models/Variable"
import {WhileProperties} from "./While/WhileProperties"
import {ArithmeticProperties} from "./Arithmetic/ArithmeticProperties"
import {AssignmentProperties} from "./Assignment/AssignmentProperties"
import {InputProperties} from "./Input/InputProperties"
import {OutputProperties} from "./Output/OutputProperties"
import React from "react"
import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class FlowPropertiesFactory {
    private constructor() {
    }

    static create(type: FlowType | null | undefined, variables: Variable[], onDataChanged: (data: BasePropertiesState) => void, node?: BaseFlowNode): JSX.Element {
        switch (type) {
            case FlowType.WHILE:
                return (<WhileProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.INPUT:
                return (<InputProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            default:
                return (<div/>)
        }
    }
}
