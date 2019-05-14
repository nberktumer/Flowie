import React from "react"
import {FileModel} from "../models/FileModel"
import {DirectoryItemType} from "../generator/project/DirectoryItem"

export interface ProjectContextInterface {
    project: FileModel
}

export const ProjectContext = React.createContext<ProjectContextInterface>({
    project: new FileModel("", "", DirectoryItemType.CLASS, [])
})

export const ProjectProvider = ProjectContext.Provider
export const ProjectConsumer = ProjectContext.Consumer
