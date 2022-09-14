import { OnChanges, SimpleChanges } from "@angular/core";
import { ModalService } from "@sinequa/core/modal";
import { Principal, PrincipalWebService } from "@sinequa/core/web-services";
import { CommentsWebService, Comment, NormalComment } from "./comments.web.service";
import * as i0 from "@angular/core";
export declare class CommentsComponent implements OnChanges {
    commentsWebService: CommentsWebService;
    modalService: ModalService;
    principalService: PrincipalWebService;
    docid: string;
    theme: 'light' | 'dark';
    comments: Comment[];
    user?: Principal;
    constructor(commentsWebService: CommentsWebService, modalService: ModalService, principalService: PrincipalWebService);
    ngOnChanges(simpleChanges: SimpleChanges): void;
    addComment(replyTo?: Comment): void;
    likeComment(comment: NormalComment): void;
    editComment(comment: NormalComment): void;
    deleteComment(comment: NormalComment): void;
    protected remove(comments: Comment[], comment: Comment): boolean;
    static ɵfac: i0.ɵɵFactoryDef<CommentsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<CommentsComponent, "sq-comments", never, { "docid": "docid"; "theme": "theme"; }, {}, never, never>;
}
//# sourceMappingURL=comments.component.d.ts.map