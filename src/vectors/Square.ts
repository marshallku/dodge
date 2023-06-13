import { Canvas } from "../components";
import { Coordinate, Figure } from "./types";

export default class Square {
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
    }: Partial<Figure> = {}) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.lineWidth = lineWidth;
        this.color = color;
    }

    render(context: CanvasRenderingContext2D) {
        const padding = Math.ceil(this.lineWidth / 2);

        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        context.rect(this.x + padding, this.y + padding, this.size, this.size);
        context.stroke();
    }

    update({ x, y }: Coordinate) {
        this.x = x;
        this.y = y;
    }

    move({ x, y }: Coordinate) {
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

    checkCollision(square: Square) {
        return (
            this.x + this.size >= square.x &&
            this.x <= square.x + square.size &&
            this.y + this.size >= square.y &&
            this.y <= square.y + square.size
        );
    }
}
