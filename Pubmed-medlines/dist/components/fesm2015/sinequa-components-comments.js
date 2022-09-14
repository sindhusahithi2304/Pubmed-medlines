import { NgIf, NgClass, NgTemplateOutlet, NgForOf, CommonModule } from '@angular/common';
import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdirectiveInject, ɵɵdefinePipe, Pipe, ɵɵelementContainer, ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate1, ɵɵpipeBind1, ɵɵgetCurrentView, ɵɵtemplate, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵelement, ɵɵreference, ɵɵproperty, ɵɵpureFunction1, ɵɵtextInterpolate, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵsanitizeHtml, ɵɵpureFunction2, ɵɵdefineComponent, ɵɵNgOnChangesFeature, ɵɵtemplateRefExtractor, Component, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { CollapseButton, Collapse, CollapseModule } from '@sinequa/components/collapse';
import { RelativeTimePipe, UtilsModule } from '@sinequa/components/utils';
import { IntlService, MessagePipe, IntlModule } from '@sinequa/core/intl';
import { LoginModule } from '@sinequa/core/login';
import { HttpService, START_CONFIG, SqHttpClient, PrincipalWebService, WebServicesModule } from '@sinequa/core/web-services';
import { Validators } from '@angular/forms';
import { ModalButton, ModalService } from '@sinequa/core/modal';
import { of } from 'rxjs';
import { pluck } from 'rxjs/operators';
import * as marked from 'marked';

class CommentsWebService extends HttpService {
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
CommentsWebService.ɵfac = function CommentsWebService_Factory(t) { return new (t || CommentsWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
CommentsWebService.ɵprov = ɵɵdefineInjectable({ token: CommentsWebService, factory: CommentsWebService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CommentsWebService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

class CreationDatePipe {
    constructor(intlService) {
        this.intlService = intlService;
    }
    transform(comment) {
        const creation = this.intlService.formatDate(comment.creation) + " " + this.intlService.formatTime(comment.creation);
        let msg = this.intlService.formatMessage("msg#comments.created", { date: creation });
        if (comment.modified !== comment.creation) {
            const modified = this.intlService.formatDate(comment.modified) + " " + this.intlService.formatTime(comment.modified);
            msg += " - " + this.intlService.formatMessage("msg#comments.modified", { date: modified });
        }
        return msg;
    }
}
CreationDatePipe.ɵfac = function CreationDatePipe_Factory(t) { return new (t || CreationDatePipe)(ɵɵdirectiveInject(IntlService)); };
CreationDatePipe.ɵpipe = ɵɵdefinePipe({ name: "sqCreationDate", type: CreationDatePipe, pure: true });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CreationDatePipe, [{
        type: Pipe,
        args: [{
                name: "sqCreationDate"
            }]
    }], function () { return [{ type: IntlService }]; }, null); })();

class MarkdownPipe {
    transform(value) {
        if (value && value.length > 0) {
            return marked(value);
        }
        return value;
    }
}
MarkdownPipe.ɵfac = function MarkdownPipe_Factory(t) { return new (t || MarkdownPipe)(); };
MarkdownPipe.ɵpipe = ɵɵdefinePipe({ name: "sqMarkdown", type: MarkdownPipe, pure: true });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MarkdownPipe, [{
        type: Pipe,
        args: [{
                name: "sqMarkdown"
            }]
    }], null, null); })();

