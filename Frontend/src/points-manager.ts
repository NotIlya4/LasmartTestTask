import {PointsDrawer} from "./drawers/points-drawer";
import {Point} from "./models/point";

export class PointsManager {
    private _points: Point[] = [];

    constructor(private pointDrawer: PointsDrawer, private parent: HTMLElement) {

    }

    set points(points: Point[]) {
        this._points = points;
        this.pointDrawer.points = points;

    }
}