export class DomProvider {
    public static readonly KONVA_CONTAINER_ID: string = 'konva-container';
    public static readonly POINTS_CONTAINER_ID: string = 'points-container';
    public static readonly COMMENTS_CONTAINER_ID: string = 'comments-container';

    get konvaContainer(): HTMLDivElement {
        return document.getElementById(DomProvider.KONVA_CONTAINER_ID) as HTMLDivElement;
    }

    get pointsContainer(): HTMLElement {
        return document.getElementById(DomProvider.POINTS_CONTAINER_ID)!;
    }

    get commentsContainer(): HTMLElement {
        return document.getElementById(DomProvider.COMMENTS_CONTAINER_ID)!;
    }
}

