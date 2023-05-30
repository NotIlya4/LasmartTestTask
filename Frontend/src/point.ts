export class Point {
    x: number;
    y: number;
    radius: number;
    color: string;
    comments: Comment[];

    constructor(x: number, y: number, radius: number, color: string, comments: Comment[]) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.comments = comments;
    }
}