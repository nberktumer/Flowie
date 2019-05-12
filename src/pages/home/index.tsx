import React, {Component} from "react"
import Editor from "./Editor"
import Home from "./Home"
import {FileModel} from "../../models/FileModel"

export interface HomePageProps {
}

export interface HomePageState {
    isLoaded: boolean,
    data: FileModel[]
}

export default class HomePage extends Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps) {
        super(props)

        this.state = {
            isLoaded: false,
            data: []
        }
    }

    render() {
        return this.state.isLoaded ? (<Editor project={this.state.data}/>) : (
            <Home onLoad={(data) => this.setState({data, isLoaded: true})}/>)
    }
}
