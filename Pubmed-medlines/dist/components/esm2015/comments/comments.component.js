import { Component, Input } from "@angular/core";
import { Validators } from "@angular/forms";
import { ModalButton } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
import * as i1 from "./comments.web.service";
import * as i2 from "@sinequa/core/modal";
import * as i3 from "@sinequa/core/web-services";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/components/collapse";
import * as i6 from "@sinequa/core/intl";
import * as i7 from "./creation-date.pipe";
import * as i8 from "@sinequa/components/utils";
import * as i9 from "./markdown.pipe";
function CommentsComponent_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function CommentsComponent_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#comments.noComment"), " ");
} }
const _c0 = function (a0) { return { $implicit: a0 }; };
function CommentsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, CommentsComponent_div_0_ng_container_1_Template, 1, 0, "ng-container", 4);
    i0.ɵɵtemplate(2, CommentsComponent_div_0_div_2_Template, 3, 3, "div", 5);
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵelementStart(4, "button", 6);
    i0.ɵɵlistener("click", function CommentsComponent_div_0_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.addComment(); });
    i0.ɵɵelement(5, "i", 7);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    const _r2 = i0.ɵɵreference(3);
    i0.ɵɵproperty("ngClass", ctx_r0.theme);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(7, _c0, ctx_r0.comments));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.comments.length === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 5, "msg#comments.write"), " ");
} }
function CommentsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "span", 10);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#preview.loading"));
} }
function CommentsComponent_ng_template_2_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(comment_r10.username);
} }
function CommentsComponent_ng_template_2_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#comments.deleted"));
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementContainerEnd();
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 25);
    i0.ɵɵpipe(1, "sqMarkdown");
} if (rf & 2) {
    const comment_r10 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, comment_r10.message), i0.ɵɵsanitizeHtml);
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#comments.deleted"));
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("\u00A0", comment_r10.likes, "");
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(2, 1, "msg#comments.like"), "");
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28); const comment_r10 = i0.ɵɵnextContext(3).$implicit; const ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.editComment(comment_r10); });
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(4, 1, "msg#comments.edit"), "");
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r31); const comment_r10 = i0.ɵɵnextContext(3).$implicit; const ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.deleteComment(comment_r10); });
    i0.ɵɵelement(1, "i", 34);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(4, 1, "msg#comments.delete"), "");
} }
const _c1 = function (a0, a1) { return { "btn-success": a0, "btn-outline-secondary": a1 }; };
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_div_click_0_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(1, "button", 28);
    i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r35); const comment_r10 = i0.ɵɵnextContext(2).$implicit; const ctx_r33 = i0.ɵɵnextContext(2); return ctx_r33.likeComment(comment_r10); });
    i0.ɵɵelement(2, "i", 29);
    i0.ɵɵtemplate(3, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_3_Template, 2, 1, "span", 1);
    i0.ɵɵtemplate(4, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_4_Template, 3, 3, "span", 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 30);
    i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r35); const comment_r10 = i0.ɵɵnextContext(2).$implicit; const ctx_r36 = i0.ɵɵnextContext(2); return ctx_r36.addComment(comment_r10); });
    i0.ɵɵelement(6, "i", 31);
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template, 5, 3, "button", 32);
    i0.ɵɵtemplate(11, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template, 5, 3, "button", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c1, comment_r10.likedByUser, !comment_r10.likedByUser));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", comment_r10.likes > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", comment_r10.likes === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(9, 6, "msg#comments.reply"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (ctx_r19.user == null ? null : ctx_r19.user.userId) === comment_r10.userid || (ctx_r19.user == null ? null : ctx_r19.user.isAdministrator));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r19.user == null ? null : ctx_r19.user.userId) === comment_r10.userid || (ctx_r19.user == null ? null : ctx_r19.user.isAdministrator));
} }
function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_0_Template, 2, 3, "div", 21);
    i0.ɵɵtemplate(1, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_1_Template, 3, 3, "div", 22);
    i0.ɵɵelementStart(2, "div", 23);
    i0.ɵɵtemplate(3, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template, 12, 11, "div", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngIf", !comment_r10.deleted);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", comment_r10.deleted);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !comment_r10.deleted);
} }
function CommentsComponent_ng_template_2_ng_container_0_div_14_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function CommentsComponent_ng_template_2_ng_container_0_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtemplate(1, CommentsComponent_ng_template_2_ng_container_0_div_14_ng_container_1_Template, 1, 0, "ng-container", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵnextContext(2);
    const _r2 = i0.ɵɵreference(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, comment_r10.subcomments));
} }
const _c2 = function (a0) { return { "text-muted": a0 }; };
function CommentsComponent_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 12);
    i0.ɵɵelementStart(2, "div", 13);
    i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_Template_div_click_2_listener() { const comment_r10 = ctx.$implicit; return comment_r10.$collapsed = !comment_r10.$collapsed; });
    i0.ɵɵelement(3, "i", 14);
    i0.ɵɵtemplate(4, CommentsComponent_ng_template_2_ng_container_0_span_4_Template, 2, 1, "span", 15);
    i0.ɵɵtemplate(5, CommentsComponent_ng_template_2_ng_container_0_span_5_Template, 3, 3, "span", 15);
    i0.ɵɵelementStart(6, "span", 16);
    i0.ɵɵpipe(7, "sqCreationDate");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "sqRelativeTime");
    i0.ɵɵtemplate(10, CommentsComponent_ng_template_2_ng_container_0_ng_container_10_Template, 2, 0, "ng-container", 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "sq-collapse-button", 17);
    i0.ɵɵlistener("state", function CommentsComponent_ng_template_2_ng_container_0_Template_sq_collapse_button_state_11_listener($event) { const comment_r10 = ctx.$implicit; return comment_r10.$collapsed = $event; })("click", function CommentsComponent_ng_template_2_ng_container_0_Template_sq_collapse_button_click_11_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "sq-collapse", 18);
    i0.ɵɵtemplate(13, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_Template, 4, 3, "ng-template");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, CommentsComponent_ng_template_2_ng_container_0_div_14_Template, 2, 4, "div", 19);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const comment_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(13, _c2, comment_r10.deleted));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !comment_r10.deleted);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", comment_r10.deleted);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(7, 9, comment_r10));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 11, comment_r10.modified));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", comment_r10.modified !== comment_r10.creation);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("collapsed", comment_r10.$collapsed);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("collapsed", comment_r10.$collapsed);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !comment_r10.$collapsed && comment_r10.subcomments);
} }
function CommentsComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CommentsComponent_ng_template_2_ng_container_0_Template, 15, 15, "ng-container", 11);
} if (rf & 2) {
    const comments_r8 = ctx.$implicit;
    i0.ɵɵproperty("ngForOf", comments_r8);
} }
export class CommentsComponent {
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
CommentsComponent.ɵfac = function CommentsComponent_Factory(t) { return new (t || CommentsComponent)(i0.ɵɵdirectiveInject(i1.CommentsWebService), i0.ɵɵdirectiveInject(i2.ModalService), i0.ɵɵdirectiveInject(i3.PrincipalWebService)); };
CommentsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CommentsComponent, selectors: [["sq-comments"]], inputs: { docid: "docid", theme: "theme" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 2, consts: [["class", "comments", 3, "ngClass", 4, "ngIf"], [4, "ngIf"], ["commentsTpl", ""], [1, "comments", 3, "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "font-italic text-center my-4", 4, "ngIf"], [1, "btn", "btn-primary", "d-block", "mx-auto", "mt-3", 3, "click"], [1, "fas", "fa-comment"], [1, "font-italic", "text-center", "my-4"], ["role", "status", 1, "spinner-grow", "d-block", "mx-auto", "mt-4"], [1, "sr-only"], [4, "ngFor", "ngForOf"], [1, "message", "pl-2", "py-1", "pr-2"], [1, "mt-2", "d-flex", 3, "ngClass", "click"], [1, "fas", "fa-user-circle", "mr-1"], ["class", "text-truncate small font-weight-bold mr-2", 4, "ngIf"], [1, "small", "text-muted", "ml-auto", 3, "title"], [1, "ml-1", "small", 3, "collapsed", "state", "click"], [3, "collapsed"], ["class", "subcomments ml-2", 4, "ngIf"], [1, "text-truncate", "small", "font-weight-bold", "mr-2"], ["class", "message-body", 3, "innerHTML", 4, "ngIf"], ["class", "text-muted", 4, "ngIf"], [1, "d-flex", "justify-content-end"], ["class", "btn-group", "role", "group", 3, "click", 4, "ngIf"], [1, "message-body", 3, "innerHTML"], [1, "text-muted"], ["role", "group", 1, "btn-group", 3, "click"], [1, "btn", "btn-sm", 3, "ngClass", "click"], [1, "fas", "fa-thumbs-up"], [1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-reply"], ["class", "btn btn-sm btn-outline-secondary", 3, "click", 4, "ngIf"], [1, "fas", "fa-edit"], [1, "fas", "fa-trash-alt"], [1, "subcomments", "ml-2"]], template: function CommentsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CommentsComponent_div_0_Template, 8, 9, "div", 0);
        i0.ɵɵtemplate(1, CommentsComponent_div_1_Template, 5, 3, "div", 1);
        i0.ɵɵtemplate(2, CommentsComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.comments);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.comments);
    } }, directives: [i4.NgIf, i4.NgClass, i4.NgTemplateOutlet, i4.NgForOf, i5.CollapseButton, i5.Collapse], pipes: [i6.MessagePipe, i7.CreationDatePipe, i8.RelativeTimePipe, i9.MarkdownPipe], styles: [".subcomments[_ngcontent-%COMP%]{border-left:2px solid #d3d3d3}.btn-sm[_ngcontent-%COMP%]{font-size:.8rem;line-height:1.1}.message[_ngcontent-%COMP%]:hover{background:rgba(0,0,0,.05)}.message[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%] >   :last-child{margin-bottom:.25rem}.message[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%]     img{border-radius:8px;max-width:100%;padding:5px}.comments.dark[_ngcontent-%COMP%]   .btn-outline-secondary[_ngcontent-%COMP%]:not(:hover){border-color:#aab2b9;color:#aab2b9}.comments.dark[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]:hover{background:hsla(0,0%,100%,.1)}sq-collapse-button[_ngcontent-%COMP%]{cursor:pointer}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CommentsComponent, [{
        type: Component,
        args: [{
                selector: 'sq-comments',
                templateUrl: './comments.component.html',
                styleUrls: ['./comments.component.scss']
            }]
    }], function () { return [{ type: i1.CommentsWebService }, { type: i2.ModalService }, { type: i3.PrincipalWebService }]; }, { docid: [{
            type: Input
        }], theme: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvY29tbWVudHMvIiwic291cmNlcyI6WyJjb21tZW50cy5jb21wb25lbnQudHMiLCJjb21tZW50cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBZSxXQUFXLEVBQTZCLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7OztJQ0R0Rix3QkFBNEY7OztJQUU1Riw4QkFDSTtJQUFBLFlBQ0o7O0lBQUEsaUJBQU07O0lBREYsZUFDSjtJQURJLCtFQUNKOzs7OztJQUxKLDhCQUNJO0lBQUEsMEZBQTRGO0lBRTVGLHdFQUVNO0lBRU4sMkJBQ0k7SUFBQSxpQ0FDSTtJQURpRCxxTEFBc0I7SUFDdkUsdUJBQThCO0lBQzlCLFlBQ0o7O0lBQUEsaUJBQVM7SUFDYixpQkFBTTtJQUNWLGlCQUFNOzs7O0lBYmlDLHNDQUFpQjtJQUNyQyxlQUErQjtJQUEvQixzQ0FBK0Isd0VBQUE7SUFFeEMsZUFBMkI7SUFBM0IsbURBQTJCO0lBT3pCLGVBQ0o7SUFESSwyRUFDSjs7O0lBSVIsMkJBQ0k7SUFBQSw4QkFDSTtJQUFBLGdDQUFzQjtJQUFBLFlBQXVDOztJQUFBLGlCQUFPO0lBQ3hFLGlCQUFNO0lBQ1YsaUJBQU07O0lBRndCLGVBQXVDO0lBQXZDLGlFQUF1Qzs7O0lBWXJELGdDQUFpRjtJQUFBLFlBQW9CO0lBQUEsaUJBQU87OztJQUEzQixlQUFvQjtJQUFwQiwwQ0FBb0I7OztJQUNyRyxnQ0FBZ0Y7SUFBQSxZQUF3Qzs7SUFBQSxpQkFBTzs7SUFBL0MsZUFBd0M7SUFBeEMsa0VBQXdDOzs7SUFDVCw2QkFBNEQ7SUFBQSxpQkFBQztJQUFBLDBC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QkFBMkIsQ0FBQzthQUMzQztrSUFFWSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IENvbmZpcm1UeXBlLCBNb2RhbEJ1dHRvbiwgTW9kYWxSZXN1bHQsIE1vZGFsU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XHJcbmltcG9ydCB7IFByaW5jaXBhbCwgUHJpbmNpcGFsV2ViU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBDb21tZW50c1dlYlNlcnZpY2UsIENvbW1lbnQsIE5vcm1hbENvbW1lbnQgfSBmcm9tIFwiLi9jb21tZW50cy53ZWIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3NxLWNvbW1lbnRzJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb21tZW50cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9jb21tZW50cy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21tZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgICBASW5wdXQoKSBkb2NpZDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdGhlbWU6ICdsaWdodCcgfCAnZGFyaycgPSAnbGlnaHQnO1xyXG5cclxuICAgIGNvbW1lbnRzOiBDb21tZW50W107XHJcbiAgICB1c2VyPzogUHJpbmNpcGFsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBjb21tZW50c1dlYlNlcnZpY2U6IENvbW1lbnRzV2ViU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHByaW5jaXBhbFNlcnZpY2U6IFByaW5jaXBhbFdlYlNlcnZpY2VcclxuICAgICl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZihzaW1wbGVDaGFuZ2VzLmRvY2lkICYmIHRoaXMuZG9jaWQpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdGhpcy5wcmluY2lwYWxTZXJ2aWNlLnByaW5jaXBhbDtcclxuICAgICAgICAgICAgdGhpcy5jb21tZW50c1dlYlNlcnZpY2UuZ2V0Q29tbWVudHModGhpcy5kb2NpZClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoY29tbWVudHMgPT4gdGhpcy5jb21tZW50cyA9IGNvbW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ29tbWVudChyZXBseVRvPzogQ29tbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG1vZGVsID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogcmVwbHlUbz8gJ21zZyNjb21tZW50cy5yZXBseVRvJyA6ICdtc2cjY29tbWVudHMuYWRkJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ21zZyNjb21tZW50cy5tYXJrZG93bk5vdGljZScsXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtdLFxyXG4gICAgICAgICAgICBvdXRwdXQ6ICcnLFxyXG4gICAgICAgICAgICB2YWxpZGF0b3JzOiBbVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHJvd0NvdW50OiA1XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLnByb21wdChtb2RlbCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQgPT09IE1vZGFsUmVzdWx0Lk9LICYmIG1vZGVsLm91dHB1dC50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudHNXZWJTZXJ2aWNlLmNyZWF0ZUNvbW1lbnQodGhpcy5kb2NpZCwgbW9kZWwub3V0cHV0LCByZXBseVRvPy5jb21tZW50aWQpLnN1YnNjcmliZShjb21tZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXBseVRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyZXBseVRvLnN1YmNvbW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBseVRvLnN1YmNvbW1lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlUby5zdWJjb21tZW50cy5wdXNoKGNvbW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tZW50cy5wdXNoKGNvbW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGlrZUNvbW1lbnQoY29tbWVudDogTm9ybWFsQ29tbWVudCkge1xyXG4gICAgICAgIHRoaXMuY29tbWVudHNXZWJTZXJ2aWNlLmxpa2VDb21tZW50KGNvbW1lbnQuZG9jaWQsIGNvbW1lbnQuY29tbWVudGlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50Lmxpa2VzID0gcmVzLmxpa2VzO1xyXG4gICAgICAgICAgICAgICAgY29tbWVudC5saWtlZEJ5VXNlciA9IHJlcy5saWtlZEJ5VXNlcjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdENvbW1lbnQoY29tbWVudDogTm9ybWFsQ29tbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG1vZGVsID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ21zZyNjb21tZW50cy5lZGl0Q29tbWVudCcsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdtc2cjY29tbWVudHMubWFya2Rvd25Ob3RpY2UnLFxyXG4gICAgICAgICAgICBidXR0b25zOiBbXSxcclxuICAgICAgICAgICAgb3V0cHV0OiBjb21tZW50Lm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgcm93Q291bnQ6IDVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2UucHJvbXB0KG1vZGVsKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuT0sgJiYgbW9kZWwub3V0cHV0LnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50c1dlYlNlcnZpY2UudXBkYXRlQ29tbWVudChjb21tZW50LmRvY2lkLCBjb21tZW50LmNvbW1lbnRpZCwgbW9kZWwub3V0cHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudC5tZXNzYWdlID0gcmVzLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQubW9kaWZpZWQgPSByZXMubW9kaWZpZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQubGlrZXMgPSByZXMubGlrZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQubGlrZWRCeVVzZXIgPSByZXMubGlrZWRCeVVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDb21tZW50KGNvbW1lbnQ6IE5vcm1hbENvbW1lbnQpIHtcclxuICAgICAgICAvLyBJZiB0aGUgY29tbWVudCBoYXMgc3ViY29tbWVudHMsIG9ubHkgbWFyayBpdCBhcyBkZWxldGVkXHJcbiAgICAgICAgY29uc3QgbWFya0FzRGVsZXRlZCA9ICEhY29tbWVudC5zdWJjb21tZW50cz8ubGVuZ3RoO1xyXG5cclxuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5jb25maXJtKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJtc2cjY29tbWVudHMuZGVsZXRlTm90aWNlXCIsXHJcbiAgICAgICAgICAgIGNvbmZpcm1UeXBlOiBDb25maXJtVHlwZS5XYXJuaW5nLFxyXG4gICAgICAgICAgICBidXR0b25zOiBbXHJcbiAgICAgICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuWWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IE1vZGFsQnV0dG9uKHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IE1vZGFsUmVzdWx0LkNhbmNlbFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgaWYocmVzID09PSBNb2RhbFJlc3VsdC5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudHNXZWJTZXJ2aWNlLmRlbGV0ZUNvbW1lbnQoY29tbWVudC5kb2NpZCwgY29tbWVudC5jb21tZW50aWQsIG1hcmtBc0RlbGV0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtYXJrQXNEZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGNvbW1lbnQgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5kZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYy51c2VyaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYy51c2VybmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjLmxpa2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGMubGlrZWRCeVVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLmNvbW1lbnRzLCBjb21tZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZW1vdmUoY29tbWVudHM6IENvbW1lbnRbXSwgY29tbWVudDogQ29tbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGNvbW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGNvbW1lbnRzW2ldID09PSBjb21tZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YmNvbW1lbnRzID0gY29tbWVudHNbaV0uc3ViY29tbWVudHM7XHJcbiAgICAgICAgICAgIGlmKHN1YmNvbW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlbW92ZShzdWJjb21tZW50cywgY29tbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCI8ZGl2ICpuZ0lmPVwiY29tbWVudHNcIiBjbGFzcz1cImNvbW1lbnRzXCIgW25nQ2xhc3NdPVwidGhlbWVcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb21tZW50c1RwbDsgY29udGV4dDp7JGltcGxpY2l0OiBjb21tZW50c31cIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICA8ZGl2ICpuZ0lmPVwiY29tbWVudHMubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJmb250LWl0YWxpYyB0ZXh0LWNlbnRlciBteS00XCI+XHJcbiAgICAgICAge3sgJ21zZyNjb21tZW50cy5ub0NvbW1lbnQnIHwgc3FNZXNzYWdlIH19XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgZC1ibG9jayBteC1hdXRvIG10LTNcIiAoY2xpY2spPVwiYWRkQ29tbWVudCgpXCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNvbW1lbnRcIj48L2k+XHJcbiAgICAgICAgICAgIHt7ICdtc2cjY29tbWVudHMud3JpdGUnIHwgc3FNZXNzYWdlIH19XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48ZGl2ICpuZ0lmPVwiIWNvbW1lbnRzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ncm93IGQtYmxvY2sgbXgtYXV0byBtdC00XCIgcm9sZT1cInN0YXR1c1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPnt7ICdtc2cjcHJldmlldy5sb2FkaW5nJyB8IHNxTWVzc2FnZSB9fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcblxyXG48bmctdGVtcGxhdGUgI2NvbW1lbnRzVHBsIGxldC1jb21tZW50cz5cclxuXHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb21tZW50IG9mIGNvbW1lbnRzXCI+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlIHBsLTIgcHktMSBwci0yXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdC0yIGQtZmxleFwiIFtuZ0NsYXNzXT1cInsndGV4dC1tdXRlZCc6Y29tbWVudC5kZWxldGVkfVwiIChjbGljayk9XCJjb21tZW50LiRjb2xsYXBzZWQgPSAhY29tbWVudC4kY29sbGFwc2VkXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZSBtci0xXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXRydW5jYXRlIHNtYWxsIGZvbnQtd2VpZ2h0LWJvbGQgbXItMlwiICpuZ0lmPVwiIWNvbW1lbnQuZGVsZXRlZFwiPnt7Y29tbWVudC51c2VybmFtZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXRydW5jYXRlIHNtYWxsIGZvbnQtd2VpZ2h0LWJvbGQgbXItMlwiICpuZ0lmPVwiY29tbWVudC5kZWxldGVkXCI+e3sgJ21zZyNjb21tZW50cy5kZWxldGVkJyB8IHNxTWVzc2FnZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic21hbGwgdGV4dC1tdXRlZCBtbC1hdXRvXCIgW3RpdGxlXT1cImNvbW1lbnQgfCBzcUNyZWF0aW9uRGF0ZVwiPnt7Y29tbWVudC5tb2RpZmllZCB8IHNxUmVsYXRpdmVUaW1lfX08bmctY29udGFpbmVyICpuZ0lmPVwiY29tbWVudC5tb2RpZmllZCAhPT0gY29tbWVudC5jcmVhdGlvblwiPio8L25nLWNvbnRhaW5lcj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3EtY29sbGFwc2UtYnV0dG9uIFtjb2xsYXBzZWRdPVwiY29tbWVudC4kY29sbGFwc2VkXCIgKHN0YXRlKT1cImNvbW1lbnQuJGNvbGxhcHNlZCA9ICRldmVudFwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBjbGFzcz1cIm1sLTEgc21hbGxcIj48L3NxLWNvbGxhcHNlLWJ1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8c3EtY29sbGFwc2UgW2NvbGxhcHNlZF09XCJjb21tZW50LiRjb2xsYXBzZWRcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWJvZHlcIiAqbmdJZj1cIiFjb21tZW50LmRlbGV0ZWRcIiBbaW5uZXJIVE1MXT1cImNvbW1lbnQubWVzc2FnZSB8IHNxTWFya2Rvd25cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1tdXRlZFwiICpuZ0lmPVwiY29tbWVudC5kZWxldGVkXCI+e3sgJ21zZyNjb21tZW50cy5kZWxldGVkJyB8IHNxTWVzc2FnZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiICpuZ0lmPVwiIWNvbW1lbnQuZGVsZXRlZFwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtXCIgKGNsaWNrKT1cImxpa2VDb21tZW50KGNvbW1lbnQpXCIgW25nQ2xhc3NdPVwieydidG4tc3VjY2Vzcyc6IGNvbW1lbnQubGlrZWRCeVVzZXIsICdidG4tb3V0bGluZS1zZWNvbmRhcnknOiAhY29tbWVudC5saWtlZEJ5VXNlcn1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aHVtYnMtdXBcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjb21tZW50Lmxpa2VzID4gMFwiPiZuYnNwO3t7Y29tbWVudC5saWtlc319PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY29tbWVudC5saWtlcyA9PT0gMFwiPiZuYnNwO3t7ICdtc2cjY29tbWVudHMubGlrZScgfCBzcU1lc3NhZ2UgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeVwiIChjbGljayk9XCJhZGRDb21tZW50KGNvbW1lbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcmVwbHlcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Jm5ic3A7e3sgJ21zZyNjb21tZW50cy5yZXBseScgfCBzcU1lc3NhZ2UgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeVwiIChjbGljayk9XCJlZGl0Q29tbWVudChjb21tZW50KVwiICpuZ0lmPVwidXNlcj8udXNlcklkID09PSBjb21tZW50LnVzZXJpZCB8fCB1c2VyPy5pc0FkbWluaXN0cmF0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiZuYnNwO3t7ICdtc2cjY29tbWVudHMuZWRpdCcgfCBzcU1lc3NhZ2UgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeVwiIChjbGljayk9XCJkZWxldGVDb21tZW50KGNvbW1lbnQpXCIgKm5nSWY9XCJ1c2VyPy51c2VySWQgPT09IGNvbW1lbnQudXNlcmlkIHx8IHVzZXI/LmlzQWRtaW5pc3RyYXRvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoLWFsdFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4mbmJzcDt7eyAnbXNnI2NvbW1lbnRzLmRlbGV0ZScgfCBzcU1lc3NhZ2UgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICAgICAgPC9zcS1jb2xsYXBzZT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiAqbmdJZj1cIiFjb21tZW50LiRjb2xsYXBzZWQgJiYgY29tbWVudC5zdWJjb21tZW50c1wiIGNsYXNzPVwic3ViY29tbWVudHMgbWwtMlwiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29tbWVudHNUcGw7IGNvbnRleHQ6eyRpbXBsaWNpdDogY29tbWVudC5zdWJjb21tZW50c31cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbjwvbmctdGVtcGxhdGU+Il19