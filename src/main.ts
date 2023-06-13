import { Canvas } from "./components";
import { Bullet, Player } from "./objects";
import { getRandomBoolean, getRandomIntInclusive } from "./utils";
import "./style.css";

const CANVAS_SIZE = 500;

class App {
    #app: HTMLElement;
    #canvas: Canvas;
    #context: CanvasRenderingContext2D;
    #player: Player;
    #bullets: Bullet[];
    #gameOver: boolean;
    #timeStamp: number;
    #difficulty: number;

    constructor() {
        const canvas = new Canvas(CANVAS_SIZE, CANVAS_SIZE);

        this.#app = document.getElementById("app")!;
        this.#gameOver = false;
        this.#canvas = canvas;
        this.#context = canvas.getContext();
        canvas.render(this.#app);

        this.#player = new Player({
            canvasSize: CANVAS_SIZE,
            velocity: 2.5,
        });
        this.#player.bindEvents();

        this.#renderStatusScreen("DODGE", "Press any key to start");
        document.addEventListener("keydown", this.#gameStart.bind(this), {
            once: true,
        });
        this.#bullets = [];
        this.#timeStamp = 0;
        this.#difficulty = 0;
    }

    #gameStart() {
        this.#player.resetPosition();
        this.#gameOver = false;
        this.#difficulty = 0;
        this.#bullets = [...Array(CANVAS_SIZE / 10)].map(
            this.#createRandomBullet
        );
        this.#render(0);
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
            color: "white",
        });
    }

    #render(this: App, time: number, stamp = false) {
        if (this.#gameOver) {
            this.#renderStatusScreen("Game Over", "Press any key to retry");
            document.addEventListener("keydown", this.#gameStart.bind(this), {
                once: true,
            });
            return;
        }

        if (time === 0) {
            window.requestAnimationFrame((x) => this.#render(x, true));
            return;
        }

        if (stamp) {
            this.#timeStamp = time;
        }

        window.requestAnimationFrame(this.#render.bind(this));
        this.#canvas.clear();

        // Score
        const timeGap = (time - this.#timeStamp) / 1000;
        const fontSize = 12;
        const font = "Helvetica, Arial, sans-serif";

        this.#context.font = `${fontSize}px ${font}`;
        this.#context.fillStyle = "white";

        this.#context.textAlign = "left";
        this.#context.fillText(
            `${this.#bullets.length} bullets`,
            10,
            CANVAS_SIZE - 10,
            CANVAS_SIZE
        );

        this.#context.textAlign = "right";
        this.#context.fillText(
            `${timeGap.toFixed(2)}s`,
            CANVAS_SIZE - 10,
            CANVAS_SIZE - 10
        );

        // Player
        this.#player.move();
        this.#player.render(this.#context);

        // Make it more difficult
        if (5 <= timeGap - this.#difficulty) {
            this.#difficulty = timeGap;
            this.#bullets.push(this.#createRandomBullet());
        }

        // Iterate bullets
        for (let i = this.#bullets.length - 1; 0 <= i; --i) {
            const bullet = this.#bullets[i];
            const collision = bullet.checkCollision(this.#player);

            bullet.move();
            bullet.render(this.#context);

            if (collision) {
                this.#gameOver = true;
            }

            if (!bullet.getVisibility(this.#canvas)) {
                this.#bullets.splice(i, 1);
                this.#bullets.push(this.#createRandomBullet());
            }
        }
    }

    #renderStatusScreen(title: string, subheading?: string) {
        const font = "Helvetica, Arial, sans-serif";

        this.#context.textAlign = "center";
        this.#context.fillStyle = "white";

        // Title
        const titleFontSize = 32;
        const titleLineHeight = 1.5;
        const titleYPosition =
            CANVAS_SIZE / 2 - titleFontSize * titleLineHeight;

        this.#context.font = `${titleFontSize}px ${font}`;
        this.#context.fillText(title, CANVAS_SIZE / 2, titleYPosition);

        // Subheading
        if (subheading) {
            const subheadingFontSize = 16;

            this.#context.font = `${subheadingFontSize}px ${font}`;
            this.#context.fillText(
                subheading,
                CANVAS_SIZE / 2,
                titleYPosition + titleFontSize * titleLineHeight
            );
        }
    }
}

new App();
