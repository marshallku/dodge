import { Canvas } from "./components";
import { Bullet } from "./objects";
import { getRandomBoolean, getRandomIntInclusive } from "./utils";
import "./style.css";

const CANVAS_SIZE = 500;

class App {
    #app: HTMLElement;
    #canvas: Canvas;
    #context: CanvasRenderingContext2D;
    #bullets: Bullet[];

    constructor() {
        const canvas = new Canvas(CANVAS_SIZE, CANVAS_SIZE);

        this.#app = document.getElementById("app")!;
        this.#canvas = canvas;
        this.#context = canvas.getContext();
        canvas.render(this.#app);
        this.#render(0);

        // Initialize bullets
        this.#bullets = [...Array(CANVAS_SIZE / 20)].map(
            this.#createRandomBullet
        );
    }

    #createRandomBullet() {
        const sign = getRandomBoolean();
        const size = 5;
        const randomCoord = getRandomIntInclusive(0, 500);
        const restCoord = sign ? CANVAS_SIZE + size : -size;
        const horizontalSide = getRandomBoolean();

        return new Bullet({
            x: horizontalSide ? randomCoord : restCoord,
            y: horizontalSide ? restCoord : randomCoord,
            size,
            xAcceleration: getRandomIntInclusive(1, 3) * (sign ? -1 : 1),
            yAcceleration: getRandomIntInclusive(1, 3) * (sign ? -1 : 1),
        });
    }

    #render(this: App, time: number) {
        if (time === 0) {
            window.requestAnimationFrame(this.#render.bind(this));
            return;
        }

        window.requestAnimationFrame(this.#render.bind(this));
        this.#canvas.clear();

        // Iterate bullets
        for (let i = this.#bullets.length - 1; 0 <= i; --i) {
            const bullet = this.#bullets[i];
            bullet.move();
            bullet.render(this.#context);

            if (!bullet.getVisibility(this.#canvas)) {
                this.#bullets.splice(i, 1);
                this.#bullets.push(this.#createRandomBullet());
            }
        }
    }
}

new App();
