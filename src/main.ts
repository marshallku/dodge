import { Canvas } from "./components";
import "./style.css";

const CANVAS_SIZE = 500;

class App {
    #app: HTMLElement;
    #canvas: Canvas;

    constructor() {
        const canvas = new Canvas(CANVAS_SIZE, CANVAS_SIZE);

        this.#app = document.getElementById("app")!;
        this.#canvas = canvas;
        canvas.render(this.#app);
        this.#render(0);
    }

    #render(this: App, time: number) {
        if (time === 0) {
            window.requestAnimationFrame(this.#render.bind(this));
            return;
        }

        window.requestAnimationFrame(this.#render.bind(this));
        this.#canvas.clear();
    }
}

new App();
