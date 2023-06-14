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
    #aimedBullets: Bullet[];
    #gameOver: boolean;
    #timeStamp: number;
    #difficulty: number;
    #debugMode: boolean;

    constructor() {
        const canvas = new Canvas(CANVAS_SIZE, CANVAS_SIZE);

        this.#app = document.getElementById("app")!;
        this.#gameOver = true;
        this.#debugMode = false;
        this.#canvas = canvas;
        this.#context = canvas.getContext();
        canvas.render(this.#app);

        this.#player = new Player({
            canvasSize: CANVAS_SIZE,
            velocity: 2.5,
        });
        this.#player.bindEvents();

        this.#renderStatusScreen("DODGE", "Press space to start");
        document.addEventListener("keydown", this.#handleKeydown.bind(this));
        this.#bullets = [];
        this.#aimedBullets = [];
        this.#timeStamp = 0;
        this.#difficulty = 0;
    }

    #handleKeydown({ key }: KeyboardEvent) {
        if (key === "=" && import.meta.env.MODE === "development") {
            console.info(`Debug mode is ${this.#debugMode ? "OFF" : "ON"}`);
            this.#debugMode = !this.#debugMode;
        }

        if (key !== " " || !this.#gameOver) {
            return;
        }

        this.#gameStart();
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
        const size = 2;
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

    #createAimedBullet() {
        const sign = getRandomBoolean();
        const size = 2;
        const randomCoord = getRandomIntInclusive(0, 500);
        const restCoord = sign ? CANVAS_SIZE + size : -size;
        const horizontalSide = getRandomBoolean();
        const playerX = this.#player.x;
        const playerY = this.#player.y;
        const x = horizontalSide ? randomCoord : restCoord;
        const y = horizontalSide ? restCoord : randomCoord;
        const rate = getRandomIntInclusive(40, 60);
        const xAcceleration = (playerX - x) / rate;
        const yAcceleration = (playerY - y) / rate;

        return new Bullet({
            x,
            y,
            size,
            xAcceleration,
            yAcceleration,
            color: "skyblue",
        });
    }

    #updateBullet(bullet: Bullet) {
        const collision = bullet.checkCollision(this.#player);

        bullet.move();
        bullet.render(this.#context);

        if (collision && !this.#debugMode) {
            this.#gameOver = true;
        }
    }

    #render(this: App, time: number, stamp = false) {
        if (this.#gameOver) {
            this.#renderStatusScreen("Game Over", "Press space to retry");
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
            this.#aimedBullets.push(this.#createAimedBullet());
        }

        // Iterate bullets
        for (let i = this.#bullets.length - 1; 0 <= i; --i) {
            const bullet = this.#bullets[i];

            this.#updateBullet(bullet);

            if (!bullet.getVisibility(this.#canvas)) {
                this.#bullets.splice(i, 1);
                this.#bullets.push(this.#createRandomBullet());
            }
        }

        for (let i = this.#aimedBullets.length - 1; 0 <= i; --i) {
            const bullet = this.#aimedBullets[i];

            this.#updateBullet(bullet);

            if (!bullet.getVisibility(this.#canvas)) {
                this.#aimedBullets.splice(i, 1);
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
