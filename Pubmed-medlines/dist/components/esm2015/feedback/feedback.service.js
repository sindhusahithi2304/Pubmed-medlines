import { Injectable } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/core/modal";
import * as i3 from "@sinequa/core/app-utils";
import * as i4 from "@sinequa/core/notification";
export const AuditFeedbackType = "UserFeedback";
export class FeedbackService {
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
FeedbackService.ɵfac = function FeedbackService_Factory(t) { return new (t || FeedbackService)(i0.ɵɵinject(i1.AuditWebService), i0.ɵɵinject(i2.ModalService), i0.ɵɵinject(i3.AppService), i0.ɵɵinject(i4.NotificationsService)); };
FeedbackService.ɵprov = i0.ɵɵdefineInjectable({ token: FeedbackService, factory: FeedbackService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FeedbackService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.AuditWebService }, { type: i2.ModalService }, { type: i3.AppService }, { type: i4.NotificationsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2ZlZWRiYWNrLyIsInNvdXJjZXMiOlsiZmVlZGJhY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBS3pDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7OztBQUVsRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxjQUFjLENBQUM7QUFNaEQsTUFBTSxPQUFPLGVBQWU7SUFFeEIsWUFDVyxZQUE2QixFQUM3QixZQUEwQixFQUMxQixVQUFzQixFQUN0QixvQkFBMEM7UUFIMUMsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUVyRCxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxTQUFrQjtRQUNyRSxNQUFNLEtBQUssR0FBZ0I7WUFDdkIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUU7Z0JBQ0osR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTztnQkFDNUIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTSxFQUFFLE9BQU87YUFDbEI7U0FDSixDQUFDO1FBQ0YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzdDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDUCxJQUFHLFNBQVM7Z0JBQ1IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG1CQUFtQjtRQUN0QixPQUFPLENBQUMsSUFBSSxNQUFNLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsS0FBSyxFQUFFLG9CQUFvQjtnQkFDM0IsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFFBQVEsRUFBRTtvQkFDTixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsRUFBRSw0QkFBNEIsRUFBRSx1QkFBdUIsQ0FBQztvQkFDaEgsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLENBQUM7b0JBQ2hHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLHVCQUF1QixDQUFDO29CQUN2RyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQztpQkFDOUc7YUFDSixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFTSxZQUFZLENBQUMsSUFBVyxFQUFFLElBQVcsRUFBRSxLQUFZLEVBQUUsSUFBVztRQUNuRSxPQUFPLElBQUksTUFBTSxDQUFDO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3BELENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUNoRCxNQUFNLEtBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQzFCLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2IsSUFBSSxNQUFNLGdCQUFtQixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbkQ7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7OzhFQTFEUSxlQUFlO3VEQUFmLGVBQWUsV0FBZixlQUFlLG1CQUZaLE1BQU07a0RBRVQsZUFBZTtjQUgzQixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0F1ZGl0V2ViU2VydmljZSwgQXVkaXRFdmVudH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge0FwcFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbm90aWZpY2F0aW9uXCI7XG5pbXBvcnQge01vZGFsU2VydmljZSwgTW9kYWxSZXN1bHR9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0FjdGlvbn0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBBdWRpdEZlZWRiYWNrVHlwZSA9IFwiVXNlckZlZWRiYWNrXCI7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRmVlZGJhY2tTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgYXVkaXRTZXJ2aWNlOiBBdWRpdFdlYlNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHVibGljIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBub3RpZmljYXRpb25zU2VydmljZTogTm90aWZpY2F0aW9uc1NlcnZpY2VcbiAgICAgICAgKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbmRVc2VyRmVlZGJhY2sodHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHRoYW5rVXNlcjogYm9vbGVhbil7XG4gICAgICAgIGNvbnN0IGV2ZW50IDogQXVkaXRFdmVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6IEF1ZGl0RmVlZGJhY2tUeXBlLFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgYXBwOiB0aGlzLmFwcFNlcnZpY2UuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB0eXBlLFxuICAgICAgICAgICAgICAgIGRldGFpbDogbWVzc2FnZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBVdGlscy5zdWJzY3JpYmUodGhpcy5hdWRpdFNlcnZpY2Uubm90aWZ5KFtldmVudF0pLFxuICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoYW5rVXNlcilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5zdWNjZXNzKFwibXNnI2ZlZWRiYWNrLnRoYW5reW91XCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVpbGRGZWVkYmFja0FjdGlvbigpIDogQWN0aW9uW10ge1xuICAgICAgICByZXR1cm4gW25ldyBBY3Rpb24oe1xuICAgICAgICAgICAgdGV4dDogXCJtc2cjZmVlZGJhY2sudGV4dFwiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2ZlZWRiYWNrLnRpdGxlXCIsXG4gICAgICAgICAgICBpY29uOiBcImZhcyBmYS1jb21tZW50XCIsXG4gICAgICAgICAgICBoZWFkZXJHcm91cDogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb24oXCJjb250ZW50XCIsIFwibXNnI2ZlZWRiYWNrLmNvbnRlbnQudGV4dFwiLCBcIm1zZyNmZWVkYmFjay5jb250ZW50LnRpdGxlXCIsIFwiZmFyIGZhLWZpbGUtYWx0IGZhLWZ3XCIpLFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9uKFwidWlcIiwgXCJtc2cjZmVlZGJhY2sudWkudGV4dFwiLCBcIm1zZyNmZWVkYmFjay51aS50aXRsZVwiLCBcImZhcyBmYS1kZXNrdG9wIGZhLWZ3XCIpLFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9uKFwibGFuZ1wiLCBcIm1zZyNmZWVkYmFjay5sYW5nLnRleHRcIiwgXCJtc2cjZmVlZGJhY2subGFuZy50aXRsZVwiLCBcImZhciBmYS1jb21tZW50cyBmYS1md1wiKSxcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbihcIm90aGVyXCIsIFwibXNnI2ZlZWRiYWNrLm90aGVyLnRleHRcIiwgXCJtc2cjZmVlZGJhY2sub3RoZXIudGl0bGVcIiwgXCJmYXIgZmEtbGlnaHRidWxiIGZhLWZ3XCIpLFxuICAgICAgICAgICAgXVxuICAgICAgICB9KV07XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUFjdGlvbih0eXBlOnN0cmluZywgdGV4dDpzdHJpbmcsIHRpdGxlOnN0cmluZywgaWNvbjpzdHJpbmcpIDogQWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGljb246IGljb24sXG4gICAgICAgICAgICBhY3Rpb246ICgpID0+IHRoaXMub3BlbkZlZWRiYWNrTW9kYWwodHlwZSwgdGl0bGUpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRmVlZGJhY2tNb2RhbCh0eXBlOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpe1xuICAgICAgICBjb25zdCBtb2RlbCA9IHt0aXRsZTogJ21zZyNmZWVkYmFjay50aXRsZScsIG1lc3NhZ2U6IHRpdGxlLCBvdXRwdXQ6ICcnLCBidXR0b25zOiBbXSwgcm93Q291bnQ6IDV9O1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5wcm9tcHQobW9kZWwpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuT0sgJiYgbW9kZWwub3V0cHV0LnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRVc2VyRmVlZGJhY2sodHlwZSwgbW9kZWwub3V0cHV0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19