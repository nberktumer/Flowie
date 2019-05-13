import React, {Component} from "react"
import Editor from "./Editor"
import Home from "./Home"
import {FileModel} from "../../models/FileModel"

export interface HomePageProps {
}

export interface HomePageState {
    isLoaded: boolean,
    data: { rootFileModel: FileModel, projectName: string, currentFile: FileModel }
}

export default class HomePage extends Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps) {
        super(props)

        const dummyFileModel = new FileModel("flowie", "", false, false, [])

        this.state = {
            isLoaded: false,
            data: {rootFileModel: dummyFileModel, projectName: "Flowie", currentFile: dummyFileModel}
        }
    }

    render() {
        return this.state.isLoaded ? (
            <Editor project={this.state.data}/>
        ) : (
            <Home onLoad={(data) => this.setState({data, isLoaded: true})}/>
        )
    }
}
