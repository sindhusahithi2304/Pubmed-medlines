import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
export class CreationDatePipe {
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
CreationDatePipe.ɵfac = function CreationDatePipe_Factory(t) { return new (t || CreationDatePipe)(i0.ɵɵdirectiveInject(i1.IntlService)); };
CreationDatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqCreationDate", type: CreationDatePipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CreationDatePipe, [{
        type: Pipe,
        args: [{
                name: "sqCreationDate"
            }]
    }], function () { return [{ type: i1.IntlService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpb24tZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvY29tbWVudHMvIiwic291cmNlcyI6WyJjcmVhdGlvbi1kYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQU9wRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRXpCLFlBQ1csV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDakMsQ0FBQztJQUVILFNBQVMsQ0FBQyxPQUFnQjtRQUN0QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNySCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQ25GLElBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3RDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JILEdBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztTQUM1RjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7Z0ZBZFEsZ0JBQWdCO3lFQUFoQixnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUg1QixJQUFJO2VBQUM7Z0JBQ0YsSUFBSSxFQUFFLGdCQUFnQjthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBJbnRsU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcclxuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuL2NvbW1lbnRzLndlYi5zZXJ2aWNlXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcInNxQ3JlYXRpb25EYXRlXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIENyZWF0aW9uRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlXHJcbiAgICApe31cclxuXHJcbiAgICB0cmFuc2Zvcm0oY29tbWVudDogQ29tbWVudCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgY3JlYXRpb24gPSB0aGlzLmludGxTZXJ2aWNlLmZvcm1hdERhdGUoY29tbWVudC5jcmVhdGlvbikgKyBcIiBcIiArIHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0VGltZShjb21tZW50LmNyZWF0aW9uKTtcclxuICAgICAgICBsZXQgbXNnID0gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRNZXNzYWdlKFwibXNnI2NvbW1lbnRzLmNyZWF0ZWRcIiwge2RhdGU6IGNyZWF0aW9ufSk7XHJcbiAgICAgICAgaWYoY29tbWVudC5tb2RpZmllZCAhPT0gY29tbWVudC5jcmVhdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBtb2RpZmllZCA9IHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0RGF0ZShjb21tZW50Lm1vZGlmaWVkKSArIFwiIFwiICsgdGhpcy5pbnRsU2VydmljZS5mb3JtYXRUaW1lKGNvbW1lbnQubW9kaWZpZWQpO1xyXG4gICAgICAgICAgICBtc2cgKz0gXCIgLSBcIiArIHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZShcIm1zZyNjb21tZW50cy5tb2RpZmllZFwiLCB7ZGF0ZTogbW9kaWZpZWR9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1zZztcclxuICAgIH1cclxufSJdfQ==