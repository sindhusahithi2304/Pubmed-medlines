import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe } from "./abstract-intl.pipe";
import { IntlService } from "./intl.service";
import { MapOf } from "@sinequa/core/base";
import * as i0 from "@angular/core";
/**
 * Describes the parameters that can be passed to the [sqMessage]{@link MessagePipe} pipe
 */
export interface MessageParams {
    /**
     * Values that can be referenced from ICU messages
     */
    values?: MapOf<any>;
}
/**
 * A pipe to display messages in the current locale. Inputs are processed by
 * [IntlService.formatMessage]{@link IntlService#formatMessage}
 */
export declare class MessagePipe extends AbstractIntlPipe {
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    protected updateValue(value: any, params: MessageParams): void;
    static ɵfac: i0.ɵɵFactoryDef<MessagePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<MessagePipe, "sqMessage">;
}
//# sourceMappingURL=message.pipe.d.ts.map