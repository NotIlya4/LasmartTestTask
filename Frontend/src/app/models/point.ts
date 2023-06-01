import {PointComment} from "./point-comment";
import {Coordinates} from "./coordinates";

export interface Point {
    id: number,
    coordinates: Coordinates,
    radius: number;
    color: string;
    comments: PointComment[];
}