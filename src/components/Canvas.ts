export default class Canvas {
    #canvas: HTMLCanvasElement;
    constructor(width?: number, height?: number) {
        const canvas = document.createElement("canvas");

        if (width) {
            canvas.width = width;
        }

        if (height) {
            canvas.height = height;
        }

        this.#canvas = canvas;
    }

    render(element = document.body) {
        element.append(this.#canvas);
    }

    destroy() {
        this.#canvas.remove();
    }

    getCanvas() {
        return this.#canvas;
    }

    getContext() {
        const context = this.#canvas.getContext("2d");

        if (!context) {
            throw new Error("Context doesn't exist");
        }

        return context;
    }

    setSize(width: number, height: number) {
        this.#canvas.width = width;
        this.#canvas.height = height;
    }
}
