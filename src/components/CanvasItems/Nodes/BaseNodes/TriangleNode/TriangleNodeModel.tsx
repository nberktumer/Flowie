import {NodeModel} from "storm-react-diagrams"
import {TrianglePortModel} from "./TrianglePortModel"
import {DefaultPortType} from "../../../Ports/DefaultPort"

export class TriangleNodeModel extends NodeModel {
    size: number

    constructor(size: number = 150) {
        super("triangle")
        this.size = size

        this.addPort(new TrianglePortModel("top", DefaultPortType.OUT, "top"))
        this.addPort(new TrianglePortModel("left", DefaultPortType.IN, "left"))
        this.addPort(new TrianglePortModel("bottom", DefaultPortType.OUT, "bottom"))
    }
}
