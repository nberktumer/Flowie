import React from "react"
import {FileModel} from "../models/FileModel"

export interface ProjectContextInterface {
    project: FileModel[]
}

export const ProjectContext = React.createContext<ProjectContextInterface>({
    project: []
})

export const ProjectProvider = ProjectContext.Provider
export const ProjectConsumer = ProjectContext.Consumer
