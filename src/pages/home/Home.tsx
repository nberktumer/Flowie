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
import strings from "../../lang"
import {FileUtils} from "../../utils"
import {FileModel} from "../../models/FileModel"
import {Defaults} from "../../config"

export interface HomeProps {
    onLoad: (projectName: string, data: FileModel[]) => void
}

export interface HomeState {
    isNewProjectDialogOpen: boolean,
    projectName: string
}

export default class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)

        this.state = {
            isNewProjectDialogOpen: false,
            projectName: ""
        }
    }

    onLoadProjectClick = () => {
        FileUtils.load((data: string) => {
            console.log(JSON.parse(data))
            this.props.onLoad(this.state.projectName, JSON.parse(data))
        }, (err: string) => {
            console.error(err)
        })
    }

    onCreateNewProjectClick = () => {
        const fileModel = new FileModel(this.state.projectName, "", false, true, [])
        const srcModel = new FileModel(Defaults.ROOT_FOLDER_NAME, "", true, false, [fileModel])
        this.props.onLoad(this.state.projectName, [srcModel])
    }

    onNewProjectClick = () => {
        this.setState({isNewProjectDialogOpen: true})
    }

    onNewProjectDialogClose = () => {
        this.setState({isNewProjectDialogOpen: false})
    }

    render() {
        return (
            <div className={styles.App}>
                <Dialog
                    open={this.state.isNewProjectDialogOpen}
                    onClose={() => this.onNewProjectDialogClose()}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{strings.newProject}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a auctor dui. Nunc at
                            pellentesque purus. Aliquam leo massa, pellentesque.
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
                            {strings.cancel}
                        </Button>
                        <Button onClick={() => this.onCreateNewProjectClick()} color="primary">
                            {strings.createProject}
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
        )
    }
}
