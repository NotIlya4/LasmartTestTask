import {PointComment} from "../models/point-comment";
import {Coordinates} from "../models/coordinates";
import {CommentGroup} from "./comment-group";

export class CommentGroupDrawerCore {
    private _commentGroup: CommentGroup = {coordinates: {x: 0, y: 0}, comments: []};
    private element: HTMLElement;

    constructor(parent: HTMLElement) {
        this.element = document.createElement('div');
        this.element.classList.add('comments-flex');
        parent.appendChild(this.element);
    }

    public set commentGroup(commentGroup: CommentGroup) {
        this._commentGroup = commentGroup;
        this.draw();
    }

    public set comments(comments: PointComment[]) {
        this._commentGroup.comments = comments;
        this.draw();
    }

    public set coordinates(coordinates: Coordinates) {
        this._commentGroup.coordinates = coordinates;
        this.setCoordinates();
    }

    public pushComment(comment: PointComment): void {
        this._commentGroup.comments.push(comment);
        const commentElement = CommentGroupDrawerCore.createCommentElement(comment);
        this.element.appendChild(commentElement);
        this.setCoordinates();
    }

    public dispose(): void {
        this.element.remove();
    }

    private draw(): void {
        this.cleanChildren();
        this._commentGroup.comments.forEach(c => {
            const commentElement = CommentGroupDrawerCore.createCommentElement(c);
            this.element.appendChild(commentElement);
        })
        this.setCoordinates();
    }

    private setCoordinates(): void {
        const rect: DOMRect = this.element.getBoundingClientRect();
        this.element.style.left = `${this._commentGroup.coordinates.x - rect.width / 2}px`;
        this.element.style.top = `${this._commentGroup.coordinates.y}px`;
    }

    private static createCommentElement(comment: PointComment): HTMLElement {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.style.backgroundColor = comment.backgroundColor;
        commentElement.textContent = comment.text;
        return commentElement;
    }

    private cleanChildren(): void {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.lastChild!);
        }
    }
}