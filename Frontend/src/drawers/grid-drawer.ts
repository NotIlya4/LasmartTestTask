import Konva from "konva";
import {GridDrawerOptions} from "./grid-drawer-options";

export class GridDrawer {
    constructor(private layer: Konva.Layer, private gridDrawerOptions: GridDrawerOptions = {color: 'gray', width: 2, distanceBetweenLines: 100}) {

    }

    public draw(width: number, height: number) {
        this.layer.destroyChildren();

        for (let x = this.gridDrawerOptions.distanceBetweenLines; x < width; x += this.gridDrawerOptions.distanceBetweenLines) {
            const verticalLine = new Konva.Line({
                points: [x, 0, x, height],
                stroke: this.gridDrawerOptions.color,
                strokeWidth: this.gridDrawerOptions.width
            });

            this.layer.add(verticalLine);
        }

        for (let y = this.gridDrawerOptions.distanceBetweenLines; y < height; y += this.gridDrawerOptions.distanceBetweenLines) {
            const horizontalLine = new Konva.Line({
                points: [0, y, width, y],
                stroke: this.gridDrawerOptions.color,
                strokeWidth: this.gridDrawerOptions.width
            });

            this.layer.add(horizontalLine);
        }

        this.layer.draw();
    }
}