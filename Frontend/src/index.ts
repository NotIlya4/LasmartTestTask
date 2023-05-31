import {Point} from "./models/point";
import {PointComment} from "./models/point-comment";
import {PointsDrawer} from "./drawers/points-drawer";
import Konva from "konva";
import './styles.scss';
import {KonvaPositionReplicator} from "./position-replicators/konva-position-replicator";
import {GridDrawer} from "./drawers/grid-drawer";
import {CommentsContainerPositionReplicator} from "./position-replicators/comments-container-position-replicator";
import {CommentGroupDrawerCore} from "./comment-drawer/comment-group-drawer-core";
import {DomProvider} from "./dom-provider";
import {StageProvider} from "./stage-provider";
import {CommentGroupsDrawer} from "./comment-drawer/comment-groups-drawer";
import {PointsManager} from "./points-manager";

const domProvider = new DomProvider();
const stageProvider = new StageProvider(domProvider.konvaContainer);

const stagePositionReplicator = new KonvaPositionReplicator(stageProvider.stage, domProvider.pointsContainer);
stagePositionReplicator.updatePosition();
const commentContainerReplicator = new CommentsContainerPositionReplicator(domProvider.commentsContainer, domProvider.konvaContainer);
commentContainerReplicator.updatePosition();
window.addEventListener('resize', () => {
    commentContainerReplicator.updatePosition();
    stagePositionReplicator.updatePosition();
})
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