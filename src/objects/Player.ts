import { Coordinate, Figure } from "../vectors";
import { KeyboardStatus, PlayerProps } from "./types";
import star from "../assets/star.svg";

export default class Player extends Figure {
    #image: HTMLImageElement;
    #velocity: number;
    #keyboardStatus: KeyboardStatus;
    #validKeys: string[];
    #canvasSize: number;
    #boundary: Coordinate;
    #size: number;
    #directions: Coordinate;
    useKeyboard: boolean;

    constructor({ canvasSize, boundary }: PlayerProps) {
        const size = 8;

        super({
            x: canvasSize / 2 - size / 2,
            y: canvasSize / 2 - size / 2,
            size,
            color: "red",
        });

        this.#canvasSize = canvasSize;
        this.#size = size;
        this.#velocity = 200;
        this.#boundary = boundary;

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
        this.#directions = {
            x: 0,
            y: 0,
        };

        this.#image = new Image(size, size);
        this.#image.src = star;

        this.useKeyboard = false;
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

    moveTo(deltaTime: number) {
        // Sensor
        if (!this.useKeyboard) {
            this.moveDirections(deltaTime);
        }

        // Keyboard
        const { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } =
            this.#keyboardStatus;

        if (ArrowUp) {
            this.moveUp(deltaTime);
        }
        if (ArrowRight) {
            this.moveRight(deltaTime);
        }
        if (ArrowDown) {
            this.moveDown(deltaTime);
        }
        if (ArrowLeft) {
            this.moveLeft(deltaTime);
        }
    }

    moveUp(deltaTime: number) {
        super.move(
            { x: 0, y: Math.min(-this.#velocity) * deltaTime },
            this.#boundary
        );
    }

    moveRight(deltaTime: number) {
        super.move({ x: this.#velocity * deltaTime, y: 0 }, this.#boundary);
    }

    moveDown(deltaTime: number) {
        super.move({ x: 0, y: this.#velocity * deltaTime }, this.#boundary);
    }

    moveLeft(deltaTime: number) {
        super.move({ x: -this.#velocity * deltaTime, y: 0 }, this.#boundary);
    }

    moveDirections(deltaTime: number) {
        const { x, y } = this.#directions;

        super.move(
            {
                x: x * this.#velocity * deltaTime,
                y: y * this.#velocity * deltaTime,
            },
            this.#boundary
        );
    }

    #handleDeviceOrientation({ beta, gamma }: DeviceOrientationEvent) {
        if (beta == null || gamma == null) {
            return;
        }

        const speed = 3;
        // Comfort degree when holding phone
        const betaStabilizer = 50;
        const x = Math.min(1, Math.max(gamma / 90, -1)) * speed;
        const y =
            Math.min(1, Math.max((beta - betaStabilizer) / 180, -1)) * speed;

        this.#directions = { x, y };
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

        window.addEventListener(
            "deviceorientation",
            this.#handleDeviceOrientation.bind(this),
            { passive: true }
        );
    }
}
