import {Point} from "../models/point";
import { Event } from 'ts-typed-events';
import Konva from 'konva';

export class PointsDrawer {
    private _points: Point[] = [];
    private pointDbClickEvent: Event<Point> = new Event<Point>();
    private pointDragendEvent: Event<Point> = new Event<Point>();

    constructor(private layer: Konva.Layer) {
        this.layer =  layer;
    }

    public set points(points: Point[]) {
        this._points = points;
        this.draw();
    }

    private draw() {
        this.layer.destroyChildren();

        this._points.forEach(point => {
            const circle = new Konva.Circle({
                x: point.coordinates.x,
                y: point.coordinates.y,
                radius: point.radius,
                fill: point.color,
                draggable: true,
            });

            circle.on('dblclick', () => {
                this.pointDbClickEvent.emit(point);
            });

            circle.on('dragend', (dragendEventContext) => {
                point.coordinates.x = dragendEventContext.target.x();
                point.coordinates.y = dragendEventContext.target.y();
                this.pointDragendEvent.emit(point);
            });

            this.layer.add(circle);
        });

        this.layer.draw();
    }

    public onPointDblClick(handler: (point: Point) => void): void {
        this.pointDbClickEvent.on(handler);
    }

    public onPointDragend(handler: (point: Point) => void): void {
        this.pointDragendEvent.on(handler);
    }
}