function CommentsComponent_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function CommentsComponent_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#comments.noComment"), " ");
} }
const _c0 = function (a0) { return { $implicit: a0 }; };
function CommentsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3);
    ɵɵtemplate(1, CommentsComponent_div_0_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵɵtemplate(2, CommentsComponent_div_0_div_2_Template, 3, 3, "div", 5);
    ɵɵelementStart(3, "div");
    ɵɵelementStart(4, "button", 6);
    ɵɵlistener("click", function CommentsComponent_div_0_Template_button_click_4_listener() { ɵɵrestoreView(_r7); const ctx_r6 = ɵɵnextContext(); return ctx_r6.addComment(); });
    ɵɵelement(5, "i", 7);
    ɵɵtext(6);
    ɵɵpipe(7, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const _r2 = ɵɵreference(3);
    ɵɵproperty("ngClass", ctx_r0.theme);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", ɵɵpureFunction1(7, _c0, ctx_r0.comments));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.comments.length === 0);
    ɵɵadvance(4);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(7, 5, "msg#comments.write"), " ");
} }
function CommentsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "div", 9);
    ɵɵelementStart(2, "span", 10);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 1, "msg#preview.loading"));
} }
function CommentsComponent_ng_template_2_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 20);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(comment_r10.username);
} }
function CommentsComponent_ng_template_2_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 20);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#comments.deleted"));
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1, "*");
    ɵɵelementContainerEnd();
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 25);
    ɵɵpipe(1, "sqMarkdown");
} if (rf & 2) {
    const comment_r10 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("innerHTML", ɵɵpipeBind1(1, 1, comment_r10.message), ɵɵsanitizeHtml);
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 26);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#comments.deleted"));
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = ɵɵnextContext(3).$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1("\u00A0", comment_r10.likes, "");
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1("\u00A0", ɵɵpipeBind1(2, 1, "msg#comments.like"), "");
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r28 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 30);
    ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template_button_click_0_listener() { ɵɵrestoreView(_r28); const comment_r10 = ɵɵnextContext(3).$implicit; const ctx_r26 = ɵɵnextContext(2); return ctx_r26.editComment(comment_r10); });
    ɵɵelement(1, "i", 33);
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(3);
    ɵɵtextInterpolate1("\u00A0", ɵɵpipeBind1(4, 1, "msg#comments.edit"), "");
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 30);
    ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template_button_click_0_listener() { ɵɵrestoreView(_r31); const comment_r10 = ɵɵnextContext(3).$implicit; const ctx_r29 = ɵɵnextContext(2); return ctx_r29.deleteComment(comment_r10); });
    ɵɵelement(1, "i", 34);
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(3);
    ɵɵtextInterpolate1("\u00A0", ɵɵpipeBind1(4, 1, "msg#comments.delete"), "");
} }
const _c1 = function (a0, a1) { return { "btn-success": a0, "btn-outline-secondary": a1 }; };
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r35 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 27);
    ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_div_click_0_listener($event) { return $event.stopPropagation(); });
    ɵɵelementStart(1, "button", 28);
    ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_button_click_1_listener() { ɵɵrestoreView(_r35); const comment_r10 = ɵɵnextContext(2).$implicit; const ctx_r33 = ɵɵnextContext(2); return ctx_r33.likeComment(comment_r10); });
    ɵɵelement(2, "i", 29);
    ɵɵtemplate(3, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_3_Template, 2, 1, "span", 1);
    ɵɵtemplate(4, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_4_Template, 3, 3, "span", 1);
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 30);
    ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_button_click_5_listener() { ɵɵrestoreView(_r35); const comment_r10 = ɵɵnextContext(2).$implicit; const ctx_r36 = ɵɵnextContext(2); return ctx_r36.addComment(comment_r10); });
    ɵɵelement(6, "i", 31);
    ɵɵelementStart(7, "span");
    ɵɵtext(8);
    ɵɵpipe(9, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(10, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template, 5, 3, "button", 32);
    ɵɵtemplate(11, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template, 5, 3, "button", 32);
    ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = ɵɵnextContext(2).$implicit;
    const ctx_r19 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction2(8, _c1, comment_r10.likedByUser, !comment_r10.likedByUser));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", comment_r10.likes > 0);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", comment_r10.likes === 0);
    ɵɵadvance(4);
    ɵɵtextInterpolate1("\u00A0", ɵɵpipeBind1(9, 6, "msg#comments.reply"), "");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", (ctx_r19.user == null ? null : ctx_r19.user.userId) === comment_r10.userid || (ctx_r19.user == null ? null : ctx_r19.user.isAdministrator));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", (ctx_r19.user == null ? null : ctx_r19.user.userId) === comment_r10.userid || (ctx_r19.user == null ? null : ctx_r19.user.isAdministrator));
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_0_Template, 2, 3, "div", 21);
    ɵɵtemplate(1, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_1_Template, 3, 3, "div", 22);
    ɵɵelementStart(2, "div", 23);
    ɵɵtemplate(3, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template, 12, 11, "div", 24);
    ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = ɵɵnextContext().$implicit;
    ɵɵproperty("ngIf", !comment_r10.deleted);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", comment_r10.deleted);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !comment_r10.deleted);
} }
function CommentsComponent_ng_template_2_ng_container_0_div_14_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function CommentsComponent_ng_template_2_ng_container_0_div_14_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 35);
    ɵɵtemplate(1, CommentsComponent_ng_template_2_ng_container_0_div_14_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = ɵɵnextContext().$implicit;
    ɵɵnextContext(2);
    const _r2 = ɵɵreference(3);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, comment_r10.subcomments));
} }
const _c2 = function (a0) { return { "text-muted": a0 }; };
function CommentsComponent_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 12);
    ɵɵelementStart(2, "div", 13);
    ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_Template_div_click_2_listener() { const comment_r10 = ctx.$implicit; return comment_r10.$collapsed = !comment_r10.$collapsed; });
    ɵɵelement(3, "i", 14);
    ɵɵtemplate(4, CommentsComponent_ng_template_2_ng_container_0_span_4_Template, 2, 1, "span", 15);
    ɵɵtemplate(5, CommentsComponent_ng_template_2_ng_container_0_span_5_Template, 3, 3, "span", 15);
    ɵɵelementStart(6, "span", 16);
    ɵɵpipe(7, "sqCreationDate");
    ɵɵtext(8);
    ɵɵpipe(9, "sqRelativeTime");
    ɵɵtemplate(10, CommentsComponent_ng_template_2_ng_container_0_ng_container_10_Template, 2, 0, "ng-container", 1);
    ɵɵelementEnd();
    ɵɵelementStart(11, "sq-collapse-button", 17);
    ɵɵlistener("state", function CommentsComponent_ng_template_2_ng_container_0_Template_sq_collapse_button_state_11_listener($event) { const comment_r10 = ctx.$implicit; return comment_r10.$collapsed = $event; })("click", function CommentsComponent_ng_template_2_ng_container_0_Template_sq_collapse_button_click_11_listener($event) { return $event.stopPropagation(); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(12, "sq-collapse", 18);
    ɵɵtemplate(13, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_Template, 4, 3, "ng-template");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(14, CommentsComponent_ng_template_2_ng_container_0_div_14_Template, 2, 4, "div", 19);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const comment_r10 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(13, _c2, comment_r10.deleted));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !comment_r10.deleted);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", comment_r10.deleted);
    ɵɵadvance(1);
    ɵɵproperty("title", ɵɵpipeBind1(7, 9, comment_r10));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(9, 11, comment_r10.modified));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", comment_r10.modified !== comment_r10.creation);
    ɵɵadvance(1);
    ɵɵproperty("collapsed", comment_r10.$collapsed);
    ɵɵadvance(1);
    ɵɵproperty("collapsed", comment_r10.$collapsed);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !comment_r10.$collapsed && comment_r10.subcomments);
} }
function CommentsComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, CommentsComponent_ng_template_2_ng_container_0_Template, 15, 15, "ng-container", 11);
} if (rf & 2) {
    const comments_r8 = ctx.$implicit;
    ɵɵproperty("ngForOf", comments_r8);
} }
class CommentsComponent {
    constructor(commentsWebService, modalService, principalService) {
        this.commentsWebService = commentsWebService;
        this.modalService = modalService;
        this.principalService = principalService;
        this.theme = 'light';
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.docid && this.docid) {
            this.user = this.principalService.principal;
            this.commentsWebService.getComments(this.docid)
                .subscribe(comments => this.comments = comments);
        }
    }
    addComment(replyTo) {
        const model = {
            title: replyTo ? 'msg#comments.replyTo' : 'msg#comments.add',
            message: 'msg#comments.markdownNotice',
            buttons: [],
            output: '',
            validators: [Validators.required],
            rowCount: 5
        };
        this.modalService.prompt(model).then(result => {
            if (result === -1 /* OK */ && model.output.trim() !== "") {
                this.commentsWebService.createComment(this.docid, model.output, replyTo === null || replyTo === void 0 ? void 0 : replyTo.commentid).subscribe(comment => {
                    if (replyTo) {
                        if (!replyTo.subcomments) {
                            replyTo.subcomments = [];
                        }
                        replyTo.subcomments.push(comment);
                    }
                    else {
                        this.comments.push(comment);
                    }
                });
            }
        });
    }
    likeComment(comment) {
        this.commentsWebService.likeComment(comment.docid, comment.commentid)
            .subscribe(res => {
            comment.likes = res.likes;
            comment.likedByUser = res.likedByUser;
        });
    }
    editComment(comment) {
        const model = {
            title: 'msg#comments.editComment',
            message: 'msg#comments.markdownNotice',
            buttons: [],
            output: comment.message,
            validators: [Validators.required],
            rowCount: 5
        };
        this.modalService.prompt(model).then(result => {
            if (result === -1 /* OK */ && model.output.trim() !== "") {
                this.commentsWebService.updateComment(comment.docid, comment.commentid, model.output)
                    .subscribe(res => {
                    comment.message = res.message;
                    comment.modified = res.modified;
                    comment.likes = res.likes;
                    comment.likedByUser = res.likedByUser;
                });
            }
        });
    }
    deleteComment(comment) {
        var _a;
        // If the comment has subcomments, only mark it as deleted
        const markAsDeleted = !!((_a = comment.subcomments) === null || _a === void 0 ? void 0 : _a.length);
        this.modalService.confirm({
            message: "msg#comments.deleteNotice",
            confirmType: 2 /* Warning */,
            buttons: [
                new ModalButton({
                    result: -3 /* Yes */,
                    primary: true
                }),
                new ModalButton({
                    result: -2 /* Cancel */
                })
            ]
        }).then(res => {
            if (res === -3 /* Yes */) {
                this.commentsWebService.deleteComment(comment.docid, comment.commentid, markAsDeleted)
                    .subscribe(res => {
                    if (markAsDeleted) {
                        let c = comment;
                        c.deleted = true;
                        delete c.message;
                        delete c.userid;
                        delete c.username;
                        delete c.likes;
                        delete c.likedByUser;
                    }
                    else {
                        this.remove(this.comments, comment);
                    }
                });
            }
        });
    }
    remove(comments, comment) {
        for (let i = 0; i < comments.length; i++) {
            if (comments[i] === comment) {
                comments.splice(i, 1);
                return true;
            }
            const subcomments = comments[i].subcomments;
            if (subcomments) {
                if (this.remove(subcomments, comment)) {
                    return true;
                }
            }
        }
        return false;
    }
}
CommentsComponent.ɵfac = function CommentsComponent_Factory(t) { return new (t || CommentsComponent)(ɵɵdirectiveInject(CommentsWebService), ɵɵdirectiveInject(ModalService), ɵɵdirectiveInject(PrincipalWebService)); };
CommentsComponent.ɵcmp = ɵɵdefineComponent({ type: CommentsComponent, selectors: [["sq-comments"]], inputs: { docid: "docid", theme: "theme" }, features: [ɵɵNgOnChangesFeature], decls: 4, vars: 2, consts: [["class", "comments", 3, "ngClass", 4, "ngIf"], [4, "ngIf"], ["commentsTpl", ""], [1, "comments", 3, "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "font-italic text-center my-4", 4, "ngIf"], [1, "btn", "btn-primary", "d-block", "mx-auto", "mt-3", 3, "click"], [1, "fas", "fa-comment"], [1, "font-italic", "text-center", "my-4"], ["role", "status", 1, "spinner-grow", "d-block", "mx-auto", "mt-4"], [1, "sr-only"], [4, "ngFor", "ngForOf"], [1, "message", "pl-2", "py-1", "pr-2"], [1, "mt-2", "d-flex", 3, "ngClass", "click"], [1, "fas", "fa-user-circle", "mr-1"], ["class", "text-truncate small font-weight-bold mr-2", 4, "ngIf"], [1, "small", "text-muted", "ml-auto", 3, "title"], [1, "ml-1", "small", 3, "collapsed", "state", "click"], [3, "collapsed"], ["class", "subcomments ml-2", 4, "ngIf"], [1, "text-truncate", "small", "font-weight-bold", "mr-2"], ["class", "message-body", 3, "innerHTML", 4, "ngIf"], ["class", "text-muted", 4, "ngIf"], [1, "d-flex", "justify-content-end"], ["class", "btn-group", "role", "group", 3, "click", 4, "ngIf"], [1, "message-body", 3, "innerHTML"], [1, "text-muted"], ["role", "group", 1, "btn-group", 3, "click"], [1, "btn", "btn-sm", 3, "ngClass", "click"], [1, "fas", "fa-thumbs-up"], [1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-reply"], ["class", "btn btn-sm btn-outline-secondary", 3, "click", 4, "ngIf"], [1, "fas", "fa-edit"], [1, "fas", "fa-trash-alt"], [1, "subcomments", "ml-2"]], template: function CommentsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, CommentsComponent_div_0_Template, 8, 9, "div", 0);
        ɵɵtemplate(1, CommentsComponent_div_1_Template, 5, 3, "div", 1);
        ɵɵtemplate(2, CommentsComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.comments);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.comments);
    } }, directives: [NgIf, NgClass, NgTemplateOutlet, NgForOf, CollapseButton, Collapse], pipes: [MessagePipe, CreationDatePipe, RelativeTimePipe, MarkdownPipe], styles: [".subcomments[_ngcontent-%COMP%]{border-left:2px solid #d3d3d3}.btn-sm[_ngcontent-%COMP%]{font-size:.8rem;line-height:1.1}.message[_ngcontent-%COMP%]:hover{background:rgba(0,0,0,.05)}.message[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%] >   :last-child{margin-bottom:.25rem}.message[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%]     img{border-radius:8px;max-width:100%;padding:5px}.comments.dark[_ngcontent-%COMP%]   .btn-outline-secondary[_ngcontent-%COMP%]:not(:hover){border-color:#aab2b9;color:#aab2b9}.comments.dark[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]:hover{background:hsla(0,0%,100%,.1)}sq-collapse-button[_ngcontent-%COMP%]{cursor:pointer}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CommentsComponent, [{
        type: Component,
        args: [{
                selector: 'sq-comments',
                templateUrl: './comments.component.html',
                styleUrls: ['./comments.component.scss']
            }]
    }], function () { return [{ type: CommentsWebService }, { type: ModalService }, { type: PrincipalWebService }]; }, { docid: [{
            type: Input
        }], theme: [{
            type: Input
        }] }); })();

