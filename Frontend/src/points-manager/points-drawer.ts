import {Point} from "../models/point";
import { Event } from 'ts-typed-events';
import Konva from 'konva';

export interface IPointsDrawer {
    draw(points: Point[]): void;
    onPointDblClick(handler: (context: {point: Point, eventObject: Konva.KonvaEventObject<MouseEvent>}) => void): void;
    onPointDragmove(handler: (context: {point: Point, eventObject: Konva.KonvaEventObject<any>}) => void): void;
    onPointDragend(handler: (context: {point: Point, eventObject: Konva.KonvaEventObject<DragEvent>}) => void): void;
}

export class PointsDrawer implements IPointsDrawer {
    private pointDbClickEvent = new Event<{point: Point, eventObject: Konva.KonvaEventObject<MouseEvent>}>();
    private pointDragmoveEvent = new Event<{point: Point, eventObject: Konva.KonvaEventObject<any>}>();
    private pointDragendEvent = new Event<{point: Point, eventObject: Konva.KonvaEventObject<DragEvent>}>();

    constructor(private layer: Konva.Layer) {
        this.layer =  layer;
    }

    public draw(points: Point[]): void {
        this.layer.destroyChildren();

        points.forEach(point => {
            const circle = new Konva.Circle({
                x: point.coordinates.x,
                y: point.coordinates.y,
                radius: point.radius,
                fill: point.color,
                draggable: true,
            });

            circle.on('dblclick', dblclickEventContext => {
                this.pointDbClickEvent.emit({point: point, eventObject: dblclickEventContext});
            });

            circle.on('dragmove', dragmoveEventContext => {
                this.pointDragmoveEvent.emit({point: point, eventObject: dragmoveEventContext});
            })

            circle.on('dragend', (dragendEventContext) => {
                this.pointDragendEvent.emit({point: point, eventObject: dragendEventContext});
            });

            this.layer.add(circle);
        });

        this.layer.draw();
    }

    public onPointDblClick(handler: (context: {point: Point, eventObject: Konva.KonvaEventObject<MouseEvent>}) => void): void {
        this.pointDbClickEvent.on(handler);
    }

    public onPointDragmove(handler: (context: {point: Point, eventObject: Konva.KonvaEventObject<any>}) => void): void {
        this.pointDragmoveEvent.on(handler);
    }

    public onPointDragend(handler: (context: {point: Point, eventObject: Konva.KonvaEventObject<DragEvent>}) => void): void {
        this.pointDragendEvent.on(handler);
    }
}

