export class CommentsContainerPositionReplicator {
    constructor(private commentsContainer: HTMLElement, private positionSourceElement: HTMLElement) {

    }

    public updatePosition(): void {
        const rect: DOMRect = this.positionSourceElement.getBoundingClientRect();
        this.commentsContainer.style.top = rect.top + 'px';
        this.commentsContainer.style.left = rect.left + 'px';
    }
}