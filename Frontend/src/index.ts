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

const domProvider = new DomProvider();
const stageProvider = new StageProvider(domProvider.konvaContainer);

const stagePositionReplicator = new KonvaPositionReplicator(stageProvider.stage, domProvider.pointsContainer);
stagePositionReplicator.updatePosition();
const commentContainerReplicator = new CommentsContainerPositionReplicator(domProvider.commentsContainer, domProvider.konvaContainer);
commentContainerReplicator.updatePosition();

new GridDrawer(stageProvider.gridLayer).draw(screen.availWidth, screen.availHeight);

const pointDrawer = new PointsDrawer(stageProvider.pointsLayer);
const pointsFromServer: Point[] = [
    { id: 'asd', coordinates: {x: 0, y: 0}, radius: 30, color: 'brown', comments: [] },
    { id: 'asd', coordinates: {x: 200, y: 200}, radius: 50, color: 'orange', comments: [] }
];
pointDrawer.points = pointsFromServer;

window.addEventListener('resize', () => {
    commentContainerReplicator.updatePosition();
    stagePositionReplicator.updatePosition();
})

const commentsDrawer = new CommentGroupsDrawer(domProvider.commentsContainer);
commentsDrawer.commentGroups = [
    {coordinates: {x: 100, y: 100}, comments: [
            {id: 'asd', text: 'Im comment drawer!', backgroundColor: 'white'},
            {id: 'asd', text: 'Im comment drawer! Im comment drawer! Im comment drawer!', backgroundColor: 'white'},
            {id: 'asd', text: 'Im comment drawer! Im comment drawer!', backgroundColor: 'white'}
        ]},
    {coordinates: {x: 400, y: 200}, comments: [
            {id: 'asd', text: 'Im comment drawer!', backgroundColor: 'gray'},
            {id: 'asd', text: 'Im comment drawer! Im comment drawer! Im comment drawer!', backgroundColor: 'white'},
            {id: 'asd', text: 'Im comment drawer! Im comment drawer!', backgroundColor: 'black'}
        ]}
];

commentsDrawer.dispose();