import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {RectangleNodeModel} from "../RectangleNodeModel"

export class RectangleNodeWithInfoModel extends RectangleNodeModel {
    info: string

    constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
        super(name, color, "rectangle-node-with-info")
        this.info = ""
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.info = object.info
    }

    serialize() {
        return _.merge(super.serialize(), {
            info: this.info
        })
    }
}
