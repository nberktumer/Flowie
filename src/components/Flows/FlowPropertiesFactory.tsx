import {FlowType} from "../../models"
import {BasePropertiesState} from "./Base/BaseProperties"
import {WhileProperties} from "./While/WhileProperties"
import {ArithmeticProperties} from "./Arithmetic/ArithmeticProperties"
import {AssignmentProperties} from "./Assignment/AssignmentProperties"
import {InputProperties} from "./Input/InputProperties"
import {OutputProperties} from "./Output/OutputProperties"
import React from "react"
import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {IfProperties} from "./If/IfProperties"
import {RandomProperties} from "./Random/RandomProperties"
import {DataClassProperties} from "./DataClass/DataClassProperties"
import {CreateDataClassProperties} from "./DataClass/CreateDataClassProperties"
import strings from "../../lang"
import {CreatePackageProperties} from "./Package/CreatePackageProperties"
import {CreateClassProperties} from "./Class/CreateClassProperties"
import {InitialFlowProperties} from "./Initial/InitialFlowProperties"
import {ReturnFlowProperties} from "./Return/ReturnFlowProperties"
import {ClassProperties} from "./Class/ClassProperties"
import {CurrentTimeProperties} from "./CurrentTime/CurrentTimeProperties"
import {UpdateVariableProperties} from "./UpdateVariable/UpdateVariableProperties"
import {NewListProperties} from "./List/NewList/NewListProperties"
import {ListAddProperties} from "./List/ListAdd/ListAddProperties"
import {ListClearProperties} from "./List/ListClear/ListClearProperties"
import {ListRemoveProperties} from "./List/ListRemove/ListRemoveProperties"
import {ListUpdateProperties} from "./List/ListUpdate/ListUpdateProperties"
import {ListGetProperties} from "./List/ListGet/ListGetProperties"
import {ListSizeProperties} from "./List/ListSize/ListSizeProperties"

export class FlowPropertiesFactory {
    private constructor() {
    }

