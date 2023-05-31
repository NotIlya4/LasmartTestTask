import {CommentGroup} from "./comment-group";
import {CommentGroupDrawerCore} from "./comment-group-drawer-core";

export class CommentGroupsDrawer {
    private internalCommentGroupDrawers: CommentGroupDrawerCore[] = [];

    constructor(private parent: HTMLElement) {
    }

    public set commentGroups(commentGroups: CommentGroup[]) {
        this.draw(commentGroups);
    }

    public dispose(): void {
        this.internalCommentGroupDrawers.forEach(d => d.dispose());
        this.internalCommentGroupDrawers = [];
    }

    private draw(newCommentGroupContexts: CommentGroup[]): void {
        this.dispose();
        this.internalCommentGroupDrawers = newCommentGroupContexts.map(c => {
            const commentGroupDrawer = new CommentGroupDrawerCore(this.parent);
            commentGroupDrawer.commentGroup = c;
            return commentGroupDrawer;
        });
    }
}