export class FileModel {
    filename: string
    json: string
    isDir: boolean
    isMainClass: boolean
    children: FileModel[]

    constructor(filename: string, json: string, isDir: boolean, isMainClass: boolean, children: FileModel[]) {
        this.filename = filename
        this.json = json
        this.isDir = isDir
        this.isMainClass = isMainClass
        this.children = children
    }
}
