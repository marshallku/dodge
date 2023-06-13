import { Canvas } from "./components";
import "./style.css";

function main() {
    const app = document.getElementById("app");
    const canvas = new Canvas(500, 500);

    if (!app) {
        throw new Error("App doesn't exist");
    }

    canvas.render(app);
}

main();
