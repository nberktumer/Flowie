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
    TextField,
    Typography
} from "@material-ui/core"
import strings from "../../lang"
import {FileUtils} from "../../utils"
import {FileModel} from "../../models/FileModel"
import {Defaults} from "../../config"
import {DirectoryItemType} from "../../generator/project/DirectoryItem"
import {VariableType} from "../../models"
import ClazzModel from "../../models/ClazzModel"

export interface HomeProps {
    onLoad: (data: { rootFileModel: FileModel, projectName: string, currentFile: FileModel, bigBigNoPackage: {ReturnType: VariableType, classList: ClazzModel[]} }) => void
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
            try {
                this.props.onLoad(JSON.parse(data) as { rootFileModel: FileModel, projectName: string, currentFile: FileModel, bigBigNoPackage: {ReturnType: VariableType, classList: ClazzModel[]} })
            } catch (e) {
                console.error(e)
            }
        }, (err: string) => {
            console.error(err)
        })
    }

    onCreateNewProjectClick = () => {
        const mainFileModel = new FileModel(this.state.projectName, "", DirectoryItemType.MAIN_CLASS, [])
        const srcModel = new FileModel(Defaults.ROOT_FOLDER_NAME, "", DirectoryItemType.DIRECTORY, [mainFileModel])

        const data = {
            rootFileModel: srcModel,
            currentFile: mainFileModel,
            projectName: this.state.projectName,
            bigBigNoPackage: {ReturnType: VariableType.NONE, classList: []}
        }
        this.props.onLoad(data)
    }

    onNewProjectClick = () => {
        this.setState({isNewProjectDialogOpen: true})
    }

    onNewProjectDialogClose = () => {
        this.setState({isNewProjectDialogOpen: false})
    }

    render() {
        return (
            <div className={styles.homeApp}>
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
                            margin="normal"
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

                <Typography className={styles.homeLogoText}>Flowie</Typography>

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
