import { Canvas } from "../components";
import { Coordinate, FigureProps } from "./types";

export default class Figure {
    x: number;
    y: number;
    size: number;
    lineWidth: number;
    color: string;

    constructor({
        x = 0,
        y = 0,
        size = 1,
        lineWidth = 1,
        color = "black",
    }: Partial<FigureProps> = {}) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.lineWidth = lineWidth;
        this.color = color;
    }

    render(_: CanvasRenderingContext2D) {
        throw new Error("Implement render method");
    }

    update({ x, y }: Coordinate) {
        this.x = x;
        this.y = y;
    }

    move({ x, y }: Coordinate, boundary?: Coordinate) {
        if (boundary) {
            this.x = Math.min(Math.max(0, this.x + x), boundary.x - this.size);
            this.y = Math.min(Math.max(0, this.y + y), boundary.y - this.size);
            return;
        }
        this.x += x;
        this.y += y;
    }

    getVisibility(canvas: Canvas) {
        return !(
            this.x < -this.size ||
            canvas.width + this.size < this.x ||
            this.y < -this.size ||
            canvas.height + this.size < this.y
        );
    }

    checkCollision(figure: Figure) {
        return (
            this.x + this.size >= figure.x &&
            this.x <= figure.x + figure.size &&
            this.y + this.size >= figure.y &&
            this.y <= figure.y + figure.size
        );
    }
}
