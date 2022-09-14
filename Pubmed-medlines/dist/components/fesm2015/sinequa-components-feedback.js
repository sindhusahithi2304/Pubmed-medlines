import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelement, ɵɵproperty, Component, ChangeDetectionStrategy, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Utils } from '@sinequa/core/base';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';
import { AuditWebService } from '@sinequa/core/web-services';
import { ModalService } from '@sinequa/core/modal';
import { AppService } from '@sinequa/core/app-utils';
import { NotificationsService } from '@sinequa/core/notification';
import { CommonModule } from '@angular/common';
import { IntlModule } from '@sinequa/core/intl';
import { ValidationModule } from '@sinequa/core/validation';
import { BsModalModule, enModal, frModal, deModal } from '@sinequa/components/modal';

const AuditFeedbackType = "UserFeedback";
class FeedbackService {
    constructor(auditService, modalService, appService, notificationsService) {
        this.auditService = auditService;
        this.modalService = modalService;
        this.appService = appService;
        this.notificationsService = notificationsService;
    }
    sendUserFeedback(type, message, thankUser) {
        const event = {
            type: AuditFeedbackType,
            detail: {
                app: this.appService.appName,
                message: type,
                detail: message
            }
        };
        Utils.subscribe(this.auditService.notify([event]), (result) => {
            if (thankUser)
                this.notificationsService.success("msg#feedback.thankyou");
        });
    }
    buildFeedbackAction() {
        return [new Action({
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
    }
    createAction(type, text, title, icon) {
        return new Action({
            text: text,
            title: title,
            icon: icon,
            action: () => this.openFeedbackModal(type, title)
        });
    }
    openFeedbackModal(type, title) {
        const model = { title: 'msg#feedback.title', message: title, output: '', buttons: [], rowCount: 5 };
        this.modalService.prompt(model)
            .then((result) => {
            if (result === -1 /* OK */ && model.output.trim() !== "") {
                this.sendUserFeedback(type, model.output, true);
            }
        });
    }
}
FeedbackService.ɵfac = function FeedbackService_Factory(t) { return new (t || FeedbackService)(ɵɵinject(AuditWebService), ɵɵinject(ModalService), ɵɵinject(AppService), ɵɵinject(NotificationsService)); };
FeedbackService.ɵprov = ɵɵdefineInjectable({ token: FeedbackService, factory: FeedbackService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FeedbackService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: AuditWebService }, { type: ModalService }, { type: AppService }, { type: NotificationsService }]; }, null); })();

class BsFeedbackMenu {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    ngOnInit() {
        this.items = this.feedbackService.buildFeedbackAction();
        this.options = {
            items: this.items,
            autoAdjust: true,
            rightAligned: this.rightAligned,
            size: this.size,
            style: this.style
        };
    }
}
BsFeedbackMenu.ɵfac = function BsFeedbackMenu_Factory(t) { return new (t || BsFeedbackMenu)(ɵɵdirectiveInject(FeedbackService)); };
BsFeedbackMenu.ɵcmp = ɵɵdefineComponent({ type: BsFeedbackMenu, selectors: [["sq-feedback-menu"]], inputs: { size: "size", style: "style", rightAligned: "rightAligned" }, decls: 1, vars: 1, consts: [[3, "sq-action-buttons"]], template: function BsFeedbackMenu_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("sq-action-buttons", ctx.options);
    } }, directives: [BsActionButtons], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFeedbackMenu, [{
        type: Component,
        args: [{
                selector: "sq-feedback-menu",
                templateUrl: "./feedback-menu.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: FeedbackService }]; }, { size: [{
            type: Input
        }], style: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();

class BsFeedbackModule {
}
BsFeedbackModule.ɵmod = ɵɵdefineNgModule({ type: BsFeedbackModule });
BsFeedbackModule.ɵinj = ɵɵdefineInjector({ factory: function BsFeedbackModule_Factory(t) { return new (t || BsFeedbackModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            BsActionModule,
            ValidationModule,
            BsModalModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsFeedbackModule, { declarations: [BsFeedbackMenu], imports: [CommonModule,
        IntlModule,
        BsActionModule,
        ValidationModule,
        BsModalModule], exports: [BsFeedbackMenu] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFeedbackModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    BsActionModule,
                    ValidationModule,
                    BsModalModule
                ],
                declarations: [
                    BsFeedbackMenu
                ],
                exports: [
                    BsFeedbackMenu
                ]
            }]
    }], null, null); })();

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
        "title": "Envoyer un feedback à l'admin Sinequa",
        "content": {
            "text": "Contenu",
            "title": "Proposer d'ajouter du contenu ou d'améliorer le contenu actuel"
        },
        "ui": {
            "text": "Interface Utilisateur",
            "title": "Proposer des améliorations d'interfaces utilisateur"
        },
        "lang": {
            "text": "Langage",
            "title": "Proposer des améliorations linguistiques, comme des nouveaux mots et synonymes à ajouter aux dictionaires (cela affecte directement la pertinence du moteur de recherche)"
        },
        "other": {
            "text": "Autre",
            "title": "Proposer des fonctionnalités supplémentaires et autres idées d'améliorations"
        },
        "thankyou": "Merci pour votre commentaire !",
        "quality": {
            "label": "Qualité du document:"
        },
        "relevance": {
            "label": "Pertinence du document:"
        },
        "labels": {
            "public": {
                "label": "Tags:"
            },
            "private": {
                "label": "Tags privés:"
            }
        }
    },
};

var _deFeedback = {
    "feedback": {
        "text": "",
        "title": "Sende Rückmeldung an den Sinequa-Admin",
        "content": {
            "text": "Inhalt",
            "title": "Vorschlag zum Hinzufügen neuer Inhalte oder zur Verbesserung vorhandener Inhalte"
        },
        "ui": {
            "text": "Benutzeroberfläche",
            "title": "Schlage Verbesserungen für die Benutzeroberfläche vor"
        },
        "lang": {
            "text": "Sprache",
            "title": "Schlage Verbesserungen für die Sprachverarbeitung vor wie neue Worte oder Synonyme, die zu den Wörterbüchern hinzugefügt werden sollen (dies hat direkte Auswirkungen auf die Relevanzberechnung der Suchmaschine)"
        },
        "other": {
            "text": "Andere",
            "title": "Reichen Sie einen Vorschlag für eine zusätzliche Funktion oder andere Verbesserungvorschläge ein"
        },
        "thankyou": "Vielen Dank für Ihre Rückmeldung!",
        "quality": {
            "label": "Qualität des Dokuments:"
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

const enFeedback = Utils.merge({}, _enFeedback, enModal);
const frFeedback = Utils.merge({}, _frFeedback, frModal);
const deFeedback = Utils.merge({}, _deFeedback, deModal);

/**
 * Generated bundle index. Do not edit.
 */

export { AuditFeedbackType, BsFeedbackMenu, BsFeedbackModule, FeedbackService, deFeedback, enFeedback, frFeedback };
//# sourceMappingURL=sinequa-components-feedback.js.map
