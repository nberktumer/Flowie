import {Directory} from "./Directory"
import {MainClazz} from "./MainClazz"
import {ProgrammingLanguage} from "../../models"
import {DirectoryItemType} from "./DirectoryItem"
import {Clazz} from "./Clazz"
import {CodeStrategy} from "../code/CodeStrategy"
import {KotlinCodeStrategy} from "../code/kotlin/KotlinCodeStrategy"
import {CodeStrategyFactory} from "../code/CodeStrategyFactory"
import {Defaults} from "../../config"
import {DataClazz} from "./DataClazz"
import JSZip from "jszip"
import {FileUtils} from "../../utils"

export class Project {
    static codeStrategy: CodeStrategy = new KotlinCodeStrategy()
    static programmingLanguage: ProgrammingLanguage = ProgrammingLanguage.KOTLIN
    projectName: string
    rootDirectory: Directory

    constructor(projectName: string) {
        this.projectName = projectName
        this.rootDirectory = new Directory(Defaults.ROOT_FOLDER_NAME, [])
    }

    static setProgrammingLanguage(programmingLanguage: ProgrammingLanguage) {
        Clazz.flowIncrementalId = 0
        Project.programmingLanguage = programmingLanguage
        Project.codeStrategy = CodeStrategyFactory.createCodeStrategy(programmingLanguage)
    }

    generateClazzCodes() {
        const zip = new JSZip()
        this.recursivelyGenerateClazzCodes(this.rootDirectory, zip)
        zip.generateAsync({type: "blob"}).then((item) => {
            FileUtils.download(item, `${this.projectName}.zip`)
        })
    }

    private recursivelyGenerateClazzCodes(directory: Directory, jsZip: JSZip) {
        directory.items.forEach((item) => {
            switch (item.type) {
                case DirectoryItemType.MAIN_CLASS:
                    const mainClazz = item as MainClazz
                    mainClazz.generateCode()
                    jsZip.file(mainClazz.name, mainClazz.getCode())
                    break
                case DirectoryItemType.CLASS:
                    const clazz = item as Clazz
                    clazz.generateCode()
                    jsZip.file(clazz.name, clazz.getCode())
                    break
                case DirectoryItemType.DATA_CLASS:
                    const dataClass = item as DataClazz
                    dataClass.generateCode()
                    jsZip.file(dataClass.name, dataClass.getCode())
                    break
                case DirectoryItemType.DIRECTORY:
                    const directory = item as Directory
                    this.recursivelyGenerateClazzCodes(directory, jsZip)
                    break
            }
        })
    }

}
