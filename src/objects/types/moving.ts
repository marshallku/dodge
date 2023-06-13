import { Figure } from "../../vectors";

export interface MovingObject extends Figure {
    xAcceleration: number;
    yAcceleration: number;
}
