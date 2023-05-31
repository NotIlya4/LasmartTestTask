import {Coordinates} from "../models/coordinates";
import {PointComment} from "../models/point-comment";

export interface CommentGroup {
    coordinates: Coordinates,
    comments: PointComment[]
}