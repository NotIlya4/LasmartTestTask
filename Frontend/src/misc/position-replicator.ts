import Konva from "konva";

export class PositionReplicator {
    constructor() {

    }

    public replicateForCommentsContainer(konvaContainer: HTMLElement, commentsContainer: HTMLElement): void {
        this.replicatePositionForElement(konvaContainer, commentsContainer);
        window.addEventListener('resize', () => {
            this.replicatePositionForElement(konvaContainer, commentsContainer);
        })
    }

    private replicatePositionForElement(elementPositionFrom: HTMLElement, elementPositionTo: HTMLElement): void {
        const rect: DOMRect = elementPositionFrom.getBoundingClientRect();
        elementPositionTo.style.top = rect.top + 'px';
        elementPositionTo.style.left = rect.left + 'px';
    }

    public replicateForKonva(pointsContainer: HTMLElement, konvaStage: Konva.Stage): void {
        this.replicatePositionForKonva(pointsContainer, konvaStage);
        window.addEventListener('resize', () => {
            this.replicatePositionForKonva(pointsContainer, konvaStage);
        })
    }

    private replicatePositionForKonva(elementPositionFrom: HTMLElement, konvaStage: Konva.Stage): void {
        const rect: DOMRect = elementPositionFrom.getBoundingClientRect();
        konvaStage.container().style.top = rect.top + 'px';
        konvaStage.container().style.left = rect.left + 'px';
        konvaStage.width(rect.width);
        konvaStage.height(rect.height);
    }
}