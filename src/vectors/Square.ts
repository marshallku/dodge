import { Figure, FigureProps } from "./";

export default class Square extends Figure {
    constructor(props: Partial<FigureProps>) {
        super(props);
    }

    render(context: CanvasRenderingContext2D) {
        const padding = Math.ceil(this.lineWidth / 2);

        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        context.rect(this.x + padding, this.y + padding, this.size, this.size);
        context.stroke();
    }
}
