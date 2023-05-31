import Konva from "konva";

export class KonvaPositionReplicator {
    private konvaContainer: HTMLElement

    constructor(private stage: Konva.Stage, private positionSourceElement: HTMLElement) {
        this.konvaContainer = stage.container();
    }

    public updatePosition(): void {
        const rect: DOMRect = this.positionSourceElement.getBoundingClientRect();
        this.konvaContainer.style.top = rect.top + 'px';
        this.konvaContainer.style.left = rect.left + 'px';
        this.stage.width(rect.width);
        this.stage.height(rect.height);
    }
}