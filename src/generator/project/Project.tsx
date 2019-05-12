import {Directory} from "./Directory";
import {MainClazz} from "./MainClazz";
import {FlowType, ProgrammingLanguage} from "../../models";
import {DirectoryItemType} from "./DirectoryItem";
import {Clazz} from "./Clazz";
import {CodeStrategy} from "../code/CodeStrategy";
import {KotlinCodeStrategy} from "../code/kotlin/KotlinCodeStrategy";
import {CodeStrategyFactory} from "../code/CodeStrategyFactory";
import {FlowModel} from "../FlowModelJSON";
import {BaseFlow} from "../flows/BaseFlow";
import {InitialFlow} from "../flows/InitialFlow";
import {AssignmentFlow} from "../flows/AssignmentFlow";
import {InputFlow} from "../flows/InputFlow";
import {OutputFlow} from "../flows/OutputFlow";
import {ArithmeticFlow} from "../flows/ArithmeticFlow";
import {WhileFlow} from "../flows/WhileFlow";
import {IfFlow} from "../flows/IfFlow";
import {RandomFlow} from "../flows/RandomFlow";

export class Project {
    static codeStrategy: CodeStrategy = new KotlinCodeStrategy()
    static programmingLanguage: ProgrammingLanguage = ProgrammingLanguage.KOTLIN
    rootDirectory: Directory

    constructor(rootDirectory: Directory) {
        this.rootDirectory = rootDirectory
    }

    init(programmingLanguage: ProgrammingLanguage, rootDirectory: Directory) {
        Project.programmingLanguage = programmingLanguage
        Project.codeStrategy = CodeStrategyFactory.createCodeStrategy(programmingLanguage)
        this.recursivelyGenerateClazzCodes(rootDirectory)
    }

    private recursivelyGenerateClazzCodes(directory: Directory) {
        directory.items.forEach(item => {
            switch (item.type) {
                case DirectoryItemType.MAIN_CLASS:
                    const mainClazz = item as MainClazz
                    mainClazz.generateCode()
                    break;
                case DirectoryItemType.CLASS:
                    const clazz = item as Clazz
                    clazz.generateCode()
                    break;
                case DirectoryItemType.DIRECTORY:
                    const directory = item as Directory
                    this.recursivelyGenerateClazzCodes(directory)
                    break;
            }
        })
    }

}