    static create(type: FlowType | null | undefined, onDataChanged: (data: BasePropertiesState) => void, isValidListener: (isValid: boolean) => void): JSX.Element {
        switch (type) {
            case FlowType.WHILE:
                return (<WhileProperties onDataChanged={(data) => onDataChanged(data)}
                                         isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.IF:
                return (<IfProperties onDataChanged={(data) => onDataChanged(data)}
                                      isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties onDataChanged={(data) => onDataChanged(data)}
                                              isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties onDataChanged={(data) => onDataChanged(data)}
                                              isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.UPDATE_VARIABLE:
                return (<UpdateVariableProperties onDataChanged={(data) => onDataChanged(data)}
                                                  isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.INPUT:
                return (<InputProperties onDataChanged={(data) => onDataChanged(data)}
                                         isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties onDataChanged={(data) => onDataChanged(data)}
                                          isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.RANDOM:
                return (<RandomProperties onDataChanged={(data) => onDataChanged(data)}
                                          isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.CURRENT_TIME:
                return (<CurrentTimeProperties onDataChanged={(data) => onDataChanged(data)}
                                               isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.CLASS:
                return (<ClassProperties onDataChanged={(data) => onDataChanged(data)}
                                         isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.DATA_CLASS:
                return (<DataClassProperties onDataChanged={(data) => onDataChanged(data)}
                                             isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.RETURN:
                return (<ReturnFlowProperties onDataChanged={(data) => onDataChanged(data)}
                                              isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.LIST_NEW:
                return (<NewListProperties onDataChanged={(data) => onDataChanged(data)}
                                           isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.LIST_GET:
                return (<ListGetProperties onDataChanged={(data) => onDataChanged(data)}
                                           isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.LIST_ADD:
                return (<ListAddProperties onDataChanged={(data) => onDataChanged(data)}
                                           isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.LIST_UPDATE:
                return (<ListUpdateProperties onDataChanged={(data) => onDataChanged(data)}
                                              isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.LIST_REMOVE:
                return (<ListRemoveProperties onDataChanged={(data) => onDataChanged(data)}
                                              isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.LIST_CLEAR:
                return (<ListClearProperties onDataChanged={(data) => onDataChanged(data)}
                                             isValidListener={((isValid) => isValidListener(isValid))}/>)
            case FlowType.LIST_SIZE:
                return (<ListSizeProperties onDataChanged={(data) => onDataChanged(data)}
                                            isValidListener={((isValid) => isValidListener(isValid))}/>)
            default:
                return (<div/>)
        }
    }

    static createReadonlyVariableType(type: FlowType | null | undefined, onDataChanged: (data: BasePropertiesState) => void, node?: BaseFlowNode): JSX.Element {
        switch (type) {
            case FlowType.INITIAL:
                return (<InitialFlowProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.WHILE:
                return (<WhileProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.IF:
                return (<IfProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties readonlyType node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties readonlyType node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.UPDATE_VARIABLE:
                return (<UpdateVariableProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.INPUT:
                return (<InputProperties readonlyType node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.RANDOM:
                return (<RandomProperties readonlyType node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.CLASS:
                return (<ClassProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.CURRENT_TIME:
                return (<CurrentTimeProperties readonlyType node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.DATA_CLASS:
                return (<DataClassProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.RETURN:
                return (<ReturnFlowProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.LIST_NEW:
                return (<NewListProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.LIST_GET:
                return (<ListGetProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.LIST_ADD:
                return (<ListAddProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.LIST_UPDATE:
                return (<ListUpdateProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.LIST_REMOVE:
                return (<ListRemoveProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.LIST_CLEAR:
                return (<ListClearProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            case FlowType.LIST_SIZE:
                return (<ListSizeProperties node={node} onDataChanged={(data) => onDataChanged(data)}/>)
            default:
                return (<div/>)
        }
    }

    static createFileProperties(type: FlowType | null | undefined, onDataChanged: (data: BasePropertiesState) => void, isValidListener: (isValid: boolean) => void): JSX.Element {
        switch (type) {
            case FlowType.CLASS:
                return (<CreateClassProperties onDataChanged={(data) => onDataChanged(data)}
                                               isValidListener={(isValid) => isValidListener(isValid)}/>)
            case FlowType.DATA_CLASS:
                return (<CreateDataClassProperties onDataChanged={(data) => onDataChanged(data)}
                                                   isValidListener={(isValid) => isValidListener(isValid)}/>)
            case FlowType.PACKAGE:
                return (<CreatePackageProperties onDataChanged={(data) => onDataChanged(data)}
                                                 isValidListener={(isValid) => isValidListener(isValid)}/>)
            default:
                return (<div/>)
        }
    }

    static getTitleAndDescription(type: FlowType | null | undefined): { title: string, contextText: string } {
        switch (type) {
            case FlowType.INITIAL:
            case FlowType.WHILE:
            case FlowType.IF:
            case FlowType.ARITHMETIC:
            case FlowType.ASSIGNMENT:
            case FlowType.UPDATE_VARIABLE:
            case FlowType.INPUT:
            case FlowType.OUTPUT:
            case FlowType.RETURN:
            case FlowType.RANDOM:
            case FlowType.CURRENT_TIME:
            case FlowType.LIST_NEW:
            case FlowType.LIST_GET:
            case FlowType.LIST_ADD:
            case FlowType.LIST_UPDATE:
            case FlowType.LIST_REMOVE:
            case FlowType.LIST_CLEAR:
            case FlowType.LIST_SIZE:
                return {title: strings.setProperties, contextText: ""}
            case FlowType.DATA_CLASS:
                return {title: strings.newDataClass, contextText: ""}
            case FlowType.CLASS:
                return {title: strings.newClass, contextText: ""}
            case FlowType.PACKAGE:
                return {title: strings.newPackage, contextText: ""}
            default:
                return {title: "", contextText: ""}
        }
    }
}
