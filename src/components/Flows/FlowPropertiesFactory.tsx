import {FlowType} from "../../models"
import {BasePropertiesState} from "./Base/BaseProperties"
import {Variable} from "../../models/Variable"
import {WhileProperties} from "./While/WhileProperties"
import {ArithmeticProperties} from "./Arithmetic/ArithmeticProperties"
import {AssignmentProperties} from "./Assignment/AssignmentProperties"
import {InputProperties} from "./Input/InputProperties"
import {OutputProperties} from "./Output/OutputProperties"
import React from "react"

export class FlowPropertiesFactory {
    private constructor() {
    }

    static create(type: FlowType | null, variables: Variable[], onDataChanged: (data: BasePropertiesState) => void): JSX.Element {
        switch (type) {
            case FlowType.WHILE:
                return (<WhileProperties variables={variables} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties variables={variables} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.INPUT:
                return (<InputProperties onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties variables={variables} onDataChanged={onDataChanged.bind(this)}/>)
            default:
                return (<div/>)
        }
    }
}
