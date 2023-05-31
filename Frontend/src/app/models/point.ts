import {PointComment} from "./point-comment";
import {Coordinates} from "./coordinates";

export interface Point {
    id: string,
    coordinates: Coordinates,
    radius: number;
    color: string;
    comments: PointComment[];
}