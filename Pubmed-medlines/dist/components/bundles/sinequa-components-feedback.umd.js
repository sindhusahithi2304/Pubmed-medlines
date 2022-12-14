(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/base'), require('@sinequa/components/action'), require('@sinequa/core/web-services'), require('@sinequa/core/modal'), require('@sinequa/core/app-utils'), require('@sinequa/core/notification'), require('@angular/common'), require('@sinequa/core/intl'), require('@sinequa/core/validation'), require('@sinequa/components/modal')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/feedback', ['exports', '@angular/core', '@sinequa/core/base', '@sinequa/components/action', '@sinequa/core/web-services', '@sinequa/core/modal', '@sinequa/core/app-utils', '@sinequa/core/notification', '@angular/common', '@sinequa/core/intl', '@sinequa/core/validation', '@sinequa/components/modal'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.feedback = {}), global.ng.core, global.sinequa.core.base, global.sinequa.components.action, global.sinequa.core['web-services'], global.sinequa.core.modal, global.sinequa.core['app-utils'], global.sinequa.core.notification, global.ng.common, global.sinequa.core.intl, global.sinequa.core.validation, global.sinequa.components.modal));
}(this, (function (exports, i0, base, i2, i1, i2$1, i3, i4, common, intl, validation, modal) { 'use strict';

    var AuditFeedbackType = "UserFeedback";
    var FeedbackService = /** @class */ (function () {
        function FeedbackService(auditService, modalService, appService, notificationsService) {
            this.auditService = auditService;
            this.modalService = modalService;
            this.appService = appService;
            this.notificationsService = notificationsService;
        }
        FeedbackService.prototype.sendUserFeedback = function (type, message, thankUser) {
            var _this = this;
            var event = {
                type: AuditFeedbackType,
                detail: {
                    app: this.appService.appName,
                    message: type,
                    detail: message
                }
            };
            base.Utils.subscribe(this.auditService.notify([event]), function (result) {
                if (thankUser)
                    _this.notificationsService.success("msg#feedback.thankyou");
            });
        };
        FeedbackService.prototype.buildFeedbackAction = function () {
            return [new i2.Action({
                    text: "msg#feedback.text",
                    title: "msg#feedback.title",
                    icon: "fas fa-comment",
                    headerGroup: true,
                    children: [
                        this.createAction("content", "msg#feedback.content.text", "msg#feedback.content.title", "far fa-file-alt fa-fw"),
                        this.createAction("ui", "msg#feedback.ui.text", "msg#feedback.ui.title", "fas fa-desktop fa-fw"),
                        this.createAction("lang", "msg#feedback.lang.text", "msg#feedback.lang.title", "far fa-comments fa-fw"),
                        this.createAction("other", "msg#feedback.other.text", "msg#feedback.other.title", "far fa-lightbulb fa-fw"),
                    ]
                })];
        };
        FeedbackService.prototype.createAction = function (type, text, title, icon) {
            var _this = this;
            return new i2.Action({
                text: text,
                title: title,
                icon: icon,
                action: function () { return _this.openFeedbackModal(type, title); }
            });
        };
        FeedbackService.prototype.openFeedbackModal = function (type, title) {
            var _this = this;
            var model = { title: 'msg#feedback.title', message: title, output: '', buttons: [], rowCount: 5 };
            this.modalService.prompt(model)
                .then(function (result) {
                if (result === -1 /* OK */ && model.output.trim() !== "") {
                    _this.sendUserFeedback(type, model.output, true);
                }
            });
        };
        return FeedbackService;
    }());
    FeedbackService.??fac = function FeedbackService_Factory(t) { return new (t || FeedbackService)(i0.????inject(i1.AuditWebService), i0.????inject(i2$1.ModalService), i0.????inject(i3.AppService), i0.????inject(i4.NotificationsService)); };
    FeedbackService.??prov = i0.????defineInjectable({ token: FeedbackService, factory: FeedbackService.??fac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.??setClassMetadata(FeedbackService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return [{ type: i1.AuditWebService }, { type: i2$1.ModalService }, { type: i3.AppService }, { type: i4.NotificationsService }]; }, null);
    })();

    var BsFeedbackMenu = /** @class */ (function () {
        function BsFeedbackMenu(feedbackService) {
            this.feedbackService = feedbackService;
        }
        BsFeedbackMenu.prototype.ngOnInit = function () {
            this.items = this.feedbackService.buildFeedbackAction();
            this.options = {
                items: this.items,
                autoAdjust: true,
                rightAligned: this.rightAligned,
                size: this.size,
                style: this.style
            };
        };
        return BsFeedbackMenu;
    }());
    BsFeedbackMenu.??fac = function BsFeedbackMenu_Factory(t) { return new (t || BsFeedbackMenu)(i0.????directiveInject(FeedbackService)); };
    BsFeedbackMenu.??cmp = i0.????defineComponent({ type: BsFeedbackMenu, selectors: [["sq-feedback-menu"]], inputs: { size: "size", style: "style", rightAligned: "rightAligned" }, decls: 1, vars: 1, consts: [[3, "sq-action-buttons"]], template: function BsFeedbackMenu_Template(rf, ctx) {
            if (rf & 1) {
                i0.????element(0, "div", 0);
            }
            if (rf & 2) {
                i0.????property("sq-action-buttons", ctx.options);
            }
        }, directives: [i2.BsActionButtons], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.??setClassMetadata(BsFeedbackMenu, [{
                type: i0.Component,
                args: [{
                        selector: "sq-feedback-menu",
                        templateUrl: "./feedback-menu.html",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () { return [{ type: FeedbackService }]; }, { size: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }] });
    })();

    var BsFeedbackModule = /** @class */ (function () {
        function BsFeedbackModule() {
        }
        return BsFeedbackModule;
    }());
    BsFeedbackModule.??mod = i0.????defineNgModule({ type: BsFeedbackModule });
    BsFeedbackModule.??inj = i0.????defineInjector({ factory: function BsFeedbackModule_Factory(t) { return new (t || BsFeedbackModule)(); }, imports: [[
                common.CommonModule,
                intl.IntlModule,
                i2.BsActionModule,
                validation.ValidationModule,
                modal.BsModalModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.????setNgModuleScope(BsFeedbackModule, { declarations: [BsFeedbackMenu], imports: [common.CommonModule,
                intl.IntlModule,
                i2.BsActionModule,
                validation.ValidationModule,
                modal.BsModalModule], exports: [BsFeedbackMenu] });
    })();
    /*@__PURE__*/ (function () {
        i0.??setClassMetadata(BsFeedbackModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            intl.IntlModule,
                            i2.BsActionModule,
                            validation.ValidationModule,
                            modal.BsModalModule
                        ],
                        declarations: [
                            BsFeedbackMenu
                        ],
                        exports: [
                            BsFeedbackMenu
                        ]
                    }]
            }], null, null);
    })();

    var _enFeedback = {
        "feedback": {
            "text": "",
            "title": "Send feedback to the Sinequa admin",
            "content": {
                "text": "Content",
                "title": "Propose to add new content or improve the current content"
            },
            "ui": {
                "text": "User Interface",
                "title": "Propose improvements to the User Interface"
            },
            "lang": {
                "text": "Language",
                "title": "Propose language processing improvements, like new words, synonyms to add to the dictionaries (this affects directly the relevance of the search engine)"
            },
            "other": {
                "text": "Other",
                "title": "Submit feature requests, and other improvement ideas"
            },
            "thankyou": "Thank you for your feedback!",
            "quality": {
                "label": "Quality of the document:"
            },
            "relevance": {
                "label": "Relevance of the document:"
            },
            "labels": {
                "public": {
                    "label": "Tags:"
                },
                "private": {
                    "label": "Private tags:"
                }
            }
        }
    };

    var _frFeedback = {
        "feedback": {
            "text": "",
            "title": "Envoyer un feedback ?? l'admin Sinequa",
            "content": {
                "text": "Contenu",
                "title": "Proposer d'ajouter du contenu ou d'am??liorer le contenu actuel"
            },
            "ui": {
                "text": "Interface Utilisateur",
                "title": "Proposer des am??liorations d'interfaces utilisateur"
            },
            "lang": {
                "text": "Langage",
                "title": "Proposer des am??liorations linguistiques, comme des nouveaux mots et synonymes ?? ajouter aux dictionaires (cela affecte directement la pertinence du moteur de recherche)"
            },
            "other": {
                "text": "Autre",
                "title": "Proposer des fonctionnalit??s suppl??mentaires et autres id??es d'am??liorations"
            },
            "thankyou": "Merci pour votre commentaire !",
            "quality": {
                "label": "Qualit?? du document:"
            },
            "relevance": {
                "label": "Pertinence du document:"
            },
            "labels": {
                "public": {
                    "label": "Tags:"
                },
                "private": {
                    "label": "Tags priv??s:"
                }
            }
        },
    };

    var _deFeedback = {
        "feedback": {
            "text": "",
            "title": "Sende R??ckmeldung an den Sinequa-Admin",
            "content": {
                "text": "Inhalt",
                "title": "Vorschlag zum Hinzuf??gen neuer Inhalte oder zur Verbesserung vorhandener Inhalte"
            },
            "ui": {
                "text": "Benutzeroberfl??che",
                "title": "Schlage Verbesserungen f??r die Benutzeroberfl??che vor"
            },
            "lang": {
                "text": "Sprache",
                "title": "Schlage Verbesserungen f??r die Sprachverarbeitung vor wie neue Worte oder Synonyme, die zu den W??rterb??chern hinzugef??gt werden sollen (dies hat direkte Auswirkungen auf die Relevanzberechnung der Suchmaschine)"
            },
            "other": {
                "text": "Andere",
                "title": "Reichen Sie einen Vorschlag f??r eine zus??tzliche Funktion oder andere Verbesserungvorschl??ge ein"
            },
            "thankyou": "Vielen Dank f??r Ihre R??ckmeldung!",
            "quality": {
                "label": "Qualit??t des Dokuments:"
            },
            "relevance": {
                "label": "Relevanz des Dokuments:"
            },
            "labels": {
                "public": {
                    "label": "Etiketten:"
                },
                "private": {
                    "label": "Private Etiketten:"
                }
            }
        }
    };

    var enFeedback = base.Utils.merge({}, _enFeedback, modal.enModal);
    var frFeedback = base.Utils.merge({}, _frFeedback, modal.frModal);
    var deFeedback = base.Utils.merge({}, _deFeedback, modal.deModal);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AuditFeedbackType = AuditFeedbackType;
    exports.BsFeedbackMenu = BsFeedbackMenu;
    exports.BsFeedbackModule = BsFeedbackModule;
    exports.FeedbackService = FeedbackService;
    exports.deFeedback = deFeedback;
    exports.enFeedback = enFeedback;
    exports.frFeedback = frFeedback;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-feedback.umd.js.map
