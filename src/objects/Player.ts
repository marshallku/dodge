import { Figure } from "../vectors";
import { KeyboardStatus, PlayerProps } from "./types";
import star from "../assets/star.svg";

export default class Player extends Figure {
    #image: HTMLImageElement;
    #velocity: number;
    #keyboardStatus: KeyboardStatus;
    #validKeys: string[];
    #canvasSize: number;
    #size: number;

    constructor({ canvasSize, velocity }: PlayerProps) {
        const size = 8;

        super({
            x: canvasSize / 2 - size / 2,
            y: canvasSize / 2 - size / 2,
            size,
            color: "red",
        });

        this.#canvasSize = canvasSize;
        this.#size = size;
        this.#velocity = velocity;

        const validKeys: (keyof KeyboardStatus)[] = [
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            "ArrowLeft",
        ];
        this.#keyboardStatus = {
            ArrowUp: false,
            ArrowRight: false,
            ArrowDown: false,
            ArrowLeft: false,
        };
        this.#validKeys = validKeys;

        this.#image = new Image(size, size);
        this.#image.src = star;
    }

    resetPosition() {
        super.update({
            x: this.#canvasSize / 2 - this.#size / 2,
            y: this.#canvasSize / 2 - this.#size / 2,
        });
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(
            this.#image,
            this.x - this.#size / 2,
            this.y - this.#size / 2,
            this.#size * 2,
            this.#size * 2
        );
    }

    move() {
        const { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } =
            this.#keyboardStatus;

        if (ArrowUp) {
            this.moveUp();
        }
        if (ArrowRight) {
            this.moveRight();
        }
        if (ArrowDown) {
            this.moveDown();
        }
        if (ArrowLeft) {
            this.moveLeft();
        }
    }

    moveUp() {
        super.move({ x: 0, y: Math.min(-this.#velocity) });
    }

    moveRight() {
        super.move({ x: this.#velocity, y: 0 });
    }

    moveDown() {
        super.move({ x: 0, y: this.#velocity });
    }

    moveLeft() {
        super.move({ x: -this.#velocity, y: 0 });
    }

    bindEvents() {
        document.addEventListener("keydown", ({ key }) => {
            if (this.#validKeys.includes(key)) {
                this.#keyboardStatus[key as keyof KeyboardStatus] = true;
            }
        });

        document.addEventListener("keyup", ({ key }) => {
            if (this.#validKeys.includes(key)) {
                this.#keyboardStatus[key as keyof KeyboardStatus] = false;
            }
        });
    }
}
