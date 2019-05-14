import {Random} from "../utils"
import {DirectoryItemType} from "../generator/project/DirectoryItem"

export class FileModel {
    id: string
    filename: string
    json: string
    type: DirectoryItemType
    children: FileModel[]

    constructor(filename: string, json: string, type: DirectoryItemType, children: FileModel[]) {
        this.id = Random.UID()
        this.filename = filename
        this.json = json
        this.type = type
        this.children = children
    }
}
