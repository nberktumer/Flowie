import {DirectoryItem, DirectoryItemType} from "./DirectoryItem";

export class Directory implements DirectoryItem {
    type: DirectoryItemType;
    name: string
    items: DirectoryItem[]

    constructor(type: DirectoryItemType, name: string, items: DirectoryItem[]) {
        this.type = type
        this.name = name
        this.items = items
    }

    addDirectoryItem(directoryItem: DirectoryItem) {
        this.items.push(directoryItem)
    }

}
