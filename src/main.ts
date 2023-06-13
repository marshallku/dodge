import { Canvas } from "./components";
import { Square } from "./vectors";
import "./style.css";

function main() {
    const app = document.getElementById("app");
    const canvas = new Canvas(500, 500);
    const square = new Square({ color: "white" });

    if (!app) {
        throw new Error("App doesn't exist");
    }

    canvas.render(app);
    square.render(canvas.getContext());
}

main();
