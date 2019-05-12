export interface DirectoryItem {
    name: string
    type: DirectoryItemType
}

export enum DirectoryItemType {
    MAIN_CLASS = "MainClass",
    CLASS = "Class",
    DIRECTORY = "Directory"
}
