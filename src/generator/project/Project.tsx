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
import JSZip from "jszip";

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
        this.recursivelyGenerateClazzCodes(this.rootDirectory)
    }

    private recursivelyGenerateClazzCodes(directory: Directory) {

        /*
                var zip = new JSZip();
        zip.file("Hello.txt", "Hello World\n");
        var img = zip.folder("images");
        img.file("smile.gif", imgData, {base64: true});
        zip.generateAsync({type:"blob"})
            .then(function(content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
            });
*/

        directory.items.forEach((item) => {
            switch (item.type) {
                case DirectoryItemType.MAIN_CLASS:
                    const mainClazz = item as MainClazz
                    mainClazz.generateCode()
                    break
                case DirectoryItemType.CLASS:
                    const clazz = item as Clazz
                    clazz.generateCode()
                    break
                case DirectoryItemType.DATA_CLASS:
                    const dataClass = item as DataClazz
                    dataClass.generateCode()
                    break
                case DirectoryItemType.DIRECTORY:
                    const directory = item as Directory
                    this.recursivelyGenerateClazzCodes(directory)
                    break
            }
        })
    }

}
