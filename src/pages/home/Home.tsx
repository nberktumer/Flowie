import React, {Component} from "react"
import styles from "./Home.module.css"
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core"
import {ProjectProvider} from "../../stores/ProjectStore"
import strings from "../../lang"
import {FileUtils} from "../../utils"
import {FileModel} from "../../models/FileModel"

export interface HomeProps {
    onLoad: (data: FileModel[]) => void
}

export interface HomeState {
    projectList: FileModel[],
    isLoaded: boolean,
    isNewProjectDialogOpen: boolean,
    projectName: string
}

export default class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)

        this.state = {
            projectList: [],
            isLoaded: false,
            isNewProjectDialogOpen: false,
            projectName: ""
        }
    }

    onLoadProjectClick = () => {
        FileUtils.load((data: string) => {
            console.log(JSON.parse(data))
            this.setState({projectList: [], isLoaded: true})
        }, (err: string) => {
            console.error(err)
        })
    }

    onCreateNewProjectClick = () => {
        const fileModel = new FileModel(this.state.projectName, "", false, true, [])
        this.setState({projectList: [fileModel], isLoaded: true}, () => {
            console.log(this.state)
            this.props.onLoad([fileModel])
        })
    }

    onNewProjectClick = () => {
        this.setState({isNewProjectDialogOpen: true})
    }

    onNewProjectDialogClose = () => {
        this.setState({isNewProjectDialogOpen: false})
    }

    render() {
        return (
            <ProjectProvider value={{
                project: this.state.projectList
            }}>
                <div className={styles.App}>
                    <Dialog
                        open={this.state.isNewProjectDialogOpen}
                        onClose={() => this.onNewProjectDialogClose()}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{strings.newProject}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send
                                updates occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="projectName"
                                onChange={(e) => this.setState({projectName: e.target.value})}
                                label={strings.projectName}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.onNewProjectDialogClose()} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => this.onCreateNewProjectClick()} color="primary">
                                Subscribe
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Card className={styles.homeContainer}>
                        <CardContent style={{display: "flex", justifyContent: "space-evenly"}}>
                            <Button variant="contained" color="primary" onClick={() => this.onNewProjectClick()}>
                                {strings.newProject}
                            </Button>

                            <Button variant="contained" color="secondary" onClick={() => this.onLoadProjectClick()}>
                                {strings.loadProject}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </ProjectProvider>
        )
    }
}