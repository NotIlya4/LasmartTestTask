import {PointsDrawer} from "./points-manager/points-drawer";
import './styles.scss';
import {GridDrawer} from "./grid-drawer/grid-drawer";
import {PositionReplicator} from "./misc/position-replicator";
import {DomProvider} from "./providers/dom-provider";
import {KonvaProvider} from "./providers/konva-provider";
import {CommentGroupsDrawer} from "./comment-drawer/comment-groups-drawer";
import {PointsManager} from "./points-manager/points-manager";
import * as $ from "jquery";
import {PointsClient} from "./points-client/client";
import {BackendModelMapper} from "./misc/backend-model-mapper";

$(async () => {
    const domProvider: DomProvider = new DomProvider();
    const stageProvider: KonvaProvider = new KonvaProvider(domProvider.konvaContainer);

    const positionReplicator: PositionReplicator = new PositionReplicator();
    positionReplicator.replicateForKonva(domProvider.pointsContainer, stageProvider.stage);
    positionReplicator.replicateForCommentsContainer(domProvider.konvaContainer, domProvider.commentsContainer);

    new GridDrawer(stageProvider.gridLayer).draw(screen.availWidth, screen.availHeight);

    const client: PointsClient = new PointsClient(new BackendModelMapper());

    const pointsManager: PointsManager = new PointsManager(new PointsDrawer(stageProvider.pointsLayer), new CommentGroupsDrawer(domProvider.commentsContainer));
    pointsManager.points = await client.getPoints();

    pointsManager.onPointDelete(async point => {
        await client.removePoint(point.id);
    })
    pointsManager.onPointDragend(async context => {
        await client.updatePointPosition(context.point.id, context.point.coordinates.x, context.point.coordinates.y);
    })
})