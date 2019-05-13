import {DirectoryItem, DirectoryItemType} from "./DirectoryItem"

export class Directory implements DirectoryItem {
    type: DirectoryItemType;
    name: string
    items: DirectoryItem[]

    constructor(name: string, items: DirectoryItem[]) {
        this.type = DirectoryItemType.DIRECTORY
        this.name = name
        this.items = items
    }

    addDirectoryItem(directoryItem: DirectoryItem) {
        this.items.push(directoryItem)
    }

}
