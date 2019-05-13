import {Random} from "../utils"

export class FileModel {
    id: string
    filename: string
    json: string
    isDir: boolean
    isMainClass: boolean
    children: FileModel[]

    constructor(filename: string, json: string, isDir: boolean, isMainClass: boolean, children: FileModel[]) {
        this.id = Random.UID()
        this.filename = filename
        this.json = json
        this.isDir = isDir
        this.isMainClass = isMainClass
        this.children = children
    }
}
