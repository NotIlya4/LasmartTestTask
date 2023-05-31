import {Point} from "./models/point";
import {PointsDrawer} from "./points-manager/points-drawer";
import './styles.scss';
import {GridDrawer} from "./grid-drawer/grid-drawer";
import {PositionReplicator} from "./misc/position-replicator";
import {DomProvider} from "./providers/dom-provider";
import {KonvaProvider} from "./providers/konva-provider";
import {CommentGroupsDrawer} from "./comment-drawer/comment-groups-drawer";
import {PointsManager} from "./points-manager/points-manager";

const domProvider = new DomProvider();
const stageProvider = new KonvaProvider(domProvider.konvaContainer);

const positionReplicator = new PositionReplicator();
positionReplicator.replicateForKonva(domProvider.pointsContainer, stageProvider.stage);
positionReplicator.replicateForCommentsContainer(domProvider.konvaContainer, domProvider.commentsContainer);

new GridDrawer(stageProvider.gridLayer).draw(screen.availWidth, screen.availHeight);

const pointsFromServer: Point[] = [
    { id: '1', coordinates: {x: 0, y: 0}, radius: 30, color: 'brown', comments: [
            {text: 'Im comment drawer!', backgroundColor: 'white'},
            {text: 'Im comment drawer! Im comment drawer! Im comment drawer!', backgroundColor: 'white'},
            {text: 'Im comment drawer! Im comment drawer!', backgroundColor: 'white'}
        ] },
    { id: '2', coordinates: {x: 200, y: 200}, radius: 50, color: 'orange', comments: [
            {text: 'Im comment drawer!', backgroundColor: 'gray'},
            {text: 'Im comment drawer! Im comment drawer! Im comment drawer!', backgroundColor: 'white'},
            {text: 'Im comment drawer! Im comment drawer!', backgroundColor: 'black'}
        ] }
];

const pointsManager = new PointsManager(new PointsDrawer(stageProvider.pointsLayer), new CommentGroupsDrawer(domProvider.commentsContainer));
pointsManager.points = pointsFromServer;