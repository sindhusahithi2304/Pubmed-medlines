import { HttpService, SqHttpClient, StartConfig } from "@sinequa/core/web-services";
import { Observable } from "rxjs";
import * as i0 from "@angular/core";
declare interface CoreComment {
    commentid: string;
    docid: string;
    replyto: string;
    creation: string;
    modified: string;
    subcomments?: Comment[];
}
export interface DeletedComment extends CoreComment {
    deleted: true;
}
export interface NormalComment extends CoreComment {
    message: string;
    userid: string;
    username: string;
    likes: number;
    likedByUser: boolean;
}
export declare type Comment = NormalComment | DeletedComment;
export declare class CommentsWebService extends HttpService {
    protected httpClient: SqHttpClient;
    protected endpoint: string;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Return the list of comments for a given document
     * @param docid
     * @returns
     */
    getComments(docid: string): Observable<Comment[]>;
    /**
     * Return the number of comments for a given document
     * @param docid
     * @returns
     */
    getCommentCount(docid: string): Observable<number>;
    /**
     * Return the number of comments for a list of documents
     * @param docids
     * @returns
     */
    getCommentCounts(docids: string[]): Observable<{
        [id: string]: number;
    }>;
    /**
     * Create a comment with given message for a given document
     * @param docid
     * @param message
     * @param replyto
     * @returns
     */
    createComment(docid: string, message: string, replyto?: string): Observable<NormalComment>;
    /**
     * Modify the content of a comment
     * @param docid
     * @param commentid
     * @param message
     * @returns
     */
    updateComment(docid: string, commentid: string, message: string): Observable<NormalComment>;
    /**
     * Delete a specific comment
     * @param docid
     * @param commentid
     * @param markAsDeleted
     * @returns
     */
    deleteComment(docid: string, commentid: string, markAsDeleted: boolean): Observable<void>;
    /**
     * Add a like to a comment
     * @param docid
     * @param commentid
     * @returns
     */
    likeComment(docid: string, commentid: string): Observable<NormalComment>;
    static ɵfac: i0.ɵɵFactoryDef<CommentsWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<CommentsWebService>;
}
export {};
//# sourceMappingURL=comments.web.service.d.ts.map