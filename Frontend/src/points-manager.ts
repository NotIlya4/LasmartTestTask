import {PointsDrawer} from "./drawers/points-drawer";
import {Point} from "./models/point";
import {CommentGroupsDrawer} from "./comment-drawer/comment-groups-drawer";
import {CommentGroup} from "./comment-drawer/comment-group";
import Konva from "konva";
import { Event } from 'ts-typed-events';

export class PointsManager {
    private _points: Point[] = [];
    private onPointRemove: Event<Point> = new Event<Point>();

    constructor(private pointDrawer: PointsDrawer, private commentGroupsDrawer: CommentGroupsDrawer) {
        pointDrawer.onPointDragmove(context => {
            const point: Point | undefined = this._points.find(p => p.id === context.point.id);
            if (point !== undefined) {
                point.coordinates = {x: context.eventObject.target.x(), y: context.eventObject.target.y()};
            }
            this.commentGroupsDrawer.draw(this.pointsToCommentGroups(this._points));
        });
        pointDrawer.onPointDblClick(context => {
            this.removePoint(context.point.id);
            this.onPointRemove.emit(context.point);
        })
    }

    set points(points: Point[]) {
        this._points = points;
        this.draw();
    }

    public onPointDragend(handler: (context: {point: Point, eventObject: Konva.KonvaEventObject<DragEvent>}) => void): void {
        this.pointDrawer.onPointDragend(handler);
    }

    public onPointDelete(handler: (point: Point) => void): void {
        this.onPointRemove.on(handler);
    }

    private draw(): void {
        this.pointDrawer.draw(this._points);
        this.commentGroupsDrawer.draw(this.pointsToCommentGroups(this._points));
    }

    private removePoint(pointId: string): void {
        this._points = this._points.filter(p => p.id !== pointId);
        this.draw();
    }

    private pointsToCommentGroups(points: Point[]): CommentGroup[] {
        return points.map(p => {
            const coordinates = {x: p.coordinates.x, y: p.coordinates.y + p.radius + 10};
            return {coordinates: coordinates, comments: p.comments}
        });
    }
}