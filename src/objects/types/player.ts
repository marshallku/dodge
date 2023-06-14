import { Coordinate } from "../../vectors";

export interface KeyboardStatus {
    ArrowUp: boolean;
    ArrowRight: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
}

export interface PlayerProps {
    canvasSize: number;
    velocity: number;
    boundary: Coordinate;
}