class CommentsModule {
}
CommentsModule.ɵmod = ɵɵdefineNgModule({ type: CommentsModule });
CommentsModule.ɵinj = ɵɵdefineInjector({ factory: function CommentsModule_Factory(t) { return new (t || CommentsModule)(); }, imports: [[
            CommonModule,
            WebServicesModule,
            IntlModule,
            LoginModule,
            UtilsModule,
            CollapseModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CommentsModule, { declarations: [CommentsComponent,
        CreationDatePipe,
        MarkdownPipe], imports: [CommonModule,
        WebServicesModule,
        IntlModule,
        LoginModule,
        UtilsModule,
        CollapseModule], exports: [CommentsComponent,
        MarkdownPipe] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(CommentsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WebServicesModule,
                    IntlModule,
                    LoginModule,
                    UtilsModule,
                    CollapseModule
                ],
                declarations: [
                    CommentsComponent,
                    CreationDatePipe,
                    MarkdownPipe
                ],
                exports: [
                    CommentsComponent,
                    MarkdownPipe
                ],
            }]
    }], null, null); })();

var en = {
    "comments": {
        "created": "Created on {date}",
        "modified": "Modified on {date}",
        "replyTo": "Reply to comment",
        "add": "Add a comment",
        "write": "Write a comment",
        "like": "Like",
        "reply": "Reply",
        "edit": "Edit",
        "delete": "Delete",
        "editComment": "Edit your comment",
        "markdownNotice": "(Markdown syntax supported)",
        "noComment": "No comment yet",
        "deleteNotice": "Are you sure you want to delete this comment? (replies will remain visible)",
        "deleted": "[deleted]"
    }
};

