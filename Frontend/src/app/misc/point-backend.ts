import {CommentBackend} from "./comment-backend";

export interface PointBackend {
    id: number,
    x: number,
    y: number,
    radius: number,
    color: string,
    comments: CommentBackend[]
}