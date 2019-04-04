import {NodeModel} from "storm-react-diagrams"
import {TrianglePortModel} from "./TrianglePortModel"

export class TriangleNodeModel extends NodeModel {
    size: number

    constructor(size: number = 150) {
        super("triangle")
        this.size = size

        this.addPort(new TrianglePortModel("top", false, "top"))
        this.addPort(new TrianglePortModel("left", true, "left"))
        this.addPort(new TrianglePortModel("bottom", false, "bottom"))
    }
}