var fr = {
    "comments": {
        "created": "Créé le {date}",
        "modified": "Modifié le {date}",
        "replyTo": "Répondre à un commentaire",
        "add": "Ajouter un commentaire",
        "write": "Écrire un commentaire",
        "like": "Aimer",
        "reply": "Répondre",
        "edit": "Éditer",
        "delete": "Supprimer",
        "editComment": "Éditer votre commentaire",
        "markdownNotice": "(Syntaxe Markdown supportée)",
        "noComment": "Pas encore de commentaire",
        "deleteNotice": "Êtes-vous certain de vouloir supprimer ce commentaire? (les réponses resteront visibles)",
        "deleted": "[supprimé]"
    }
};

var de = {
    "comments": {
        "created": "Erstellt am {date}",
        "modified": "Geändert am {date}",
        "replyTo": "Auf einen Kommentar antworten",
        "add": "Einen Kommentar hinzufügen",
        "write": "Schreibe einen Kommentar",
        "like": "Mögen",
        "reply": "Antworten",
        "edit": "Bearbeiten",
        "delete": "Löschen",
        "editComment": "Bearbeiten Sie Ihren Kommentar",
        "markdownNotice": "(Markdown-Syntax unterstützt)",
        "noComment": "Noch kein Kommentar",
        "deleteNotice": "Möchten Sie diesen Kommentar wirklich löschen? (Antworten bleiben sichtbar)",
        "deleted": "[gelöscht]"
    }
};

/**
 * Generated bundle index. Do not edit.
 */

export { CommentsComponent, CommentsModule, CommentsWebService, CreationDatePipe, MarkdownPipe, de as deComments, en as enComments, fr as frComments };
//# sourceMappingURL=sinequa-components-comments.js.map
