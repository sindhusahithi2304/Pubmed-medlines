import { PipeTransform } from "@angular/core";
import { IntlService } from "@sinequa/core/intl";
import { Comment } from "./comments.web.service";
import * as i0 from "@angular/core";
export declare class CreationDatePipe implements PipeTransform {
    intlService: IntlService;
    constructor(intlService: IntlService);
    transform(comment: Comment): string;
    static ɵfac: i0.ɵɵFactoryDef<CreationDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<CreationDatePipe, "sqCreationDate">;
}
//# sourceMappingURL=creation-date.pipe.d.ts.map