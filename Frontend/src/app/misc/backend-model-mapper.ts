import {PointBackend} from "./point-backend";
import {Point} from "../models/point";
import {CommentBackend} from "./comment-backend";
import {PointComment} from "../models/point-comment";

export class BackendModelMapper {
    public MapBackendPoint(point: PointBackend): Point {
        return {
            id: point.id,
            coordinates: {
                x: point.x,
                y: point.y
            },
            radius: point.radius,
            color: point.color,
            comments: this.MapBackendComments(point.comments)
        };
    }

    public MapBackendPoints(points: PointBackend[]): Point[] {
        return points.map(p => this.MapBackendPoint(p));
    }

    public MapBackendComment(comment: CommentBackend): PointComment {
        return {
            text: comment.text,
            backgroundColor: comment.backgroundColor
        };
    }

    public MapBackendComments(comments: CommentBackend[]): PointComment[] {
        return comments.map(c => this.MapBackendComment(c));
    }
}