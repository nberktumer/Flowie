import React from "react"
import {FileModel} from "../models/FileModel"

export interface ProjectContextInterface {
    project: FileModel
}

export const ProjectContext = React.createContext<ProjectContextInterface>({
    project: new FileModel("", "", false, false, [])
})

export const ProjectProvider = ProjectContext.Provider
export const ProjectConsumer = ProjectContext.Consumer
