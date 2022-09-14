import { Inject, Injectable } from "@angular/core";
import { HttpService, START_CONFIG } from "@sinequa/core/web-services";
import { of } from "rxjs";
import { pluck } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
export class CommentsWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this.endpoint = 'plugin/CommentsWebService';
    }
    /**
     * Return the list of comments for a given document
     * @param docid
     * @returns
     */
    getComments(docid) {
        return this.httpClient.post(this.makeUrl(this.endpoint), { docid, action: 'read' }).pipe(pluck('comments'));
    }
    /**
     * Return the number of comments for a given document
     * @param docid
     * @returns
     */
    getCommentCount(docid) {
        return this.httpClient.post(this.makeUrl(this.endpoint), { docid, action: 'count' }).pipe(pluck('count'));
    }
    /**
     * Return the number of comments for a list of documents
     * @param docids
     * @returns
     */
    getCommentCounts(docids) {
        if (docids.length === 0) {
            return of({});
        }
        return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docids[0], docids, action: 'count' }).pipe(pluck('counts'));
    }
    /**
     * Create a comment with given message for a given document
     * @param docid
     * @param message
     * @param replyto
     * @returns
     */
    createComment(docid, message, replyto) {
        return this.httpClient.post(this.makeUrl(this.endpoint), { docid, message, replyto, action: 'create' }).pipe(pluck('comment'));
    }
    /**
     * Modify the content of a comment
     * @param docid
     * @param commentid
     * @param message
     * @returns
     */
    updateComment(docid, commentid, message) {
        return this.httpClient.post(this.makeUrl(this.endpoint), { docid, commentid, message, action: 'update' }).pipe(pluck('comment'));
    }
    /**
     * Delete a specific comment
     * @param docid
     * @param commentid
     * @param markAsDeleted
     * @returns
     */
    deleteComment(docid, commentid, markAsDeleted) {
        return this.httpClient.post(this.makeUrl(this.endpoint), { docid, commentid, markAsDeleted, action: 'delete' });
    }
    /**
     * Add a like to a comment
     * @param docid
     * @param commentid
     * @returns
     */
    likeComment(docid, commentid) {
        return this.httpClient.post(this.makeUrl(this.endpoint), { docid, commentid, action: 'like' }).pipe(pluck('comment'));
    }
}
CommentsWebService.ɵfac = function CommentsWebService_Factory(t) { return new (t || CommentsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
CommentsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: CommentsWebService, factory: CommentsWebService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CommentsWebService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMud2ViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9jb21tZW50cy8iLCJzb3VyY2VzIjpbImNvbW1lbnRzLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQTZCLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xHLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUE2QnZDLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxXQUFXO0lBRy9DLFlBQzBCLFdBQXdCLEVBQ3BDLFVBQXdCO1FBQ2xDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQURULGVBQVUsR0FBVixVQUFVLENBQWM7UUFKNUIsYUFBUSxHQUFHLDJCQUEyQixDQUFDO0lBTWpELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLEtBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUN2RCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWUsQ0FBQyxLQUFhO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsQ0FDeEQsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxnQkFBZ0IsQ0FBQyxNQUFnQjtRQUM3QixJQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDLENBQzNFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxhQUFhLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFnQjtRQUMxRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FDM0UsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxPQUFlO1FBQzNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUM3RSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsYUFBYSxDQUFDLEtBQWEsRUFBRSxTQUFpQixFQUFFLGFBQXNCO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUNuRixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsV0FBVyxDQUFDLEtBQWEsRUFBRSxTQUFpQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUNsRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDOztvRkE5RlEsa0JBQWtCLGNBSWYsWUFBWTswREFKZixrQkFBa0IsV0FBbEIsa0JBQWtCLG1CQUZmLE1BQU07a0RBRVQsa0JBQWtCO2NBSDlCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBS1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cFNlcnZpY2UsIFNxSHR0cENsaWVudCwgU3RhcnRDb25maWcsIFNUQVJUX0NPTkZJRyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IHBsdWNrIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBDb3JlQ29tbWVudCB7XHJcbiAgICBjb21tZW50aWQ6IHN0cmluZztcclxuICAgIGRvY2lkOiBzdHJpbmc7XHJcbiAgICByZXBseXRvOiBzdHJpbmc7XHJcbiAgICBjcmVhdGlvbjogc3RyaW5nO1xyXG4gICAgbW9kaWZpZWQ6IHN0cmluZztcclxuICAgIHN1YmNvbW1lbnRzPzogQ29tbWVudFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERlbGV0ZWRDb21tZW50IGV4dGVuZHMgQ29yZUNvbW1lbnR7XHJcbiAgICBkZWxldGVkOiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vcm1hbENvbW1lbnQgZXh0ZW5kcyBDb3JlQ29tbWVudCB7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICB1c2VyaWQ6IHN0cmluZztcclxuICAgIHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICBsaWtlczogbnVtYmVyO1xyXG4gICAgbGlrZWRCeVVzZXI6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIENvbW1lbnQgPSBOb3JtYWxDb21tZW50IHwgRGVsZXRlZENvbW1lbnQ7XHJcblxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21tZW50c1dlYlNlcnZpY2UgZXh0ZW5kcyBIdHRwU2VydmljZSB7XHJcbiAgICBwcm90ZWN0ZWQgZW5kcG9pbnQgPSAncGx1Z2luL0NvbW1lbnRzV2ViU2VydmljZSc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcclxuICAgICAgICBwcm90ZWN0ZWQgaHR0cENsaWVudDogU3FIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgc3VwZXIoc3RhcnRDb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBsaXN0IG9mIGNvbW1lbnRzIGZvciBhIGdpdmVuIGRvY3VtZW50XHJcbiAgICAgKiBAcGFyYW0gZG9jaWQgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZ2V0Q29tbWVudHMoZG9jaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q29tbWVudFtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PHtjb21tZW50czogQ29tbWVudFtdfT4oXHJcbiAgICAgICAgICAgIHRoaXMubWFrZVVybCh0aGlzLmVuZHBvaW50KSwge2RvY2lkLCBhY3Rpb246ICdyZWFkJ31cclxuICAgICAgICApLnBpcGUocGx1Y2soJ2NvbW1lbnRzJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgY29tbWVudHMgZm9yIGEgZ2l2ZW4gZG9jdW1lbnRcclxuICAgICAqIEBwYXJhbSBkb2NpZCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRDb21tZW50Q291bnQoZG9jaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PHtjb3VudDogbnVtYmVyfT4oXHJcbiAgICAgICAgICAgIHRoaXMubWFrZVVybCh0aGlzLmVuZHBvaW50KSwge2RvY2lkLCBhY3Rpb246ICdjb3VudCd9XHJcbiAgICAgICAgKS5waXBlKHBsdWNrKCdjb3VudCcpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGNvbW1lbnRzIGZvciBhIGxpc3Qgb2YgZG9jdW1lbnRzXHJcbiAgICAgKiBAcGFyYW0gZG9jaWRzIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGdldENvbW1lbnRDb3VudHMoZG9jaWRzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8e1tpZDogc3RyaW5nXTogbnVtYmVyfT4ge1xyXG4gICAgICAgIGlmKGRvY2lkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PHtjb3VudHM6IHtbaWQ6IHN0cmluZ106IG51bWJlcn19PihcclxuICAgICAgICAgICAgdGhpcy5tYWtlVXJsKHRoaXMuZW5kcG9pbnQpLCB7ZG9jaWQ6IGRvY2lkc1swXSwgZG9jaWRzLCBhY3Rpb246ICdjb3VudCd9XHJcbiAgICAgICAgKS5waXBlKHBsdWNrKCdjb3VudHMnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBjb21tZW50IHdpdGggZ2l2ZW4gbWVzc2FnZSBmb3IgYSBnaXZlbiBkb2N1bWVudFxyXG4gICAgICogQHBhcmFtIGRvY2lkIFxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgXHJcbiAgICAgKiBAcGFyYW0gcmVwbHl0byBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVDb21tZW50KGRvY2lkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgcmVwbHl0bz86IHN0cmluZyk6IE9ic2VydmFibGU8Tm9ybWFsQ29tbWVudD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDx7Y29tbWVudDogTm9ybWFsQ29tbWVudH0+KFxyXG4gICAgICAgICAgICB0aGlzLm1ha2VVcmwodGhpcy5lbmRwb2ludCksIHtkb2NpZCwgbWVzc2FnZSwgcmVwbHl0bywgYWN0aW9uOiAnY3JlYXRlJ31cclxuICAgICAgICApLnBpcGUocGx1Y2soJ2NvbW1lbnQnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb2RpZnkgdGhlIGNvbnRlbnQgb2YgYSBjb21tZW50XHJcbiAgICAgKiBAcGFyYW0gZG9jaWQgXHJcbiAgICAgKiBAcGFyYW0gY29tbWVudGlkIFxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ29tbWVudChkb2NpZDogc3RyaW5nLCBjb21tZW50aWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PHtjb21tZW50OiBOb3JtYWxDb21tZW50fT4oXHJcbiAgICAgICAgICAgIHRoaXMubWFrZVVybCh0aGlzLmVuZHBvaW50KSwge2RvY2lkLCBjb21tZW50aWQsIG1lc3NhZ2UsIGFjdGlvbjogJ3VwZGF0ZSd9XHJcbiAgICAgICAgKS5waXBlKHBsdWNrKCdjb21tZW50JykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIGEgc3BlY2lmaWMgY29tbWVudFxyXG4gICAgICogQHBhcmFtIGRvY2lkIFxyXG4gICAgICogQHBhcmFtIGNvbW1lbnRpZCBcclxuICAgICAqIEBwYXJhbSBtYXJrQXNEZWxldGVkIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUNvbW1lbnQoZG9jaWQ6IHN0cmluZywgY29tbWVudGlkOiBzdHJpbmcsIG1hcmtBc0RlbGV0ZWQ6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3Q8dm9pZD4oXHJcbiAgICAgICAgICAgIHRoaXMubWFrZVVybCh0aGlzLmVuZHBvaW50KSwge2RvY2lkLCBjb21tZW50aWQsIG1hcmtBc0RlbGV0ZWQsIGFjdGlvbjogJ2RlbGV0ZSd9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIGxpa2UgdG8gYSBjb21tZW50XHJcbiAgICAgKiBAcGFyYW0gZG9jaWQgXHJcbiAgICAgKiBAcGFyYW0gY29tbWVudGlkIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGxpa2VDb21tZW50KGRvY2lkOiBzdHJpbmcsIGNvbW1lbnRpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxOb3JtYWxDb21tZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PHtjb21tZW50OiBOb3JtYWxDb21tZW50fT4oXHJcbiAgICAgICAgICAgIHRoaXMubWFrZVVybCh0aGlzLmVuZHBvaW50KSwge2RvY2lkLCBjb21tZW50aWQsIGFjdGlvbjogJ2xpa2UnfVxyXG4gICAgICAgICkucGlwZShwbHVjaygnY29tbWVudCcpKTtcclxuICAgIH1cclxufSJdfQ==