import {Point} from "./point";
import {PointComment} from "./point-comment";
import {PointDrawer} from "./point-drawer";

const pointsFromServer = [
    new Point(100, 100, 10, 'red', []),
    new Point(200, 200, 15, 'blue', []),
];

const drawer = new PointDrawer();

pointsFromServer.forEach(point => {
    drawer.addPoint(point);
});