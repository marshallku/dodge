import { Circle } from "../vectors";
import { MovingObject } from "./types";

export default class Bullet extends Circle {
    #xAcceleration: number;
    #yAcceleration: number;

    constructor(props: Partial<MovingObject> = {}) {
        super(props);
        this.#xAcceleration = props.xAcceleration || 1;
        this.#yAcceleration = props.yAcceleration || 1;
    }

    move() {
        super.move({ x: this.#xAcceleration, y: this.#yAcceleration });
    }
}
