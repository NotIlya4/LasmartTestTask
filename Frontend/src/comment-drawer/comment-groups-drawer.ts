import {CommentGroup} from "./comment-group";
import {CommentGroupDrawerCore} from "./comment-group-drawer-core";

export class CommentGroupsDrawer {
    private commentGroupDrawers: CommentGroupDrawerCore[] = [];

    constructor(private parent: HTMLElement) {
    }

    public draw(commentGroups: CommentGroup[]): void {
        this.dispose();
        this.commentGroupDrawers = commentGroups.map(c => {
            const commentGroupDrawer = new CommentGroupDrawerCore(this.parent);
            commentGroupDrawer.commentGroup = c;
            return commentGroupDrawer;
        });
    }

    public dispose(): void {
        this.commentGroupDrawers.forEach(d => d.dispose());
        this.commentGroupDrawers = [];
    }
}