import {Point} from "./point";
import Konva from 'konva';

export class PointDrawer {
    stage: Konva.Stage;
    layer: Konva.Layer;
    points: Point[];

    constructor() {
        this.points = [];
        this.stage = new Konva.Stage({
            container: 'container',
            width: window.innerWidth,
            height: window.innerHeight,
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
    }

    renderPoints() {
        this.layer.destroyChildren();

        this.points.forEach(point => {
            const circle = new Konva.Circle({
                x: point.x,
                y: point.y,
                radius: point.radius,
                fill: point.color,
                draggable: true,
            });

            circle.on('dblclick', () => {
                this.removePoint(point);
            });

            this.layer.add(circle);
        });

        this.layer.draw();
    }

    addPoint(point: Point) {
        this.points.push(point);
        this.renderPoints();
    }

    removePoint(point: Point) {
        const index = this.points.indexOf(point);
        if (index !== -1) {
            this.points.splice(index, 1);
            this.renderPoints();
        }
    }
}