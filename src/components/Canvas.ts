export default class Canvas {
    width: number;
    height: number;
    #canvas: HTMLCanvasElement;

    constructor(width = 500, height = 500) {
        const canvas = document.createElement("canvas");

        this.width = width;
        this.height = height;
        this.#canvas = canvas;
        this.#updateSize();
    }

    render(element = document.body) {
        element.append(this.#canvas);
    }

    destroy() {
        this.#canvas.remove();
    }

    clear() {
        this.getContext().clearRect(0, 0, this.width, this.height);
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
        this.width = width;
        this.height = height;
        this.#updateSize();
    }

    #updateSize() {
        this.#canvas.width = this.width;
        this.#canvas.height = this.height;
    }
}
